import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';

import { Ciudadanos, RegistroBitacora } from 'src/app/@core/interface/system.service';

import { ApiService, IAPICore } from 'src/app/@core/services/apicore/apis.service';

import { NgxSelectModule } from 'ngx-select-ex';

import Swal from 'sweetalert2';

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
  BadgeModule,
  DropdownModule
} from '@coreui/angular';
import { UtilService } from 'src/app/@core/services/util/Util.service';



interface Horario {
  id: number;
  nombre: string;
}

interface Genero {
  id: number;
  nombre: string;
}

interface Paises {
  id: number;
  iso: string;
  nombre: string;
}

interface Tipo {
  id: number;
  nombre: string;
  descripcion: string;
}

interface Departamento {
  id: number;
  nombre: string;
  status: number;
}

interface Tramite {
  id: number;
  id_dep: number;
  nombre: string;
  status: number;
}

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent | undefined;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public selected = [];



  public ListasSolicitudes: RegistroBitacora[] = [];

  public columns: any;
  public rows: RegistroBitacora[] = [];
  public temp: RegistroBitacora[] = [];
  public search = ''


  public xAPI: IAPICore = {
    funcion: '',
    parametros: '',
    valores: {},
  };

  public xRegistroBitacora: RegistroBitacora = {
    fecha: '',
    id_cc: 0,
    departamento: 0,
    tramite: 0,
    horario: 0
  }


  public horario: Horario[] = []
  public genero: Genero[] = []
  public paises: Paises[] = []
  public tipo: Tipo[] = []
  public departamento: Departamento[] = []
  public tramite: Tramite[] = []


  public ListarCiudadanos: Ciudadanos[] = [];

  public btnShow: boolean = false
  public loadingTable: number = 0

  public showTramite: boolean = false

  constructor(
    private apiService: ApiService,
    private swal: UtilService,

  ) { }

  async ngOnInit() {
    await this.ListaCiudadano();
    await this.ListaSolicitudes();
    await this.ListaHorarios();
    await this.ListaGenero();
    await this.ListaNaciones();
    await this.ListaTipo();
    await this.ListaDepartamento();
  }

  async ListaSolicitudes() {
    this.xAPI.funcion = "MPPRE_R_Solicitudes"
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        if (data.Cuerpo.length > 0) {
          this.loadingTable = 1
          data.Cuerpo.map((e: any) => {
            e.ciudadano = e.tipo_documento + '-' + e.documento + ' ' + e.nombres + ' ' + e.apellidos
            this.ListasSolicitudes.push(e)
          });
          this.rows = this.ListasSolicitudes;
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


  async ListaCiudadano() {
    this.xAPI.funcion = "MPPRE_R_Ciudadanos"
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        if (data.Cuerpo.length > 0) {
          this.ListarCiudadanos = data.Cuerpo.map((e: any) => {
            e.ciudadano = e.tipo_documento + '-' + e.documento + ' | ' + e.nombres + ' ' + e.apellidos + ' | ' + e.iso + '-' + e.pais + ' | ' + e.sexo + ' | ' + e.telefono
            return e
          });
        }
      },
    )
  }

  async ListaHorarios() {
    this.xAPI.funcion = "MPPRE_R_Horarios"
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        if (data.Cuerpo.length > 0) {
          return this.horario = data.Cuerpo
        }
      },
    )
  }

  async ListaGenero() {
    this.xAPI.funcion = "MPPRE_R_Genero"
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        if (data.Cuerpo.length > 0) {
          return this.genero = data.Cuerpo
        }
      },
    )
  }

  async ListaNaciones() {
    this.xAPI.funcion = "MPPRE_R_Paises"
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        if (data.Cuerpo.length > 0) {
          return this.paises = data.Cuerpo
        }
      },
    )
  }

  async ListaTipo() {
    this.xAPI.funcion = "MPPRE_R_TipoDocumento"
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        if (data.Cuerpo.length > 0) {
          this.tipo = data.Cuerpo.map((e: any) => {
            e.xnombre = e.nombre + ' | ' + e.descripcion
            return e
          });
        }
      },
    )
  }

  async ListaDepartamento() {
    this.xAPI.funcion = "MPPRE_R_Departamento"
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        if (data.Cuerpo.length > 0) {
          return this.departamento = data.Cuerpo.filter((e: any) => e.status === 1);
        }
      },
    )
  }

  async ListaTramite(event: number) {
    this.tramite = []
    if (event != null) {
      this.xAPI.funcion = "MPPRE_R_Tramite"
      this.xAPI.parametros = `${event}`
      this.xAPI.valores = ''
      this.apiService.Ejecutar(this.xAPI).subscribe(
        (data) => {
          if (data.Cuerpo.length > 0) {
            this.showTramite = true
            return this.tramite = data.Cuerpo.filter((e: any) => e.status === 1);
          }
        },
      )
    }
    this.showTramite = false
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

  openModal(modalId: string, row: any) {
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

  LimpiarFormulario() {
    this.xRegistroBitacora = {
      horario: 0,
      fecha: '',
      id_cc: 0,
      departamento: 0,
      tramite: 0
    }
  }

  async Registrar() {
    this.xAPI.funcion = "MPPRE_C_Solicitudes"
    this.xAPI.parametros = ''
    this.xAPI.valores = JSON.stringify(this.xRegistroBitacora)
    await this.apiService.Ejecutar(this.xAPI).subscribe({
      next: (data) => {
        if (data.tipo == 1) {
          this.swal.Swal1('top-end', 'success', `<h5><strong>Registrado Exitosamente!</strong></h5>`, 3000)
          this.ListasSolicitudes = []
          this.rows = []
          this.ListaSolicitudes()
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

  Eliminar(row: any) {
    const rowx = { ...row }
    Swal.fire({
      title: "Está seguro de eliminar?",
      html: `<strong><font color="red">${rowx.nombres} ${rowx.apellidos}</font></strong>  </br> Tenga en cuenta que no podrás revertir esto!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminalo!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.xAPI.funcion = "MPPRE_D_Solicitudes"
        this.xAPI.parametros = `${rowx.id}`
        this.xAPI.valores = ''
        this.apiService.Ejecutar(this.xAPI).subscribe({
          next: (data) => {
            if (data.tipo == 1) {
              this.swal.Swal1('top-end', 'success', `<h5><strong><font color="red">${rowx.nombres} ${rowx.apellidos} </font></strong> </br> Eliminado Exitosamente!</h5>`, 3000)
              this.ListasSolicitudes = []
              this.rows = []
              this.ListaSolicitudes()
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

  ModalActualizar(modalId: string, row: any) {
    this.xRegistroBitacora.id = row.id
    this.btnShow = true
    const modal = document.getElementById(modalId) as HTMLElement;
    this.xRegistroBitacora = row;
    if (modal) {
      modal.style.display = 'block'; // Mostrar el modal
      modal.setAttribute('aria-hidden', 'false'); // Cambiar atributo 'aria-hidden' a 'false'
      modal.classList.add('show'); // Agregar la clase 'show' al modal
      const modalBackdrop = document.createElement('div');
      modalBackdrop.classList.add('modal-backdrop', 'show');
      document.body.appendChild(modalBackdrop); // Agregar fondo oscuro al modal
    }
  }

  async Actualizar() {
    this.xAPI.funcion = "MPPRE_U_Solicitudes"
    this.xAPI.parametros = ''
    this.xAPI.valores = JSON.stringify(this.xRegistroBitacora)
    await this.apiService.Ejecutar(this.xAPI).subscribe({
      next: (data) => {
        if (data.tipo == 1) {
          this.swal.Swal1('top-end', 'success', `<h5><strong>Actualizado Exitosamente!</strong> </h5>`, 3000)
          this.ListasSolicitudes = []
          this.rows = []
          this.ListaSolicitudes()
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
