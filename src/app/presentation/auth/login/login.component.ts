import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/business-logic/auth/auth.service';
import { LocalStorageService } from 'src/app/business-logic/local-storage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  areCredentialsWrong: boolean = false

  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorage: LocalStorageService
  ){}

  ngOnInit(): void {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        this.localStorage.saveData('doctorId',response.id);
        this.authService.setLoggedIn(true);
        this.router.navigate(['/patients-list'])
      },
      error => {
        // Handle login error here
        this.areCredentialsWrong = true;
      }
    );
  }

  onRecoverPassword(){
    this.router.navigate(['/recover-password'])
  }
}
