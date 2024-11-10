import { Component, OnInit } from '@angular/core';
import { Router,  NavigationExtras} from '@angular/router';
import { ApiControllerServiceService } from 'src/app/Servicios/api-controller-service.service';
import { FormControl, FormGroup} from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.page.html',
  styleUrls: ['./agregar-usuario.page.scss'],
})
export class AgregarUsuarioPage implements OnInit {

  username = '';

  user = {
    username: "",
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    tipo_usuario: ""
  }

  usuario = new FormGroup({
    username: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    correo: new FormControl(''),
    clave: new FormControl(''),
    tipoUsuario: new FormControl('')
  });

  typeUsers: any[] = [];

  constructor(private api: ApiControllerServiceService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.cargarTipoUsuarios();
  }

  cargarTipoUsuarios() {
    this.api.getTypeUsers().subscribe(
      (data) => {
        this.typeUsers = data;
        console.log(this.typeUsers);
        
        
        if (this.typeUsers.length >= 2) {
          this.usuario.controls.tipoUsuario.setValue(this.typeUsers[1].idTipoUsuario);
          this.user.tipo_usuario = this.typeUsers[1].idTipoUsuario;  // Para ngModel
        }
      },
      (error) => {
        console.log("Error en la llamada :" + error);
      }
    );
  }

  limpiar(){
    this.usuario.controls.nombre.setValue('');
    this.usuario.controls.apellido.setValue('');
    this.usuario.controls.correo.setValue('');
    this.usuario.controls.clave.setValue('');
    this.usuario.controls.tipoUsuario.setValue(this.typeUsers[1].idTipoUsuario);
  }

  agregar() {
    const nuevoUsuario = {
      username: this.usuario.value.username,
      nombre: this.usuario.value.nombre,
      apellido: this.usuario.value.apellido,
      correo: this.usuario.value.correo,
      password: this.usuario.value.clave,
      tipo_usuario: this.usuario.value.tipoUsuario
    };

    console.log(nuevoUsuario);

    this.api.postUser(nuevoUsuario).subscribe(
      (response) => {
        console.log("Usuario agregado con éxito:", response);

        // Muestra la alerta
        this.alertController.create({
          header: 'Éxito',
          message: 'Usuario agregado con éxito',
          buttons: [{
            text: 'OK',
            handler: () => {
              // Navega a la página mantenedor después de que el usuario cierre la alerta
              this.limpiar();
            }
          }]
        }).then(alert => alert.present());
      },
      (error) => {
        console.error("Error al agregar el usuario:", error);
      }
    );
  }
}
