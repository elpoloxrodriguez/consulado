import { Injectable } from '@angular/core';


export interface Ciudadanos {
  [x: string]: any;
  id?: number
  nombres: string
  apellidos: string
  genero: any
  nacionalidad: any
  tipo: any
  documento: string
  telefono: string
  email: string
  user_created?: number
  user_updated?: number
  date_updated?: string
}

export interface Paises {
  id?: number
  iso: string
  nombre: string
  status: any
}

export interface Horarios {
  id?: number
  llave: number
  nombre: string
  status: any
}

export interface Sexo {
  id?: number
  llave: number
  nombre: string
  status: any
}

export interface Tramites {
  id?: number
  id_dep: number
  nombre: string
  status: any
}


export interface Departamento {
  id?: number
  llave: number
  nombre: string
  status: any
}

export interface TipoDocumento {
  id?: number
  llave: number
  nombre: string
  descripcion: string
  status: any
}

export interface RegistroBitacora {
  id?: number
  horario: number
  fecha: string
  id_cc: number
  departamento: number
  tramite: number
  user_created?: string
  user_updated?: string

}


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor() { }
}
