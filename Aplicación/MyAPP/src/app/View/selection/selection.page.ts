import { Component, OnInit } from '@angular/core';
import { Router,  NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.page.html',
  styleUrls: ['./selection.page.scss'],
})
export class SelectionPage implements OnInit {
  username = '';
  constructor(private router: Router) { 
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      username: '';
      password: '';
    };
    this.username = state.username;
  }

  ngOnInit() {
  }

  chofer(){
    let navigationExtras: NavigationExtras = {
      state: {
        username: this.username,
      },
    };
    this.router.navigate(['/chofer'], navigationExtras);
  }

  pasajero(){
    let navigationExtras: NavigationExtras = {
      state: {
        username: this.username,
      },
    };
    this.router.navigate(['/pasajero'], navigationExtras);
  }
}
