import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}
  ///authenticated start false  because the   user not allows access to the home page without login
  private authenticated = false;

  login(email: string, password: string): Observable<any> {
    //after Login Succss he can access to the home page
    this.authenticated = true;
    console.log(email,"wsel")
    const loginData = { email, password };
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }
  isAuthenticated(): boolean {
    return this.authenticated;
  }
}