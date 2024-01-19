// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import the Router
import { AuthService } from '../Auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authServie: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.formLogin.controls;
  }

  submitLogin(): void {
    if (this.formLogin.valid) {
      const email = this.formControls['email'].value;
      const password = this.formControls['password'].value;
      console.log(email, password);
      // Call login method, and if response is successful, navigate to '/second'
      this.authServie.login(email, password).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/second']);
        },
        (error) => {
 
          this._snackBar.open('invalid email or password', 'Close', {
            duration: 3000, 
            panelClass: ['red-snackbar']
          });
        }
      );
    } else {
      this._snackBar.open('invalid email or password', 'Close', {
        duration: 3000, 
        panelClass: ['red-snackbar']
      });
    }
  }
}
