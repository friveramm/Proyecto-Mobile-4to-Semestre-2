import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../Servicios/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario = new FormGroup({
    username: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    correo: new FormControl(''),
    clave: new FormControl(''),
    cclave: new FormControl(''),
  });

  mensaje = '';

  user = {
    username: "",
    nombre: "",
    apellido: "",
    correo: "",
    password: ""
  }

  constructor(private router: Router, private storage: StorageService) {}

  registrar() {
    console.log(this.user)
    this.storage.set(this.user.username, this.user);
    this.router.navigate(['/home'])
  }

  ngOnInit() {
  }

  limpiar(){
    this.usuario.controls.username.setValue('');
    this.usuario.controls.nombre.setValue('');
    this.usuario.controls.apellido.setValue('');
    this.usuario.controls.correo.setValue('');
    this.usuario.controls.clave.setValue('');
    this.usuario.controls.cclave.setValue('');
  }

}
