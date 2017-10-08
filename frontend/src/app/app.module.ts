import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { HttpModule } from '@angular/http';

import { AccordionModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { TabMenuModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { SelectButtonModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search';
import { PatientComponent } from './components/patient/patient';
import { LoginComponent } from './components/login/login';
import { MyPatientsComponent } from './components/myPatients/myPatients';
import { MyDoctorsComponent } from './components/myDoctors/myDoctors';
import { ProfileComponent } from './components/profile/profile';
import { HeaderComponent } from './components/header/header';
import { SignUpComponent } from './components/signUp/signUp';
import { NewVisitComponent } from './components/newVisits/newVisits';

import { DataService } from './services/data.service';
import { HttpService } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    LoginComponent,
    SearchComponent,
    MyPatientsComponent,
    MyDoctorsComponent,
    ProfileComponent,
    HeaderComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    routing,
    AccordionModule,
    InputTextModule,
    PasswordModule,
    TabMenuModule,
    BrowserAnimationsModule,
    ButtonModule,
    FormsModule,
    SelectButtonModule,
    HttpModule
  ],
  providers: [
    DataService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
