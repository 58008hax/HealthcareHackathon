import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
    userType:string = "";

    constructor(private dataService:DataService) {
        if (this.dataService.userType != null) {
            this.userType = this.dataService.userType;
        }
    }
    
    ngOnInit() { }
}