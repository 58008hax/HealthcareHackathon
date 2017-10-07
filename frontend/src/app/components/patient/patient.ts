import { Component } from '@angular/core';

import { AccordionModule } from 'primeng/primeng';

@Component({
    selector: 'patient',
    templateUrl: './patient.html',
    styleUrls: ['./patient.css']
  })
  export class PatientComponent {
    patientName = 'Scott Russell';

    constructor() {

    }
  }
  