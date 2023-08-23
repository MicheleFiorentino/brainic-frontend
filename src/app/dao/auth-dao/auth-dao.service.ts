import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthDaoService {
  private baseUrl = 'http://localhost:8080/bodybrainic';
  private loginUrl = '/auth/login'

  constructor(private http: HttpClient) { }

  // Method to handle login and authentication
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(this.baseUrl.concat(this.loginUrl), loginData);
  }
}
