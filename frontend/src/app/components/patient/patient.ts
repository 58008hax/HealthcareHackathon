import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  lastVisit:any;
  patientName:string = "Patient Name";
  currentMeds:any;

  constructor (public router:Router, private dataService:DataService) {
    if (this.dataService.loginPatientData != null) {
      this.userId = this.dataService.loginPatientData.userId;
      this.userType = "Patient";
      console.log("This is user " + this.userId + ", a " + this.userType);
    }

    if (this.dataService.searchData != null) {
      this.pData = this.dataService.searchData;
      this.patientName = this.pData["patient"]["name"];
      this.lastVisit = this.pData["visits"][this.pData["visits"].length - 1];
      this.currentMeds = this.lastVisit["meds"];
      console.log(this.pData);
      console.log(this.lastVisit);
    } else {
      console.log("Woops, something went wrong with searchData.");
    }
  }

  newVisit() {
    this.router.navigate(["/newVisit"]);
  }
}
  