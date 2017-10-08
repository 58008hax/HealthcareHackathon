import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SelectItem } from 'primeng/primeng';

import { DataService } from '../../services/data.service';

import { HttpService } from '../../services/http.service';

@Component({
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class LoginComponent {
    userTypes: SelectItem[] = [];
    userType: string;
    username: string;
    password: string;
    loginData: any;

    constructor(public router: Router, private dataService:DataService, private httpService:HttpService) {
        this.userTypes = [
            { label: 'Doctor', value: 'Doctor' },
            { label: 'Patient', value: 'Patient' },
            { label: 'Pharmacy', value: 'Pharmacy' }
        ];
    }

    login() {
        console.log("Username: " + this.username);
        console.log("Password: " + this.password);
        
        this.dataService.setUserType(this.userType);

        switch(this.userType) {
            case "Doctor":
                console.log("User is doctor...");
                this.httpService.checkLogin(this.username, this.password).subscribe((data) => {
                    console.log(data);
                    this.dataService.userData = data;
                    console.log(this.dataService.userData);
                    this.router.navigate(['/search']);
                });
                break;
            case "Patient":
                console.log("User is patient...");
                this.httpService.checkLogin(this.username, this.password).subscribe((data) => {
                    this.dataService.userData = data.json;
                    this.router.navigate(['/patient']);
                });
                break;
            case "Pharmacy":
                console.log("User is pharmacy...");
                this.httpService.checkLogin(this.username, this.password).subscribe((data) => {
                    this.dataService.userData = data.json;
                    this.router.navigate(['/search']);
                });
                break;
            default:
                alert("Please select who you are! (Doctor, Patient, Pharmacy");
                break;
        }        
    }
}
  