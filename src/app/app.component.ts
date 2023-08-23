import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './business-logic/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'brainic-frontend';
  constructor(
    private location: Location,
    private router: Router,
    protected authService: AuthService
  ) { }

  goBack(): void {
    this.location.back();
  }

  goDoctorInfo(): void {
    this.router.navigate(['/doctor-info']);
  }
}
