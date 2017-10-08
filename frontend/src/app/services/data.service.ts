import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
    loginPatientData:any;

    constructor() {
        this.loginPatientData = null;
    }

    setLoginData(data) {
        this.loginPatientData = data;
    }
}