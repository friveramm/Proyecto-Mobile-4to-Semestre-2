import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.page.html',
  styleUrls: ['./chofer.page.scss'],
})
export class ChoferPage implements OnInit {
  username = '';
  myControl = new FormControl('');
  options: string[] = ['Duoc UC Antonio Varas', 'Estación de Metro Manuel Montt'];
  
  // Variables del mapa
  public map!: mapboxgl.Map;
  public style = 'mapbox://styles/mapbox/streets-v11';

  constructor(private router: Router) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      username: '';
      password: '';
    };
    this.username = state.username;

    // MAPA
    (mapboxgl as any).accessToken = environment.MAPBOX_KEY;
  }

  ngOnInit() {
    // this.crearMapa();
  }

  ionViewWillEnter(){
    if(!this.map){
      this.crearMapa();
    }
  }

  limpiar(){
    
  }

  crearMapa(){
    this.map = new mapboxgl.Map({
      container: 'mapa-box',
      style: this.style,
      zoom: 14,
      center:[
        -70.615417,
        -33.4331498,
      ]
    })
  }
}
