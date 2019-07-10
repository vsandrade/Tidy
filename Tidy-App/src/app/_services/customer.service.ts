import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../_models/Customer';
import { Constants } from '../util/Constants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseURL = Constants.URLCustomer;

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseURL);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseURL}/${id}`);
  }

  postCustomer(customer: Customer) {
    return this.http.post(this.baseURL, customer);
  }

  putCustomer(id: number, customer: Customer) {
    return this.http.put(`${this.baseURL}/${id}`, customer);
  }

  deleteCustomer(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
