import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/business-logic/local-storage/local-storage.service';
import { PatientDisplay } from './context-model/patient-display';
import { MatTableDataSource } from '@angular/material/table';
import { PatientInfoService } from 'src/app/business-logic/patient-info/patient-info.service';
import { PatientsListService } from 'src/app/business-logic/patients-list/patients-list.service';
import { ChangeDetectorRef } from '@angular/core';
import { NotificationService } from 'src/app/business-logic/notification/notification.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent {
  displayedColumns: string[] = ['image', 'name', 'surname', 'sex', 'email', 'countryFlag', 'button'];
  patientDataSource = new MatTableDataSource<PatientDisplay>
  docId!: number;

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private patService: PatientInfoService,
    private plService: PatientsListService,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService
  ){}

  ngOnInit() {
    this.createEventSource();
    let docIdData: any = this.localStorage.getData('doctorId');
    this.docId = typeof docIdData === 'string' ? parseInt(docIdData, 10) : 0;
    this.getDoctorPatientList(this.docId);
  }

  ngOnDestroy(){
    this.destroyEventSource();
  }


  //SUBSCRIBE FOR NOTIFICATIONS

  createEventSource(){
    this.plService.createEventSource().subscribe(
      (e: string) => {
        this.getDoctorPatientList(this.docId);
        this.notification.show("Got New Patients!");
        this.notification.show("Got New Patients!");  //Needs to duplicate or it gets buggy
      }
    );
  }

  destroyEventSource(){
    this.plService.destroyEventSource();
  }



  async getDoctorPatientList(docId: number) {
    const patients = await this.patService.getDoctorPatientListWithDetails(docId);
    this.patientDataSource.data = []
    this.patientDataSource.data = patients;
    this.cdr.detectChanges();
  }

  onPatientButton(patientId: number) {
    this.localStorage.saveData('patientId', patientId);
    this.router.navigate(['/patient-dashboard']);
  }

  getCountryFlagImagePath(country: string){
    return this.patService.getCountryFlagImagePath(country);
  }

}
