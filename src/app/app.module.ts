import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from './material-design/material-design.module';
import { LoginComponent } from './presentation/auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PatientsListComponent } from './presentation/patients-list/patients-list.component';
import { DoctorInfoComponent } from './presentation/doctor-info/doctor-info.component';
import { PatientDashboardComponent } from './presentation/patient-dashboard/patient-dashboard.component';
import { EegChartComponent } from './presentation/eeg/eeg-chart/eeg-chart.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { EegElectrodesComponent } from './presentation/eeg/eeg-electrodes/eeg-electrodes.component';
import { ChangePasswordComponent } from './presentation/handle-password/change-password/change-password.component';
import { RecoverPasswordComponent } from './presentation/handle-password/recover-password/recover-password.component';
import { ChangedPasswordComponent } from './presentation/handle-password/changed-password/changed-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DoctorInfoComponent,
    PatientDashboardComponent,
    EegChartComponent,
    PatientProfileComponent,
    PatientsListComponent,
    EegElectrodesComponent,
    ChangePasswordComponent,
    RecoverPasswordComponent,
    ChangedPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialDesignModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
