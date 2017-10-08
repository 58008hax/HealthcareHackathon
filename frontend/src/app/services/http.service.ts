import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
    loginUrl:string = "http://54.242.237.38:8080";
    blockUrl:string = "http://54.242.237.38:3001";

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

    addNewVisitBlock(oldData, symptoms, bloodPressureO, bloodPressureU, height, weight, temperature, testsRun, diagnosisNotes, medName, dosage, pillCountBottle, freqPillsAmount, freqPillsPerDay, freqPillsNotes, treatmentDurNum, treatmentDurType) {

        var data = JSON.parse(oldData);
        data["data"]["visits"]["Data Type"] = "New Visit";
        data["data"]["visits"]["symptoms"] = symptoms;
        data["data"]["visits"]["bloodPressure"]["numerator"] = bloodPressureO;
        data["data"]["visits"]["bloodPressure"]["denominator"] = bloodPressureU;
        data["data"]["visits"]["height"] = height;
        data["data"]["visits"]["weight"] = weight;
        data["data"]["visits"]["temperature"] = temperature;
        data["data"]["visits"]["testsRun"] = testsRun;
        data["data"]["visits"]["diagnosis"] = diagnosisNotes;
        data["data"]["visits"]["date"] = new Date();
        data["data"]["visits"]["meds"]["name"] = medName;
        data["data"]["visits"]["meds"]["dosage"] = dosage;
        data["data"]["visits"]["meds"]["pillCountPerBottle"] = pillCountBottle;
        data["data"]["visits"]["meds"]["frequencyPillCount"] = freqPillsAmount;
        data["data"]["visits"]["meds"]["frequencyPillPerDay"] = freqPillsPerDay;
        data["data"]["visits"]["meds"]["notes"] = freqPillsNotes;
        data["data"]["visits"]["meds"]["duration"] = treatmentDurNum;
        data["data"]["visits"]["durationType"] = treatmentDurType;

        return this.http.post('http://54.242.237.38:3001/mineBlock', JSON.stringify(data)).map((res:Response) => res.json());

    }

}