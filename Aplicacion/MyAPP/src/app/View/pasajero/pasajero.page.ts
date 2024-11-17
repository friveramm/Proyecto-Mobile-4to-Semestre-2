import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ApiControllerServiceService } from 'src/app/Servicios/api-controller-service.service';

// Import para el mapa
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

interface Viaje {
  idViaje: number;
  direccionPartida: string;
  direccionDestino: string;
  asientos: number;
  precio: number;
  latitudPartida: number;
  longitudPartida: number;
  latitudDestino: number;
  longitudDestino: number;
  horaSalida: string;
}

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit {
  username = '';
  selectedViaje: Viaje | null = null;

  // Para cargar viajes
  viajes: any[] = [];

  // Variables del mapa
  public map: mapboxgl.Map | null = null;
  public style = 'mapbox://styles/mapbox/streets-v11';

  constructor(private router: Router, private api: ApiControllerServiceService, private http: HttpClient) { 
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      username: '';
      password: '';
    };
    this.username = state.username;
    // MAPA
    (mapboxgl as any).accessToken = environment.MAPBOX_KEY;
  }

  async crearMapa(longitudInicial: number, latitudInicial: number) {
    try {
      this.map = new mapboxgl.Map({
        container: 'mapa-box',
        style: this.style,
        zoom: 14,
        center: [longitudInicial, latitudInicial], // Coordenadas de ubicación actual
      });
  
    } catch (error) {
      console.error('Error obteniendo la ubicación:', error);
    }
  }

  //Cargar viajes
  cargarViajes() {
    this.api.getTrips().subscribe(
      (data) => {
        this.viajes = data;
        console.log(this.viajes);
      },
      (error) => {
        console.log("Error en la llamada :" + error);
      }
    );
  }

  obtenerRuta(longitudPartida: number, latitudPartida: number, longitudDestino: number, latitudDestino: number) {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${longitudPartida},${latitudPartida};${longitudDestino},${latitudDestino}?geometries=geojson&access_token=${environment.MAPBOX_KEY}`;
    console.log(url);
  
    this.http.get(url).subscribe((response: any) => {
      const ruta = response.routes[0].geometry; // Ruta obtenida
      console.log('Ruta obtenida:', ruta);
  
      // Añadir la ruta al mapa, asegurándose de que map no sea null
      this.map?.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: ruta // Aquí va la geometría de la ruta obtenida
        }
      });
  
      this.map?.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5
        }
      });
    });
  }
  
  borrarRuta() {
    // Elimina la capa y fuente si el mapa está inicializado
    this.map?.getLayer('route') && this.map.removeLayer('route');
    this.map?.getSource('route') && this.map.removeSource('route');
  }
  

  ngOnInit() {
    this.cargarViajes();
  }

  seleccionViaje(event: any) {
    const viajeSeleccionado = event.detail.value; // Obtiene el viaje seleccionado
    console.log('Viaje seleccionado:', viajeSeleccionado);
    
    const longitudPartida = viajeSeleccionado.longitudPartida;
    const latitudPartida = viajeSeleccionado.latitudPartida;
    const longitudDestino = viajeSeleccionado.longitudDestino;
    const latitudDestino = viajeSeleccionado.latitudDestino;
    
    // Verificar que las coordenadas son números
    if (typeof longitudPartida === 'number' && !isNaN(longitudPartida) && typeof latitudPartida === 'number' && !isNaN(latitudPartida)
      && typeof longitudDestino === 'number' && !isNaN(longitudDestino) && typeof latitudDestino === 'number' && !isNaN(latitudDestino)) {
  
      // Si el mapa ya está creado, solo actualizamos el centro y la ruta
      if (this.map) {
        // Cambiar el centro del mapa
        this.map.setCenter([longitudPartida, latitudPartida]);
  
        // Si la ruta ya está cargada, actualizamos los datos
        this.borrarRuta(); // Limpiar la ruta actual
        this.obtenerRuta(longitudPartida, latitudPartida, longitudDestino, latitudDestino);
      } else {
        // Si no hay mapa, lo creamos
        setTimeout(() => {
          this.crearMapa(longitudPartida, latitudPartida);
          this.obtenerRuta(longitudPartida, latitudPartida, longitudDestino, latitudDestino);
        }, 300); // Se puede ajustar el tiempo de espera
      }
    } else {
      console.log('Las coordenadas no son números válidos');
    }
  }
}