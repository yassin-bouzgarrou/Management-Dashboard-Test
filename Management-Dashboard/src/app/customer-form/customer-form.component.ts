import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css',
})
export class CustomerFormComponent {
  Form: FormGroup;
  tunisianCities: string[] = [
    'Tunis',
    'Sfax',
    'Sousse',
    'Kairouan',
    'Bizerte',
    'Gabès',
    'Ariana',
    'Gafsa',
    'Kasserine',
    'Monastir',
    'Nabeul',
    'Tozeur',
    'Kebili',
    'Jendouba',
    'Mahdia',
    'La Manouba',
    'Siliana',
    'Kef',
    'Sidi Bouzid',
    'Tataouine',
    'Zaghouan',
  ];
  constructor(
    private form: FormBuilder,
    private customerService: CustomerService
  ) {
    this.Form = this.form.group({
      firstname: '',
      lastname: '',
      email: '',
      number: '',
      addres: '',
      city: '',
      dateOfBirdhday: '',
    });
  }

  FormSumbit() {
    if (this.Form.value) {
      this.customerService
        .addCustomer(this.Form.value)
        .subscribe((response) => {
          console.log('Customer added successfully:', response);
        },
        (error) => {
          console.error('Error adding customer:', error);
       
        });
    }
  }
}
