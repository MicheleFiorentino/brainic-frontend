import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './business-logic/auth/auth.service';
import { LocalStorageService } from './business-logic/local-storage/local-storage.service';
import { DoctorInfoService } from './business-logic/doctor-info/doctor-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'brainic-frontend';
  message = '';
  avatarPath = '';
  avatar: any;

  constructor(
    private location: Location,
    private router: Router,
    protected authService: AuthService,
    protected localStorage: LocalStorageService,
    private docService: DoctorInfoService
  ) { }

  goBack(): void {
    this.location.back();
  }

  goDoctorInfo(): void {
    this.router.navigate(['/doctor-info']);
  }

  onLogout(){
    this.localStorage.clearData();
    this.authService.setLoggedIn(false)
    this.router.navigate(['/login'])
  }
}
