import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';;
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/api/customers/';
  getAllCustomer() {
    this.http.get(this.apiUrl);
  }
  addCustomer(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
