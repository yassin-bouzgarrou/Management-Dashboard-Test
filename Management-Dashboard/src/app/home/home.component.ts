
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomerService } from '../services/customer.service';
import { interval, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{
  displayedColumns: string[] = [
    'id',
    'firstname',
    'lastname',
    'email',
    'number',
    'address',
    'city',
    'dateOfBirthday',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;
  clickedRows = new Set<any>();

  constructor(
    private moduleDialog: MatDialog,
    private customerService: CustomerService,
    private _snackBar: MatSnackBar
 
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


  //  service method to get all customers after apply the filter
  applyFilter(filterValue: string): void {
    this.customerService.getAllCustomers().subscribe(
      (respo: any[]) => {
        
        filterValue = filterValue.trim().toLowerCase();
        let filtered = respo.filter((item: any) =>
          item.firstname.toLowerCase().includes(filterValue)
        );
        if(filterValue.length === 0){
          this.dataSource = new MatTableDataSource();

        }
  
        console.log(filtered, "this filtered");
        this.dataSource = new MatTableDataSource(filtered);
        
      },
      (eroor: any) => {
        console.error('Error retrieving customers:', eroor);
      }
    );
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
        this._snackBar.open('Customer  deleted!', 'Close', {
          duration: 3000, 
          panelClass: ['red-snackbar']
        })
        this.getCustomer();
      },
      (error) => {
        console.error('Error retrieving customers:', error);
      }
    );
  }
  //this function to get all the data of customer
  getCustomer():any {
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
