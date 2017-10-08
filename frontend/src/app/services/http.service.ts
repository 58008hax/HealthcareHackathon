import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {
    constructor(private http:Http) {

    }

    signUpUser(userData) {
        
    }
}