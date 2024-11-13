// import { Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { Router } from '@angular/router';

// // Import para el mapa
// import * as mapboxgl from 'mapbox-gl';
// import { environment } from 'src/environments/environment.prod';

// // Import para geolocalización
// import { Geolocation } from '@capacitor/geolocation';
// import { HttpClient } from '@angular/common/http';

// // Import para autocompletado
// import { debounceTime, switchMap } from 'rxjs/operators';

// @Component({
//   selector: 'app-chofer',
//   templateUrl: './chofer.page.html',
//   styleUrls: ['./chofer.page.scss'],
// })
// export class ChoferPage implements OnInit {
//   username = '';
//   myControl = new FormControl('');
//   options: string[] = ['Duoc UC Antonio Varas', 'Estación de Metro Manuel Montt'];
//   direccion: string = 'Esperando dirección inicial';
//   direccionDestino: string = '';

//   // Sección de autocompletado
//   direccionControl = new FormControl();
//   direcciones: any[] = [];
  
//   // Variables del mapa
//   public map!: mapboxgl.Map;
//   public style = 'mapbox://styles/mapbox/streets-v11';

//   constructor(private router: Router, private http: HttpClient) {
//     const navegacion = this.router.getCurrentNavigation();
//     const state = navegacion?.extras.state as {
//       username: '';
//       password: '';
//     };
//     this.username = state.username;

//     // MAPA
//     (mapboxgl as any).accessToken = environment.MAPBOX_KEY;
//   }

//   ngOnInit() {
//     this.direccionControl.valueChanges.pipe(
//       debounceTime(300), // Espera 300 ms después de que el usuario deja de escribir
//       switchMap(value => this.buscarDireccion(value))
//     ).subscribe((resultados: any) => {
//       this.direcciones = resultados.features;
//     });
//   }

//   ionViewWillEnter(){
//     if(!this.map){
//       this.crearMapa();
//     }
//   }

//   limpiar(){
    
//   }

//   async crearMapa() {
//     try {
//       const position = await Geolocation.getCurrentPosition();
//       const latitud = position.coords.latitude;
//       const longitud = position.coords.longitude;

//       console.log('Latitud partida:', latitud);
//       console.log('Longitud partida:', longitud);

//       this.map = new mapboxgl.Map({
//         container: 'mapa-box',
//         style: this.style,
//         zoom: 14,
//         center: [longitud, latitud], // Coordenadas de ubicación actual
//       });

//       // Llamar a la función para obtener la dirección
//       this.obtenerDireccion(longitud, latitud);

//     } catch (error) {
//       console.error('Error obteniendo la ubicación:', error);
//     }
//   }

//   obtenerDireccion(longitud: number, latitud: number) {
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitud},${latitud}.json?access_token=${environment.MAPBOX_KEY}`;

//     this.http.get(url).subscribe(
//       (response: any) => {
//         if (response.features && response.features.length > 0) {
//           const direccion = response.features[0].place_name;
//           console.log('Dirección obtenida:', direccion);
//           this.actualizarTextoAutomatico(direccion); // Asegúrate de pasar 'direccion' aquí
//         } else {
//           console.warn('No se encontraron resultados para esas coordenadas');
//           this.actualizarTextoAutomatico('');
//         }
//       },
//       (error) => {
//         console.error('Error al obtener la dirección:', error);
//         this.actualizarTextoAutomatico('');
//       }
//     );
//   }

//   actualizarTextoAutomatico(direccion: string) {
//     this.direccion = direccion; // Asigna directamente la dirección
//   }

//   buscarDireccion(query: string) {
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${environment.MAPBOX_KEY}&autocomplete=true&country=CL`;
//     return this.http.get(url);
//   }
  
//   seleccionarDireccion(direccion: string) {
//     this.buscarDireccion(direccion).subscribe((response: any) => {
//       if (response.features && response.features.length > 0) {
//         const coordinates = response.features[0].geometry.coordinates;
//         const longitude = coordinates[0];
//         const latitude = coordinates[1];
  
//         console.log('Dirección seleccionada:', direccion);
//         console.log('Longitud destino:', longitude);
//         console.log('Latitud destino:', latitude);
//       } else {
//         console.error('No se encontraron coordenadas para la dirección seleccionada.');
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

// Import para el mapa
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';

// Import para geolocalización
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';

// Import para autocompletado
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.page.html',
  styleUrls: ['./chofer.page.scss'],
})
export class ChoferPage implements OnInit {
  username = '';
  myControl = new FormControl('');
  options: string[] = ['Duoc UC Antonio Varas', 'Estación de Metro Manuel Montt'];
  direccion: string = 'Esperando dirección inicial';
  direccionDestino: string = '';

  // Sección de autocompletado
  direccionControlPartida = new FormControl();
  direccionControlDestino = new FormControl();
  direcciones: any[] = [];
  
  // Variables del mapa
  public map!: mapboxgl.Map;
  public style = 'mapbox://styles/mapbox/streets-v11';

  // Variables para la ruta
  longitudInicio: number = 0;
  latitudInicio: number = 0;
  longitudDestino: number = 0;
  latitudDestino: number = 0;

  constructor(private router: Router, private http: HttpClient) {
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
    this.direccionControlPartida.valueChanges.pipe(
      debounceTime(300), // Espera 300 ms después de que el usuario deja de escribir
      switchMap(value => this.buscarDireccion(value))
    ).subscribe((resultados: any) => {
      this.direcciones = resultados.features;
    });
    this.direccionControlDestino.valueChanges.pipe(
      debounceTime(300), // Espera 300 ms después de que el usuario deja de escribir
      switchMap(value => this.buscarDireccion(value))
    ).subscribe((resultados: any) => {
      this.direcciones = resultados.features;
    });
  }

  ionViewWillEnter(){
    if(!this.map){
      this.crearMapa();
    }
  }

  limpiar(){
    // Aquí puedes limpiar los valores de las direcciones si lo deseas
  }

  async crearMapa() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const latitud = position.coords.latitude;
      const longitud = position.coords.longitude;
      this.latitudInicio = latitud;
      this.longitudInicio = longitud;
  
      console.log('Latitud partida:', latitud);
      console.log('Longitud partida:', longitud);
  
      this.map = new mapboxgl.Map({
        container: 'mapa-box',
        style: this.style,
        zoom: 14,
        center: [longitud, latitud], // Coordenadas de ubicación actual
      });
  
      // Llamar a la función para obtener la dirección
      this.obtenerDireccion(longitud, latitud);
  
    } catch (error) {
      console.error('Error obteniendo la ubicación:', error);
    }
  }

  obtenerDireccion(longitud: number, latitud: number) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitud},${latitud}.json?access_token=${environment.MAPBOX_KEY}`;

    this.http.get(url).subscribe(
      (response: any) => {
        if (response.features && response.features.length > 0) {
          const direccion = response.features[0].place_name;
          console.log('Dirección obtenida:', direccion);
          this.actualizarTextoAutomatico(direccion); // Asegúrate de pasar 'direccion' aquí
        } else {
          console.warn('No se encontraron resultados para esas coordenadas');
          this.actualizarTextoAutomatico('');
        }
      },
      (error) => {
        console.error('Error al obtener la dirección:', error);
        this.actualizarTextoAutomatico('');
      }
    );
  }

  actualizarTextoAutomatico(direccion: string) {
    this.direccion = direccion; // Asigna directamente la dirección
  }

  buscarDireccion(query: string) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${environment.MAPBOX_KEY}&autocomplete=true&country=CL`;
    return this.http.get(url);
  }
  
  seleccionarDireccionPartida(direccion: string) {
    this.buscarDireccion(direccion).subscribe((response: any) => {
      if (response.features && response.features.length > 0) {
        const coordinates = response.features[0].geometry.coordinates;
        const longitude = coordinates[0];
        const latitude = coordinates[1];
        this.latitudInicio = latitude;
        this.longitudInicio = longitude;
  
        console.log('Dirección seleccionada:', direccion);
        console.log('Longitud partida:', longitude);
        console.log('Latitud partida:', latitude);

        // Ahora obtenemos la ruta
        // this.obtenerRuta(longitude, latitude);
      } else {
        console.error('No se encontraron coordenadas para la dirección seleccionada.');
      }
    });
  }

  seleccionarDireccionDestino(direccion: string) {
    this.buscarDireccion(direccion).subscribe((response: any) => {
      if (response.features && response.features.length > 0) {
        const coordinates = response.features[0].geometry.coordinates;
        const longitude = coordinates[0];
        const latitude = coordinates[1];
        this.latitudDestino = latitude;
        this.longitudDestino = longitude;
  
        console.log('Dirección seleccionada:', direccion);
        console.log('Longitud destino:', longitude);
        console.log('Latitud destino:', latitude);
        console.log('Ejecutado');

        // Ahora obtenemos la ruta
        // this.obtenerRuta(longitude, latitude);
      } else {
        console.error('No se encontraron coordenadas para la dirección seleccionada.');
      }
    });
  }

  // obtenerRuta(longitudDestino: number, latitudDestino: number) {
  //   // Suponemos que tienes las coordenadas de partida
  //   const longitudPartida = this.map.getCenter().lng;
  //   const latitudPartida = this.map.getCenter().lat;

  //   const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${longitudPartida},${latitudPartida};${longitudDestino},${latitudDestino}?geometries=geojson&access_token=${environment.MAPBOX_KEY}`;

  //   this.http.get(url).subscribe((response: any) => {
  //     const ruta = response.routes[0].geometry; // Ruta obtenida
  //     console.log('Ruta obtenida:', ruta);

  //     // Añadir la ruta al mapa
  //     this.map.addSource('route', {
  //       type: 'geojson',
  //       data: {
  //         type: 'Feature',
  //         properties: {},
  //         geometry: ruta // Aquí va la geometría de la ruta obtenida
  //       }
  //     });

  //     this.map.addLayer({
  //       id: 'route',
  //       type: 'line',
  //       source: 'route',
  //       layout: {
  //         'line-join': 'round',
  //         'line-cap': 'round'
  //       },
  //       paint: {
  //         'line-color': '#3887be',
  //         'line-width': 5
  //       }
  //     });
  //   });
  // }
}
