import { Component } from '@angular/core';
import { DoctorInfoService } from 'src/app/business-logic/doctor-info/doctor-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  isPasswordWrong: boolean = false;
  isConfirmPasswordWrong: boolean = false;

  constructor(
    private docService: DoctorInfoService,
    private router: Router
  ){}

  onConfirm(){
    this.isPasswordWrong = this.isConfirmPasswordWrong = false;

    if(this.newPassword !== this.confirmNewPassword){
      this.isConfirmPasswordWrong = true;
      return;
    }

    this.docService.changeDoctorPassword(this.oldPassword, this.newPassword).subscribe(
      response => {
        this.router.navigate(['/changed-password']);
      },
      error => {
        this.isPasswordWrong = true;
      }
    )

  }

}
