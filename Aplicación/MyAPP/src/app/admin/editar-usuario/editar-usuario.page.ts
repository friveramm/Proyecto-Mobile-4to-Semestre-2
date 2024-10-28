import { Component, OnInit } from '@angular/core';
import { Router,  NavigationExtras} from '@angular/router';
import { ApiControllerServiceService } from 'src/app/Servicios/api-controller-service.service';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {
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

  constructor(private router: Router, private api: ApiControllerServiceService) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      username: '';
      password: '';
    };
    this.username = state.username;
  }

  ngOnInit() {
    this.cargarUsuario();
    this.cargarTipoUsuarios();
  }

  cargarUsuario() {
    this.api.getUser(this.username).subscribe(
      (data) => {
        this.user = data;
        console.log('Datos del usuario cargados:', this.user);
        
        // Actualiza los valores del formulario usando patchValue
        this.usuario.patchValue({
          username: this.user.username,
          nombre: this.user.nombre,
          apellido: this.user.apellido,
          correo: this.user.correo,
          clave: this.user.password
        });
      },
      (error) => {
        console.log("Error al cargar los datos del usuario:", error);
      }
    );
  }

  limpiar(){
    this.usuario.controls.nombre.setValue('');
    this.usuario.controls.apellido.setValue('');
    this.usuario.controls.correo.setValue('');
    this.usuario.controls.clave.setValue('');
  }

  modificar() {
    // Crea un objeto con los valores del formulario
    const updatedData = {
      username: this.usuario.value.username,
      nombre: this.usuario.value.nombre,
      apellido: this.usuario.value.apellido,
      correo: this.usuario.value.correo,
      password: this.usuario.value.clave,
      tipo_usuario: this.usuario.value.tipoUsuario
    };

    console.log(updatedData);
  
    this.api.updateUser(this.user.username, updatedData).subscribe(
      (response) => {
        console.log("Usuario actualizado con éxito:", response);
        this.router.navigate(['/mantenedor']);
      },
      (error) => {
        console.error("Error al actualizar el usuario:", error);
      }
    );
  }

  cargarTipoUsuarios() {
    this.api.getTypeUsers().subscribe(
      (data) => {
        this.typeUsers = data
        console.log(this.typeUsers)
      },
      (error) => {
        console.log("Error en la llamada :" + error)
      });
  }
}
