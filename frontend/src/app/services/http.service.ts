import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {
    constructor(private http:Http) {

    }

    signUpUser(userData) {
        
    }
}