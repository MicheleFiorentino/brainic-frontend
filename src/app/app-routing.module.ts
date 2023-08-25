import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './presentation/auth/login/login.component';
import { PatientsListComponent } from './presentation/patients-list/patients-list.component';
import { DoctorInfoComponent } from './presentation/doctor-info/doctor-info.component';
import { PatientDashboardComponent } from './presentation/patient-dashboard/patient-dashboard.component';
import { RecoverPasswordComponent } from './presentation/handle-password/recover-password/recover-password.component';
import { ChangePasswordComponent } from './presentation/handle-password/change-password/change-password.component';
import { ChangedPasswordComponent } from './presentation/handle-password/changed-password/changed-password.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'patients-list', component: PatientsListComponent},
  {path: 'doctor-info', component: DoctorInfoComponent},
  {path: 'patient-dashboard', component: PatientDashboardComponent},
  {path: 'recover-password', component: RecoverPasswordComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'changed-password', component: ChangedPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
