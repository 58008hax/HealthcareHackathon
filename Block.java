import java.util.Date;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.xml.bind.DatatypeConverter; 

public class Block{
    int index;
    String prevHash;
    String currHash;
    Date timestamp;
    String JsonData;
    String creator;

    //create a new block
    public Block(int index, String prevHash, Date timestamp, String data, String creator){
        this.index = index;
        this.prevHash = prevHash;
        this.timestamp = timestamp;
        this.JsonData = data;
        this.creator = creator;

        try{
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            String blockData = index + prevHash + timestamp + creator;
            this.currHash = DatatypeConverter.printHexBinary(md.digest(blockData.getBytes("UTF-8")));
        } catch(Exception e){
            e.printStackTrace();
        }
    }
}