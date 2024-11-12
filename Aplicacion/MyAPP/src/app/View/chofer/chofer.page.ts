import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';

// Import para geolocalización
import { Geolocation } from '@capacitor/geolocation';

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

  async crearMapa() {
    try {
      // Obtiene la posición actual
      const position = await Geolocation.getCurrentPosition();
      const latitud = position.coords.latitude;
      const longitud = position.coords.longitude;
  
      // Centra el mapa en la posición actual
      this.map = new mapboxgl.Map({
        container: 'mapa-box',
        style: this.style,
        zoom: 14,
        center: [longitud, latitud]
      });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  }
}
