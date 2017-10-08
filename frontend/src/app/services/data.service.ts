import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
    userType:string;
    loginPatientData:any;

    constructor() {
        this.loginPatientData = null;
    }

    setLoginData(data) {
        this.loginPatientData = data;
    }

    setUserType(u) {
        this.userType = u;
    }
}