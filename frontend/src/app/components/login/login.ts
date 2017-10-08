import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SelectItem } from 'primeng/primeng';

import { DataService } from '../../services/data.service';

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

    constructor(public router: Router, private dataService:DataService) {
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
                this.router.navigate(['/search'], {});
                break;
            case "Patient":
                console.log("User is patient...");
                let patientData = {
                    userId: 123,
                    userType: this.userType
                };
                this.dataService.setLoginData(patientData);
                this.router.navigate(['/patient']);
                break;
            case "Pharmacy":
                console.log("User is pharmacy...");
                this.router.navigate(['/search'], {});
                break;
            default:
                alert("Please select who you are! (Doctor, Patient, Pharmacy");
                break;
        }        
    }
}
  