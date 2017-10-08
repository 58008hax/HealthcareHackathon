import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
    userType:string;
    loginPatientData:any;
    userData:any;
    searchData:any;

    constructor() {
        this.loginPatientData = null;
        this.userType = null;
        this.userData = null;
        this.searchData = null;
    }

    setLoginData(data) {
        this.loginPatientData = data;
    }

    setUserType(user) {
        this.userType = user;
    }

    setSearchData(data) {
        this.searchData = data;
    }
}