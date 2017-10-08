import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
    userType:string;
    loginPatientData:any;
    userData:any;

    constructor() {
        this.loginPatientData = null;
        this.userType = null;
        this.userData = null;
    }

    setLoginData(data) {
        this.loginPatientData = data;
    }

    setUserType(u) {
        this.userType = u;
    }
}