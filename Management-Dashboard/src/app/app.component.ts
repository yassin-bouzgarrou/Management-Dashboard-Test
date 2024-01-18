import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from './customer-form/customer-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Management-Dashboard';
  constructor(private ModuleDialog: MatDialog) {}
  openModule() {
    this.ModuleDialog.open(CustomerFormComponent);
  }
}
