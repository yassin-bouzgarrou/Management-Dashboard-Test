import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent {
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

}
