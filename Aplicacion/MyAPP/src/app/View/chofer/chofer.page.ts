import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.page.html',
  styleUrls: ['./chofer.page.scss'],
})
export class ChoferPage implements OnInit {
  username = '';
  myControl = new FormControl('');
  options: string[] = ['Duoc UC Antonio Varas', 'Estación de Metro Manuel Montt'];
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

  limpiar(){
    
  }

}
