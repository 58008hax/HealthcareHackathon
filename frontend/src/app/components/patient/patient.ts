import { Component } from '@angular/core';

import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'patient',
  templateUrl: './patient.html',
  styleUrls: ['./patient.css']
})
export class PatientComponent {
  userId;
  userType:string;
  patientName = 'Scott Russell';

  constructor (private dataService:DataService, private httpService:HttpService) {
    if (this.dataService.loginPatientData != null) {
      //Patient is currently logged in
      this.userId = this.dataService.loginPatientData.userId;
      this.userType = "Patient";
      console.log("This is user " + this.userId + ", a " + this.userType);
    }

  }
}
  