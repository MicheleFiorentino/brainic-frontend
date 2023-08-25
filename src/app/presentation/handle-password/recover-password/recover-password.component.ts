import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DoctorInfoService } from 'src/app/business-logic/doctor-info/doctor-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent {
  code: string = '';
  isCodeWrong: boolean = false;
  isCodeSent: boolean = false;
  email: string = '';

  constructor(
    private docService: DoctorInfoService,
    private snackBar: MatSnackBar,
    private router: Router
  ){}

  onSend(){
    this.isCodeSent = true;

    //TODO - function to get Info By Email
    this.docService.getDoctorInfo(2)
    .subscribe(doc => {
      let email= doc.email;
      const atIndex = email.indexOf('@');

      if (atIndex > 0) {
        const firstLetter = email[0];
        const domain = email.substring(atIndex);
        const obscuredEmail = `${firstLetter}***${domain}`;

      this.snackBar.open('code sent to: ' + obscuredEmail, 'close', {
        duration: 3000, //milliseconds
      });
    } else {
      //invalid format
    }
  })

  }

  onConfirm(){
    //TODO - function to generate and check code
    if(this.code == '000000'){
      this.router.navigate(['/changed-password'])
    }
  }
}
