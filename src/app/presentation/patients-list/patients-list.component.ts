import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/business-logic/local-storage/local-storage.service';
import { PatientDisplay } from './context-model/patient-display';
import { MatTableDataSource } from '@angular/material/table';
import { PatientInfoService } from 'src/app/business-logic/patient-info/patient-info.service';
@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent {
  displayedColumns: string[] = ['image', 'name', 'surname', 'sex', 'email', 'countryFlag', 'button'];
  patientDataSource = new MatTableDataSource<PatientDisplay>
  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private patService: PatientInfoService
  ){}

  ngOnInit() {
    let docIdData: any = this.localStorage.getData('doctorId');
    let docId: number = typeof docIdData === 'string' ? parseInt(docIdData, 10) : 0;
    this.initDoctorPatientList(docId);
  }

  async initDoctorPatientList(docId: number) {
    const patients = await this.patService.getDoctorPatientListWithDetails(docId);
    this.patientDataSource.data = patients;
  }

  onPatientButton(patientId: number) {
    this.localStorage.saveData('patientId', patientId);
    this.router.navigate(['/patient-dashboard']);
  }

  getCountryFlagImagePath(country: string){
    return this.patService.getCountryFlagImagePath(country);
  }

}
