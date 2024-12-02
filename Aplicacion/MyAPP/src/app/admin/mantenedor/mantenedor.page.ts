import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiControllerServiceService } from 'src/app/Servicios/api-controller-service.service';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mantenedor',
  templateUrl: './mantenedor.page.html',
  styleUrls: ['./mantenedor.page.scss'],
})
export class MantenedorPage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  users: any[] = [];

  constructor(private router: Router, private api: ApiControllerServiceService, private actrouter: ActivatedRoute) {
    this.actrouter.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const refresh = params.get('refresh');
      if (refresh) {
        this.cargarUsuarios();  // Llamada al método para refrescar la lista
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  user = {
    "username":"",
  }

  ngOnInit() {
    this.cargarUsuarios();
  }
  /* Al momento de instancia el apiController y recuperar el valor del observable en cada metodo
    para consumirlo y controlarlo usaremos la funcion suscribe , la cual nos permite revisar el resultado 
    al controlar la llamada de la API aplicaremos una logica estilo Try Catch
    La cual nos permitira revisar el estado postivo(200,300) y manejar el negativo(400,500)

    Adicionalmente usaremos una sintaxis ngFor para realizar un recorrido foreach del resultado entragado por la APIRest
    Usaremos una variable any[] para recibir los datos y estos seran mostrados en el front segun los resultados que se encuentren
    de esta manera podremos mostrar toda la informacion almacenada en el JSON que usaremos como API
  */
  cargarUsuarios() {
    this.api.getUsers().subscribe(
      (data) => {
        this.users = data
        console.log(this.users)
      },
      (error) => {
        console.log("Error en la llamada :" + error)
      });
  }

  modificarUsuario(username: string) {
    this.user.username=username

    let navigationExtras: NavigationExtras = {
      state: {
        username: this.user.username
      },
    };

    this.router.navigate(['/editar-usuario'], navigationExtras);
    console.log("apretado")
  }

  eliminarUsuario(username: string) {
    this.api.deleteUser(username).subscribe(
      (response) => {
        console.log("Usuario eliminado exitosamente:", response);
        // Actualiza la lista de usuarios después de la eliminación
        this.cargarUsuarios();
      },
      (error) => {
        console.log("Error en la eliminación del usuario:", error);
      }
    );
  }

}