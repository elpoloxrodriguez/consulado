import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

export interface IAPICore {
  id?: string
  concurrencia?: boolean
  ruta?: string
  funcion?: string
  parametros?: string
  protocolo?: string
  retorna?: boolean
  migrar?: false
  modulo?: string
  relacional?: boolean
  valores?: any
  coleccion?: string
  version?: string
  http?: number
  https?: number
  consumidores?: string
  puertohttp?: number
  puertohttps?: number
  driver?: string
  query?: string
  metodo?: string
  tipo?: string
  prioridad?: string
  logs?: boolean
  descripcion?: string
  entorno?: string
  cache?: number
  estatus?: boolean
  categoria?: string
  entradas?: string
  salidas?: string
  funcionalidad?: string
}

export interface ObjectoGenerico {
  idw: number,
  nomb: string,
  obse: string
}

export interface IPOSTEL_I_ArchivoDigital {
  usuario?: string //CodeEncrypt
  nombre?: string
  empresa?: string
  numc?: string
  tipo?: number
  vencimiento?: string
}


export interface IToken {
  token: string,
}


@Injectable({
  providedIn: 'root'
})


export class ApiService {

  public URL: string = environment.API
  public RUTA: string = environment.Url
  public hash: string = environment.Hash



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    })
  };

  httpOptionsQR = {
    headers: new HttpHeaders({
      'Content-Type': 'text/plain',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    })
  };

  constructor(private router: Router, private http: HttpClient) {
  }


  Ejecutar(xAPI: IAPICore): Observable<any> {
    var url = this.URL + "accion" + this.hash;
    return this.http.post<any>(url, xAPI, this.httpOptions);
  }

  getLoginExternas(parametro: any): Observable<IToken> {
    if (environment.production === true) {
      var url = this.RUTA + '/v1/api/wusuario/access'
    } else {
      var url = this.RUTA + '/v1/api/wusuario/access'
    }
    console.log(url)
    return this.http.post<IToken>(url, parametro)
  }

  getLogin(user: string, clave: string): Observable<IToken> {
    var usuario = {
      "nombre": user,
      "clave": clave,
    }
    if (environment.production === true) {
      var url = this.RUTA + this.URL + 'wusuario/login'
    } else {
      var url = this.URL + 'wusuario/login'
    }
    return this.http.post<IToken>(url, usuario)
  }


  logout() {
    Swal.fire({
      title: "Cerrar Sesión?",
      text: "Esta Seguro de Cerrar Sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Cerrar Sesión!"
    }).then((result) => {
      if (result.isConfirmed) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Sesión Finalizada"
        });
        this.router.navigate(['/login']).then(() => { window.location.reload() });
        sessionStorage.clear();
        localStorage.clear();
      }
    });
  }



}





