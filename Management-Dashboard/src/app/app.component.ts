import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerService } from './services/customer.service';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstname',
    'lastname',
    'email',
    'address',
    'city',
    'dateOfBirthday',
    'actions',
  ];
  dataSource: any[] = [];
  clickedRows = new Set<any>();
  private refreshSubscription!: Subscription;

  constructor(
    private moduleDialog: MatDialog,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  openModule() {
    // here after add customer render the  list Customers  again
    const ref = this.moduleDialog.open(CustomerFormComponent);
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.getCustomer();
      }
    });
  }

  
  editCustomer(data: any) {
    const ref = this.moduleDialog.open(CustomerFormComponent,{
    data,});
    //AFTER I UPDATE AND I CLOSE  THE DIALOG I RENDER THE DATA 
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.getCustomer();
      }
    });
  }
 //AFTER I DELETE AND  I RENDER THE DATA 
  deleteCustomer(id: string) {
    console.log(id);
    this.customerService.deleteaddCustomer(+id).subscribe(
      (response) => {
        console.log('Customers Deleted:');
        alert('Deleted');
        this.getCustomer();
      },
      (error) => {
        console.error('Error retrieving customers:', error);
      }
    );
  }
  //this function to get all the data of customer
  getCustomer() {
    this.customerService.getAllCustomers().subscribe(
      (response) => {
        console.log('Customers retrieved successfully:', response);
        this.dataSource = response;
      },
      (error) => {
        console.error('Error retrieving customers:', error);
      }
    );
  }
}
