import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
    userType:string = "Doctor";

    constructor() {
        //this.userType = "Patient";
    }
    
    ngOnInit() { }
}