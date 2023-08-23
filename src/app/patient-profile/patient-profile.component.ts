import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/business-logic/local-storage/local-storage.service';
import { PatientInfoService } from '../business-logic/patient-info/patient-info.service';
import { Patient } from 'src/app/interfaces/patient';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent {
  patient?: Patient;
  avatar: any;

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private patService: PatientInfoService
  ){}

  ngOnInit(): void {
    let docIdData: any = this.localStorage.getData('patientId');
    let docId: number = 0;
    if(typeof docIdData === 'string'){
      docId = parseInt(docIdData,10);
    }
    this.initPatientInfo(docId);
  }

  initPatientInfo(patId: number){
    this.patService.getPatientInfo(patId)
    .subscribe(pat => {
      this.patient = pat;
      this.initPatientAvatar(pat.imagePath);
    } );
  }

  initPatientAvatar(avatarPath: string){
    this.patService.getPatientAvatarAsBase64(avatarPath).subscribe(
      (base64Avatar: string) => {
        this.avatar = base64Avatar;
      }
    );
  }
}
