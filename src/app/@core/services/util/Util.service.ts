import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})


export class UtilService {

  constructor(

  ) {
  }


  Swal1(position: any, icon: any, title: any, timer: number) {
    Swal.fire({
      position: position,
      icon: icon,
      html: title,
      showConfirmButton: false,
      timer: timer
    });
  }

  SwalMini(position: any, icon: any, title: any, timer: number) {
    const Toast = Swal.mixin({
      toast: true,
      position: position,
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: icon,
      html: title
    });
  }




}





