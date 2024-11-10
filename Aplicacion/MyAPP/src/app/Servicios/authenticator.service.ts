import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ApiControllerServiceService } from './api-controller-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  connnectionStatus: boolean;

  constructor(private storage: StorageService, private api: ApiControllerServiceService) {
    this.connnectionStatus = false;
  }

  loginBDD(user: string, pass: string): Promise<boolean> {
    // console.log(user + ' ' + pass); para ver los datos recolectados
    return new Promise((resolve, reject) => {
      this.api.getUser(user).subscribe(
        (res) => {
          if (res.password === pass) {
            this.connnectionStatus = true;
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (error) => {
          console.log("Error: " + error);
          resolve(false); // o puedes rechazar si prefieres reject(false)
        }
      );
    });
  }

  logout() {
    this.connnectionStatus = false;
  }

  isConected() {
    return this.connnectionStatus;
  }
}