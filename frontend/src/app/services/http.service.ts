import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
    loginUrl:string = "http://54.242.237.38:8080";
    blockUrl:string = "http://localhost:3001";

    constructor(private http:Http) {}

    signUpUser(name, email, phoneNumber, street, city, state, password) {
        return this.http.get(this.loginUrl + '/user/add?name=' + name + '&email=' + email + '&phoneNumber=' + phoneNumber + '&street=' + street + '&city=' + city + '&state=' + state + '&password=' + password).map((res:Response) => res.json());
    }

    checkLogin(email, password) {
        return this.http.get(this.loginUrl + '/user/check?email='+email+'&password='+password).map((res:Response) => res.json());
    }

    getBlocks() {
        return this.http.get(this.blockUrl + '/blocks').map((res:Response) => res.json());
    }

    getLastestBlock() {
        return this.http.get(this.blockUrl + '/newestBlock').map((res:Response) => res.json());
    }
    
    addNewVisitBlock(symptoms, bloodPressureO, bloodPressureU, height, weight, temperature, testsRun, diagnosisNotes, medName, dosage, pillCountBottle, freqPillsAmount, freqPillsPerDay, freqPillsNotes, treatmentDurNum, treatmentDurType) {
        var data = {};
        data["data"] = {};
        data["data"]["Data Type"] = "New Visit";
        data["data"]["Symptoms"] = symptoms;
        data["data"]["Blood Pressure"] = "" + bloodPressureO + " / " + bloodPressureU;
        data["data"]["Height"] = height;
        data["data"]["Weight"] = weight;
        data["data"]["Temperature"] = temperature;
        data["data"]["Tests Run"] = testsRun;
        data["data"]["Diagnosis Notes"] = diagnosisNotes;
        data["data"]["Medicine Name"] = medName;
        data["data"]["Dosage"] = dosage;
        data["data"]["Pill Count Per Bottle"] = pillCountBottle;
        data["data"]["Frequency Pill Count"] = freqPillsAmount;
        data["data"]["Frequency Pill Per Day"] = freqPillsPerDay;
        data["data"]["Frequency Pill Notes"] = freqPillsNotes;
        data["data"]["Treatment Duration"] = treatmentDurNum;
        data["data"]["Treatment Duration Type"] = treatmentDurType;
        
        return this.http.post('http://54.242.237.38:3001/mineBlock', JSON.stringify(data)).map((res:Response) => res.json());
    }
}