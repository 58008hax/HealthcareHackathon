import { Component } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'patient',
  templateUrl: './patient.html',
  styleUrls: ['./patient.css']
})
export class PatientComponent {
  userId;
  userType:string;
  pData:any;

  constructor (private dataService:DataService) {
    if (this.dataService.loginPatientData != null) {
      this.userId = this.dataService.loginPatientData.userId;
      this.userType = "Patient";
      console.log("This is user " + this.userId + ", a " + this.userType);
    }

    if (this.dataService.searchData != null) {
      this.pData = this.dataService.searchData;
      console.log(this.pData);
    }
  }
}
  