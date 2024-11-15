import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiControllerServiceService {

  apiUrl = "https://b51fh465-8000.brs.devtunnels.ms/api";

  constructor(private http: HttpClient) { }

    getUsers(): Observable<any> {
      return this.http.get(this.apiUrl + "/listar_usuarios")
    }

    getUser(username: string): Observable<any> {
      return this.http.get(this.apiUrl + "/detalle_usuario/" + username)
    }
    
    postUser(data: any): Observable<any> {
      return this.http.post(this.apiUrl + "/listar_usuarios", data)
    }

    updateUser(username: string, data: any): Observable<any> {
      return this.http.put(this.apiUrl + "/detalle_usuario/" + username, data)
    }

    deleteUser(username: string): Observable<any> {
      return this.http.delete(this.apiUrl + "/detalle_usuario/" + username)
    }
  
    getTypeUsers(): Observable<any> {
      return this.http.get(this.apiUrl + "/listar_tipo_usuarios")
    }

    getTrips(): Observable<any> {
      return this.http.get(this.apiUrl + "/listar_viajes")
    }

    getTrip(username: string): Observable<any> {
      return this.http.get(this.apiUrl + "/detalle_viaje/" + username)
    }
    
    postTrip(data: any): Observable<any> {
      return this.http.post(this.apiUrl + "/listar_viajes", data)
    }
}
