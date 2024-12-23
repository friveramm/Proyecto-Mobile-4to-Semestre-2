import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

// Import para el mapa
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';

// Import para geolocalización
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';

// Import para autocompletado
import { debounceTime, switchMap } from 'rxjs/operators';
import { ApiControllerServiceService } from 'src/app/Servicios/api-controller-service.service';

@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.page.html',
  styleUrls: ['./chofer.page.scss'],
})
export class ChoferPage implements OnInit, OnChanges {
  username = '';
  myControl = new FormControl('');
  options: string[] = ['Duoc UC Antonio Varas', 'Estación de Metro Manuel Montt'];
  direccion: string = 'Esperando dirección inicial';

  // Sección de autocompletado
  direccionControlPartida = new FormControl();
  direccionControlDestino = new FormControl();
  direcciones: any[] = [];
  
  // Variables del mapa
  public map!: mapboxgl.Map;
  public style = 'mapbox://styles/mapbox/streets-v11';

  // Variables para la ruta
  direccionPartida: string = '';
  longitudInicio: number = 0;
  latitudInicio: number = 0;
  direccionDestino: string = '';
  longitudDestino: number = 0;
  latitudDestino: number = 0;

  // Necesario para guardar viaje


  constructor(private router: Router, private http: HttpClient, private alertController: AlertController, private api: ApiControllerServiceService) {
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
          this.direccionPartida = direccion;
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
        this.verificarCoordenadas();
  
        console.log('Dirección seleccionada:', direccion);
        console.log('Longitud partida:', longitude);
        console.log('Latitud partida:', latitude);
        this.direccionPartida = direccion;

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
        this.verificarCoordenadas();
  
        console.log('Dirección seleccionada:', direccion);
        console.log('Longitud destino:', longitude);
        console.log('Latitud destino:', latitude);
        this.direccionDestino = direccion;

        // Ahora obtenemos la ruta
        // this.obtenerRuta(longitude, latitude);
      } else {
        console.error('No se encontraron coordenadas para la dirección seleccionada.');
      }
    });
  }

  obtenerRuta(longitudPartida: number, latitudPartida: number, longitudDestino: number, latitudDestino: number) {

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${longitudPartida},${latitudPartida};${longitudDestino},${latitudDestino}?geometries=geojson&access_token=${environment.MAPBOX_KEY}`;
    console.log(url);

    this.http.get(url).subscribe((response: any) => {
      const ruta = response.routes[0].geometry; // Ruta obtenida
      console.log('Ruta obtenida:', ruta);

      // Añadir la ruta al mapa
      this.map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: ruta // Aquí va la geometría de la ruta obtenida
        }
      });

      this.map.addLayer({
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
    // Verifica si la capa 'route' existe en el mapa antes de eliminarla
    if (this.map.getLayer('route')) {
      this.map.removeLayer('route'); // Elimina la capa de la ruta
    }
  
    // Verifica si la fuente 'route' existe en el mapa antes de eliminarla
    if (this.map.getSource('route')) {
      this.map.removeSource('route'); // Elimina la fuente de la ruta
    }
  }

  verificarCoordenadas() {
    if (this.latitudInicio !== 0 && this.longitudInicio !== 0 && this.latitudDestino !== 0 && this.longitudDestino !== 0) {
      // Si las coordenadas son válidas, llamamos a la función obtenerRuta
      this.borrarRuta();
      this.obtenerRuta(this.longitudInicio, this.latitudInicio, this.longitudDestino, this.latitudDestino);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['latitudInicio'] || changes['longitudInicio'] || changes['latitudDestino'] || changes['longitudDestino']) {
      // Si alguna de las coordenadas cambia, verificamos y ejecutamos la función
      this.verificarCoordenadas();
    }
  }

  guardarViaje() {
    const nuevoViaje = {
      direccionPartida: this.direccionPartida,
      latitudPartida: this.latitudInicio,
      longitudPartida: this.longitudInicio,
      direccionDestino: this.direccionDestino,
      latitudDestino: this.latitudDestino,
      longitudDestino: this.longitudDestino,
      precio: Number((document.querySelector('ion-input[placeholder="Ingrese el precio por persona"]') as HTMLIonInputElement).value),
      horaSalida: (document.querySelector('ion-input[placeholder="Ingrese la hora de salida"]') as HTMLIonInputElement).value,
      asientos: Number((document.querySelector('ion-input[placeholder="Ingrese el número de asientos por persona"]') as HTMLIonInputElement).value)
    };
  
    console.log(nuevoViaje);
    
    this.api.postTrip(nuevoViaje).subscribe(
      (response) => {
        console.log('Viaje guardado con éxito:', response);
  
        // Mostrar alerta de éxito
        this.alertController.create({
          header: 'Éxito',
          message: 'Viaje guardado con éxito',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.limpiar(); // Limpia los campos si es necesario
            }
          }]
        }).then(alert => alert.present());
      },
      (error) => {
        console.error('Error al guardar el viaje:', error);
      }
    );
  }  
}
