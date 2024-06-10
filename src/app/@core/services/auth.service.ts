import { Injectable } from '@angular/core';
import { UtilService } from './util/Util.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface IToken {
  token: string,
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  public URL: string = environment.API
  public RUTA: string = environment.Url


  token = sessionStorage.getItem('token');

  constructor(
    // private http: HttpClient,
    private utilservice: UtilService,
    private router: Router,
  ) {
  }

  isAuth() {
    return this.token != undefined;
  }

  login(username: string, password: string): boolean {
    // Lógica de autenticación aquí, por ejemplo, una solicitud HTTP a tu servidor
    if (username === 'admin' && password === 'admin') {
      // Si las credenciales son válidas, guardamos el usuario en sessionStorage
      return true;
    } else {
      this.utilservice.SwalMini('top-end', 'error', 'Oops! Lo sentimos </br> algo salio mal! </br> Intente nuevamente!', 3000)
      return false;
    }
  }


  logout(): void {
    // Limpiamos la sesión al cerrar sesión
    sessionStorage.removeItem('token');
  }

  getUser(): any {
    // Obtenemos el usuario almacenado en sessionStorage
    const currentUser = sessionStorage.getItem('token');
    return currentUser ? JSON.parse(currentUser) : null;
  }

  isLoggedIn(): boolean {
    // Verificamos si el usuario ha iniciado sesión
    return sessionStorage.getItem('token') !== null;
  }

}
