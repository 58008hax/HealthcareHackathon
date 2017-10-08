import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';

@Component({
    selector: 'search',
    templateUrl: './search.html',
    styleUrls: ['./search.css']
})
export class SearchComponent {
    userData:any;
    
    constructor(public router:Router, private dataService:DataService, private httpService:HttpService) {
        if (this.dataService.userData != null) {
            this.userData = this.dataService.userData;
        } else {
            this.userData = "Something went wrong";
        }
    }

    scanPatient() {
        
    }

    searchPatient() {
        this.httpService.getLastestBlock().subscribe((result) => {
            console.log(result.data);
            this.dataService.searchData = result.data;
            this.router.navigate(["/patient"]);
        });
    }
}