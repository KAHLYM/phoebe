import { Routes } from '@angular/router';
import { PasscodeComponent } from './passcode/passcode.component';
import { ReasonComponent } from './reason/reason.component';

export const routes: Routes = [
    { path: 'passcode', component: PasscodeComponent },
    { path: 'reason', component: ReasonComponent },
    { path: '', redirectTo: '/passcode', pathMatch: 'full' },
];
