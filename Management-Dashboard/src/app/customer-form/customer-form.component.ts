import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css',
})
export class CustomerFormComponent  implements OnInit{ 
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
  ngOnInit(): void {
    this.Form.patchValue(this.data)
  }
  constructor(
    private form: FormBuilder,
    private customerService: CustomerService,
    private dialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //validation of the form 
    this.Form = this.form.group({
      firstname: ['', [Validators.required, Validators.minLength(5)]],
      lastname: ['',  [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
     number: ['', [Validators.required, Validators.pattern('^[0-9]{8,}$')]],
      address: ['',  [Validators.required, Validators.minLength(8)]],
      city: ['', Validators.required],
      dateOfBirthday: ['', Validators.required],
    });
  }

  CloseModel(){
    this.dialog.close()
  }
  //here if data from upaate so will use methode update else we will add 
  FormSumbit() {
    if (this.Form.valid) {
      if(this.data){
        this.customerService.updateCustomer(this.data.id,this.Form.value).subscribe((response) => {
          console.log('Customer added successfully:', response);
          this.dialog.close(true)
      
        },
        (error) => {
          console.error('Error adding customer:', error);
       
        });
      }
      else{
        this.customerService.addCustomer(this.Form.value).subscribe((response) => {
          console.log('Customer added successfully:', response);
          this.dialog.close(true)
      
        },
        (error) => {
          console.error('Error adding customer:', error);
       
        });
      }
      
    }
  }
}
