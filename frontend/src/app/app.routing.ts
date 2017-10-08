import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './components/search/search';
import { PatientComponent } from './components/patient/patient';
import { LoginComponent } from './components/login/login';
import { MyPatientsComponent } from './components/myPatients/myPatients';
import { MyDoctorsComponent } from './components/myDoctors/myDoctors';
import { ProfileComponent } from './components/profile/profile';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'search', component: SearchComponent },
    { path: 'mypatients', component: MyPatientsComponent },
    { path: 'patient', component: PatientComponent },
    { path: 'mydoctors', component: MyDoctorsComponent },
    { path: 'profile', component: ProfileComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);