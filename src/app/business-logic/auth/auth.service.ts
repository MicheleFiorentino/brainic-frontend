import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthDaoService } from 'src/app/dao/auth-dao/auth-dao.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  constructor(
    private authDao: AuthDaoService,
    private localStorage: LocalStorageService
    ){}

  // Method to handle login and authentication
  login(email: string, password: string): Observable<any> {
    return this.authDao.login(email, password)
  }

  setLoggedIn(value: boolean) {
    this.loggedInSubject.next(value);
  }
}
