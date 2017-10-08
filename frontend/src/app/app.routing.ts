import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './components/search/search';
import { PatientComponent } from './components/patient/patient';
import { LoginComponent } from './components/login/login';
import { MyPatientsComponent } from './components/myPatients/myPatients';
import { MyDoctorsComponent } from './components/myDoctors/myDoctors';
import { ProfileComponent } from './components/profile/profile';
import { SignUpComponent } from './components/signUp/signUp';
import { NewVisitComponent } from './components/newVisits/newVisits';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'search', component: SearchComponent },
    { path: 'myPatients', component: MyPatientsComponent },
    { path: 'patient', component: PatientComponent },
    { path: 'myDoctors', component: MyDoctorsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'newVisit', component: NewVisitComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);