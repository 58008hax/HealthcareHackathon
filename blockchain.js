'use strict';
var CryptoJS = require("crypto-js");
var express = require("express");
var bodyParser = require('body-parser');
var WebSocket = require("ws");

var http_port = process.env.HTTP_PORT || 3001;
var p2p_port = process.env.P2P_PORT || 6001;
var initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class Block {
    constructor(index, previousHash, timestamp, data, hash) {
        this.index = index;
        this.previousHash = previousHash.toString();
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash.toString();
    }
}

var sockets = [];
var MessageType = {
    QUERY_LATEST: 0,
    QUERY_ALL: 1,
    RESPONSE_BLOCKCHAIN: 2
};

var getGenesisBlock = () => {
    return new Block(0, "0", 1465154705, "this is the genesis block", "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7");
};

var blockchain = [getGenesisBlock()];

var initHttpServer = () => {
    var app = express();
    app.use(bodyParser.json());

    //app.get('/', (req, res) => res.sendFile(__dirname + '/frontend/src/index.html'));

    app.get('/blocks', (req, res) => res.send(JSON.stringify(blockchain)));
    app.get('/newestBlock', (req, res) => res.send(JSON.stringify(getLatestBlock())));
    app.post('/mineBlock', (req, res) => {
        var newBlock = generateNextBlock(req.body.data);
        addBlock(newBlock);
        broadcast(responseLatestMsg());
        console.log('block added: ' + JSON.stringify(newBlock));
        res.send();
    });
    app.get('/peers', (req, res) => {
        res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort));
    });
    app.post('/addPeer', (req, res) => {
        var socketStr = "ws://" + req.connection.remoteAddress + ":6001";
        addNewPeer(socketStr);
        res.send();
    });
    app.listen(http_port, () => console.log('Listening http on port: ' + http_port));
};

var initP2PServer = () => {
    var server = new WebSocket.Server({port: p2p_port});
    server.on('connection', ws => initConnection(ws));
    console.log('listening websocket p2p port on: ' + p2p_port);

};

var initConnection = (ws) => {
    sockets.push(ws);
    initMessageHandler(ws);
    initErrorHandler(ws);
    write(ws, queryChainLengthMsg());
};

var initMessageHandler = (ws) => {
    ws.on('message', (data) => {
        var message = JSON.parse(data);
        console.log('Received message' + JSON.stringify(message));
        switch (message.type) {
            case MessageType.QUERY_LATEST:
                write(ws, responseLatestMsg());
                break;
            case MessageType.QUERY_ALL:
                write(ws, responseChainMsg());
                break;
            case MessageType.RESPONSE_BLOCKCHAIN:
                handleBlockchainResponse(message);
                break;
        }
    });
};

var initErrorHandler = (ws) => {
    var closeConnection = (ws) => {
        console.log('connection failed to peer: ' + ws.url);
        sockets.splice(sockets.indexOf(ws), 1);
    };
    ws.on('close', () => closeConnection(ws));
    ws.on('error', () => closeConnection(ws));
};

var generateNextBlock = (blockData) => {
    var previousBlock = getLatestBlock();
    var nextIndex = previousBlock.index + 1;
    var nextTimestamp = new Date().getTime() / 1000;
    var nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
    return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
};

var calculateHashForBlock = (block) => {
    return calculateHash(block.index, block.previousHash, block.timestamp, block.data);
};

var calculateHash = (index, previousHash, timestamp, data) => {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
};

var addBlock = (newBlock) => {
    if (isValidNewBlock(newBlock, getLatestBlock())) {
        blockchain.push(newBlock);
    }
};

var isValidNewBlock = (newBlock, previousBlock) => {
    if (previousBlock.index + 1 !== newBlock.index) {
        console.log('invalid index');
        return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
        console.log('invalid previoushash');
        return false;
    } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
        console.log(typeof (newBlock.hash) + ' ' + typeof calculateHashForBlock(newBlock));
        console.log('invalid hash: ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
        return false;
    }
    return true;
};

var connectToPeers = (newPeers) => {
    newPeers.forEach((peer) => {
        var ws = new WebSocket(newPeers);
        ws.on('open', () => initConnection(ws));
        ws.on('error', () => {
            console.log('connection failed')
        });
    });
};

var addNewPeer = (peer) => {
    var ws = new WebSocket(peer);
    ws.on('open', () => initConnection(ws));
    ws.on('error', () => {
        console.log('failed to add peer');
    });
};

var handleBlockchainResponse = (message) => {
    var receivedBlocks = JSON.parse(message.data).sort((b1, b2) => (b1.index - b2.index));
    var latestBlockReceived = receivedBlocks[receivedBlocks.length - 1];
    var latestBlockHeld = getLatestBlock();
    if (latestBlockReceived.index > latestBlockHeld.index) {
        console.log('blockchain possibly behind. We got: ' + latestBlockHeld.index + ' Peer got: ' + latestBlockReceived.index);
        if (latestBlockHeld.hash === latestBlockReceived.previousHash) {
            console.log("We can append the received block to our chain");
            blockchain.push(latestBlockReceived);
            broadcast(responseLatestMsg());
        } else if (receivedBlocks.length === 1) {
            console.log("We have to query the chain from our peer");
            broadcast(queryAllMsg());
        } else {
            console.log("Received blockchain is longer than current blockchain");
            replaceChain(receivedBlocks);
        }
    } else {
        console.log('received blockchain is not longer than received blockchain. Do nothing');
    }
};

var replaceChain = (newBlocks) => {
    if (isValidChain(newBlocks) && newBlocks.length > blockchain.length) {
        console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
        blockchain = newBlocks;
        broadcast(responseLatestMsg());
    } else {
        console.log('Received blockchain invalid');
    }
};

var isValidChain = (blockchainToValidate) => {
    if (JSON.stringify(blockchainToValidate[0]) !== JSON.stringify(getGenesisBlock())) {
        return false;
    }
    var tempBlocks = [blockchainToValidate[0]];
    for (var i = 1; i < blockchainToValidate.length; i++) {
        if (isValidNewBlock(blockchainToValidate[i], tempBlocks[i - 1])) {
            tempBlocks.push(blockchainToValidate[i]);
        } else {
            return false;
        }
    }
    return true;
};

var getLatestBlock = () => blockchain[blockchain.length - 1];
var queryChainLengthMsg = () => ({'type': MessageType.QUERY_LATEST});
var queryAllMsg = () => ({'type': MessageType.QUERY_ALL});
var responseChainMsg = () =>({
    'type': MessageType.RESPONSE_BLOCKCHAIN, 'data': JSON.stringify(blockchain)
});
var responseLatestMsg = () => ({
    'type': MessageType.RESPONSE_BLOCKCHAIN,
    'data': JSON.stringify([getLatestBlock()])
});

var write = (ws, message) => ws.send(JSON.stringify(message));
var broadcast = (message) => sockets.forEach(socket => write(socket, message));

connectToPeers(initialPeers);
initHttpServer();
initP2PServer();


//adding some dummy data for the presentation
var dummyData1 = generateNextBlock({
    "data": {
        "patient": {
            "name": "Matthew Aquiles",
            "dob": "1995-08-29",
            "ssn": "123456789",
            "insuranceProvider": "horizon",
            "address": "806 Castle Point Terrace",
            "race": "white",
            "email": "mattaquiles@gmail.com",
            "phoneNum": "9082167181",
            "emergency": {
                "name": "mom",
                "phone": "1234567890"
            },
            "gender": "male",
            "fact": "heres a fun fact for ya"
        },
        "doctor": {
            "name": "Johnny Appleseed",
            "phone": "8008888888",
            "email": "jappleseed@doctor.com",
            "workAddr": "1 MD Lane ",
            "fact": "im not a doctor"
        },
        "visits":{
            "bloodPressure": {
                "numerator": 120,
                "denominator": 80   
            },
            "height": 72,
            "weight": 175,
            "temperature": 98.6,
            "notes": "lookin gud",
            "date": "2017-10-8",
            "symptoms": "ok",
            "diagnosis": "healthy",
            "meds": {
                "frequency": "weekly",
                "duration": "2 months",
                "dosage": "5mg",
                "notes": "take in the morning"
            },
            "isEdit": 0
        }
    }
});
addBlock(dummyData1);

var dummyData2 = generateNextBlock({
    "data": {
        "patient": {
            "name": "Matthew Aquiles",
            "dob": "1995-08-29",
            "ssn": "123456789",
            "insuranceProvider": "horizon",
            "address": "806 Castle Point Terrace",
            "race": "white",
            "email": "mattaquiles@gmail.com",
            "phoneNum": "9082167181",
            "emergency": {
                "name": "mom",
                "phone": "1234567890"
            },
            "gender": "male",
            "fact": "heres a fun fact for ya"
        },
        "doctor": {
            "name": "Johnny Appleseed",
            "phone": "8008888888",
            "email": "jappleseed@doctor.com",
            "workAddr": "1 MD Lane ",
            "fact": "im not a doctor"
        },
        "visits":[{
            "bloodPressure": {
                "numerator": 120,
                "denominator": 80   
            },
            "height": 72,
            "weight": 185,
            "temperature": 98.6,
            "notes": "lookin ok",
            "date": "2017-10-8",
            "symptoms": "ok",
            "diagnosis": "healthy",
            "meds": {
                "frequency": "weekly",
                "duration": "2 months",
                "dosage": "5mg",
                "notes": "take in the morning"
            },
            "isEdit": 0
        },
                 {
            "bloodPressure": {
                "numerator": 140,
                "denominator": 90   
            },
            "height": 68,
            "weight": 150,
            "temperature": 98.6,
            "notes": "good health",
            "date": "2017-09-8",
            "symptoms": "runny nose",
            "diagnosis": "common cold",
            "meds": [{
                "frequency": "daily",
                "duration": "6 months",
                "dosage": "2mg",
                "notes": "take morning and night with food"
            },
                {
                "frequency": "daily",
                "duration": "6 months",
                "dosage": "2mg",
                "notes": "take morning and night with food"
                }],
            "isEdit": 0
        },
                 {
            "bloodPressure": {
                "numerator": 115,
                "denominator": 100   
            },
            "height": 60,
            "weight": 120,
            "temperature": 99,
            "notes": "healthy",
            "date": "2017-09-13",
            "symptoms": "cough",
            "diagnosis": "flu",
            "meds": [{
                "name": "ridalin",
                "frequency": "daily",
                "duration": "3 months",
                "dosage": "5mg",
                "notes": "take morning and night with food"
            },
                {
                "name": "drugxyz",
                "frequency": "daily",
                "duration": "6 months",
                "dosage": "2mg",
                "notes": "take morning and night with food"
                },
                {
                "name": "sdjfbv",
                "frequency": "weekly",
                "duration": "1 year",
                "dosage": "20mg",
                "notes": "take once a week"
                }],
            "isEdit": 0
        }]
    }
});
addBlock(dummyData2);

