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
    
    addBlock() {
        return this.http.post(this.blockUrl + '/mineBlock', '{"data":"this is a new string"}').map((res:Response) => res.json());
    }
}