import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/api/customers';

  constructor(private http: HttpClient) {}
//get ALll Customer from the backend
  getAllCustomers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
//add Customer 
  addCustomer(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  } 
// update Customer
  updateCustomer(id:number,data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
// delete Customer 
  deleteaddCustomer(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
