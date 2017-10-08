import { Component } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
    selector: 'search',
    templateUrl: './search.html',
    styleUrls: ['./search.css']
})
export class SearchComponent {
    userData:any;
    
    constructor(private dataService:DataService) {
        if (this.dataService.userData != null) {
            this.userData = this.dataService.userData;
        } else {
            this.userData = "Something went wrong";
        }
    }

    scanPatient() {
        
    }

    searchPatient() {

    }
}