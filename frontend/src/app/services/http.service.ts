import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
    constructor(
        private http:Http
    ) {}

    signUpUser(name, email, phoneNumber, street, city, state, password) {
        return this.http.get('http://155.246.208.15:8080/user/add? name='+name+'&email='+email+'&phoneNumber='+phoneNumber+'&street='+street+'&city='+city+'&state='+state+'&password='+password).map((res:Response) => res.json());
    }

    checkLogin(email, password) {
        return this.http.get('http://155.246.208.15:8080/user/check?email='+email+'&password='+password).map((res:Response) => res.json());
    }
}