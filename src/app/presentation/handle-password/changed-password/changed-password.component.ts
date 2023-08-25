import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/business-logic/local-storage/local-storage.service';
import { AuthService } from 'src/app/business-logic/auth/auth.service';

@Component({
  selector: 'app-changed-password',
  templateUrl: './changed-password.component.html',
  styleUrls: ['./changed-password.component.scss']
})
export class ChangedPasswordComponent {

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private authService: AuthService
  ){}

  onOK(){
    this.localStorage.clearData();
    this.authService.setLoggedIn(false)
    this.router.navigate(['/login'])
  }
}
