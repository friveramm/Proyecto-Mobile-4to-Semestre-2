import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InfiniteScrollCustomEvent } from '@ionic/angular';

interface Viaje {
  id: number;
  destino: string;
  asientosDisp: number;
  tarifa: number;
}

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit {
  username = '';
  // Define el tipo para items usando la interfaz Viaje
  items: Viaje[] = [];
  selectedViaje: Viaje | null = null;

  constructor(private router: Router) { 
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      username: '';
      password: '';
    };
    this.username = state.username;
  }

  // Define el JSON como un objeto TypeScript
  viajesDisponibles: Viaje[] = [
    { id: 1, destino: 'Metro Manuel Montt', asientosDisp: 1, tarifa: 1000 },
    { id: 2, destino: 'Antonio Varas 666', asientosDisp: 2, tarifa: 2000  },
    { id: 3, destino: 'Pedro de Valdivia 67', asientosDisp: 3, tarifa: 3000  }
  ];



  ngOnInit() {
    this.items = [...this.viajesDisponibles];

    // // Si quieres añadir más objetos, asegúrate de que sean del tipo `Viaje`
    // for (let i = 4; i < 51; i++) {
    //   this.items.push({
    //     id: i,
    //     destino: `Destino ${i}`,
    //     asientosDisp: i % 5 + 1, // Número de asientos disponibles de ejemplo
    //     tarifa: i * 1000 // Tarifa de ejemplo
    //   });
    // }
  }
}