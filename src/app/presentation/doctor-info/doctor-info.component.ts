import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/business-logic/local-storage/local-storage.service';
import { DoctorInfoService } from 'src/app/business-logic/doctor-info/doctor-info.service';
import { Doctor } from 'src/app/interfaces/doctor';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.scss']
})
export class DoctorInfoComponent {
  doctor?: Doctor;
  avatar: any;

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private docService: DoctorInfoService
  ){}

  ngOnInit(): void {
    let docIdData: any = this.localStorage.getData('doctorId');
    let docId: number = 0;
    if(typeof docIdData === 'string'){
      docId = parseInt(docIdData,10);
    }
    this.initDoctorInfo(docId);
  }

  initDoctorInfo(docId: number){
    this.docService.getDoctorInfo(docId)
    .subscribe(doc => {
      this.doctor = doc;
      this.initDoctorAvatar(doc.imagePath);
    } );
  }

  initDoctorAvatar(avatarPath: string){
    this.docService.getDoctorAvatarAsBase64(avatarPath).subscribe(
      (base64Avatar: string) => {
        this.avatar = base64Avatar;
      }
    );
  }
}
