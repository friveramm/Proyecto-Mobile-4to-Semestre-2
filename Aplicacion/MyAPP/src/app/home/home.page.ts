import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { RecPassPage } from '../rec-pass/rec-pass.page';
import { AuthenticatorService } from './../Servicios/authenticator.service';
import { ApiControllerServiceService } from '../Servicios/api-controller-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  datosUsuario: any;

  constructor(private router: Router, private auth: AuthenticatorService, private api: ApiControllerServiceService) {}

  user = {
    "username":"",
    "password":""
  };
  mensaje = '';

  validarBDD(){
    this.auth.loginBDD(this.user.username, this.user.password).then((res) => {
      if (res) {
        this.api.getUser(this.user.username).subscribe(
          (data) => {
            this.datosUsuario = data; // Asigna los datos recibidos
            this.mensaje = 'Acceso correcto';
  
            let navigationExtras: NavigationExtras = {
              state: {
                username: this.user.username,
                password: this.user.password,
              },
            };
  
            // Redirigir basado en el tipo de usuario
            if (this.datosUsuario.tipo_usuario == 1) {
              // Luego cambiar x vista de admin
              this.router.navigate(['/mantenedor'], navigationExtras);
            } else {
              this.router.navigate(['/selection'], navigationExtras);
            }
  
            // Limpiar campos luego de la navegación
            this.user.username = '';
            this.user.password = '';
            this.mensaje = '';
          },
          (error) => {
            console.error("Error al obtener el usuario:", error);
            this.mensaje = "Error al obtener los datos del usuario";
          }
        );
      } else {
        this.mensaje = "Credenciales Incorrectas";
      }
    });
  }
}