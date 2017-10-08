import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { PatientComponent } from './components/patient/patient';
import { AccordionModule } from 'primeng/primeng';

import {InputTextModule} from 'primeng/primeng';

import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {
    path: 'patient',
    component: PatientComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AccordionModule,
    InputTextModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
