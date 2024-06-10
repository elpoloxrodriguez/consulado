import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';


import { ApiService, IAPICore } from 'src/app/@core/services/apicore/apis.service';
import { UtilService } from 'src/app/@core/services/util/Util.service';

import { NgxSelectModule } from 'ngx-select-ex';


import {
  ButtonCloseDirective,
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalToggleDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  DropdownModule,
  BadgeModule,
} from '@coreui/angular';
import Swal from 'sweetalert2';
import { Horarios } from 'src/app/@core/interface/system.service';


@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [
    NgxDatatableModule,
    CardComponent,
    ButtonCloseDirective,
    NgxSelectModule,
    CardHeaderComponent,
    FormsModule,
    CardBodyComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ButtonDirective,
    ModalToggleDirective,
    DropdownModule,
    BadgeModule
  ],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.scss'
})
export class SchedulesComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent | undefined;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public selected = [];

  public xHorarios: Horarios = {
    nombre: '',
    status: undefined,
    llave: 0
  }


  public ListasHorarios: Horarios[] = [];

  public columns: any;
  public rows: Horarios[] = [];
  public temp: Horarios[] = [];
  public search = ''


  public xAPI: IAPICore = {
    funcion: '',
    parametros: '',
    valores: {},
  };


  public paises = []

  public status = [
    { id: 1, name: 'Activo' },
    { id: 0, name: 'Inactivo' }
  ]

  public loadingTable: number = 0


  public btnShow: boolean = false


  constructor(
    private apiService: ApiService,
    private swal: UtilService,
  ) {
  }

  async ngOnInit() {
    await this.ListasHorario();
  }

  async ListasHorario() {
    this.xAPI.funcion = "MPPRE_R_Horario"
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        if (data.Cuerpo.length > 0) {
          this.loadingTable = 1
          data.Cuerpo.map((e: any) => {
            if (Array.isArray(this.ListasHorarios)) {
              this.ListasHorarios.push(e);
            }
          });
          this.rows = this.ListasHorarios;
          this.temp = this.rows
        } else {
          this.loadingTable = 2
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  filter(event: any) {
    // Reset ng-select on search
    const val = event.target.value.toLowerCase();
    // Filter Our Data
    const temp = this.temp.filter(function (d) {
      // return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    // this.table.offset = 0;
  }

  async Registrar() {
    this.xAPI.funcion = "MPPRE_C_Horario"
    this.xAPI.parametros = ''
    this.xAPI.valores = JSON.stringify(this.xHorarios)
    await this.apiService.Ejecutar(this.xAPI).subscribe({
      next: (data) => {
        if (data.tipo == 1) {
          this.swal.Swal1('top-end', 'success', `<h5><strong><font color="red">${this.xHorarios.nombre}</font></strong> </br> Registrado Exitosamente!</h5>`, 3000)
          this.ListasHorarios = []
          this.rows = []
          this.ListasHorario()
          this.LimpiarFormulario()
          this.closeModal('verticallyCenteredModal')
        } else {
          this.swal.SwalMini('top-end', 'error', 'Oops! Algo salio mal!...', 3000)
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  LimpiarFormulario() {
    this.xHorarios = {
      id: 0,
      llave: 0,
      nombre: '',
      status: undefined
    }
  }

  closeModal(modalId: string) {
    this.btnShow = false
    const modal = document.getElementById(modalId) as HTMLElement;
    const backdrop = document.querySelector('.modal-backdrop') as HTMLElement;
    if (modal && backdrop) {
      modal.style.display = 'none';
      backdrop.remove();
      this.LimpiarFormulario();
    }
  }

  openModal(modalId: string) {
    this.btnShow = false
    const modal = document.getElementById(modalId) as HTMLElement;
    if (modal) {
      modal.style.display = 'block'; // Mostrar el modal
      modal.setAttribute('aria-hidden', 'false'); // Cambiar atributo 'aria-hidden' a 'false'
      modal.classList.add('show'); // Agregar la clase 'show' al modal
      const modalBackdrop = document.createElement('div');
      modalBackdrop.classList.add('modal-backdrop', 'show');
      document.body.appendChild(modalBackdrop); // Agregar fondo oscuro al modal
    }
  }

  ModalActualizar(modalId: string, row: any) {
    this.xHorarios.id = row.id
    this.btnShow = true
    const modal = document.getElementById(modalId) as HTMLElement;
    this.xHorarios = row;
    if (modal) {
      modal.style.display = 'block'; // Mostrar el modal
      modal.setAttribute('aria-hidden', 'false'); // Cambiar atributo 'aria-hidden' a 'false'
      modal.classList.add('show'); // Agregar la clase 'show' al modal
      const modalBackdrop = document.createElement('div');
      modalBackdrop.classList.add('modal-backdrop', 'show');
      document.body.appendChild(modalBackdrop); // Agregar fondo oscuro al modal
    }
  }

  Eliminar(row: any) {
    const rowx = { ...row }
    Swal.fire({
      title: "Está seguro de eliminar?",
      html: `<strong><font color="red">${rowx.nombre}</font></strong>  </br> Tenga en cuenta que no podrás revertir esto!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminalo!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.xAPI.funcion = "MPPRE_D_Horario"
        this.xAPI.parametros = `${rowx.id}`
        this.xAPI.valores = ''
        this.apiService.Ejecutar(this.xAPI).subscribe({
          next: (data) => {
            if (data.tipo == 1) {
              this.swal.Swal1('top-end', 'success', `<h5><strong><font color="red">${rowx.nombre}</font></strong> </br> Eliminado Exitosamente!</h5>`, 3000)
              this.ListasHorarios = []
              this.rows = []
              this.ListasHorario()
            } else {
              this.swal.SwalMini('top-end', 'error', 'Oops! Algo salio mal!...', 3000)
            }
          },
          error: (error) => {
            console.log(error);
            this.swal.SwalMini('top-end', 'error', 'Oops! Algo salio mal!...', 3000)
          }
        });
      }
    });
  }

  async Actualizar() {
    this.xAPI.funcion = "MPPRE_U_Horario"
    this.xAPI.parametros = ''
    this.xAPI.valores = JSON.stringify(this.xHorarios)
    await this.apiService.Ejecutar(this.xAPI).subscribe({
      next: (data) => {
        if (data.tipo == 1) {
          this.swal.Swal1('top-end', 'success', `<h5><strong><font color="red">${this.xHorarios.nombre} </font></strong> </br> Actualizado Exitosamente!</h5>`, 3000)
          this.ListasHorarios = []
          this.rows = []
          this.ListasHorario()
          this.LimpiarFormulario()
          this.closeModal('verticallyCenteredModal')
        } else {
          this.swal.SwalMini('top-end', 'error', 'Oops! Algo salio mal!...', 3000)
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}

