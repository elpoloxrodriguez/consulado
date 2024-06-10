import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';

import { Ciudadanos, RegistroBitacora } from 'src/app/@core/interface/system.service';

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

@Component({
  selector: 'app-citizens',
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
  templateUrl: './citizens.component.html',
  styleUrl: './citizens.component.scss'
})
export class CitizensComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent | undefined;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public selected = [];


  public ListasCiudadanos: Ciudadanos[] = [];
  public rows: Ciudadanos[] = [];
  public temp: Ciudadanos[] = [];
  public columns: any;
  public search = ''


  public searchBitacora = ''
  public ListasBitacoraID: Ciudadanos[] = [];
  public rowsBitacora: Ciudadanos[] = [];
  public tempBitacora: Ciudadanos[] = [];



  public xAPI: IAPICore = {
    funcion: '',
    parametros: '',
    valores: {},
  };

  public xCiudadanos: Ciudadanos = {
    nombres: '',
    apellidos: '',
    genero: undefined,
    nacionalidad: undefined,
    tipo: undefined,
    documento: '',
    telefono: '',
    email: ''
  }


  public genero: Genero[] = []
  public paises: Paises[] = []
  public tipo: Tipo[] = []

  public loadingTable: number = 0

  public loadingTableBitacora: number = 0

  public showTramite: boolean = false

  public btnShow: boolean = false

  public currentDate = new Date();
  public formattedDate = `${this.currentDate.toISOString().split('T')[0]} ${this.currentDate.toTimeString().split(' ')[0]}.${this.currentDate.getMilliseconds().toString().padStart(6, '0')}`;


  constructor(
    private apiService: ApiService,
    private swal: UtilService,
  ) {
  }

  async ngOnInit() {
    await this.ListaCiudadano();
    await this.ListaGenero();
    await this.ListaNaciones();
    await this.ListaTipo();
  }

  async ListaCiudadano() {
    this.xAPI.funcion = "MPPRE_R_Ciudadanos"
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        if (data.Cuerpo.length > 0) {
          this.loadingTable = 1
          data.Cuerpo.map((e: any) => {
            e.documentacion = e.tipo_documento + ' - ' + e.documento
            if (Array.isArray(this.ListasCiudadanos)) {
              this.ListasCiudadanos.push(e);
            }
          });
          this.rows = this.ListasCiudadanos;
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
    // Obtener el valor del input y convertirlo a minúsculas
    const val = event.target.value.toLowerCase();
    // Filtrar los datos
    const temp = this.temp.filter(function (d) {
      return (d["nombres"].toLowerCase().indexOf(val) !== -1 ||
        d["apellidos"].toLowerCase().indexOf(val) !== -1 ||
        d["pais"].toLowerCase().indexOf(val) !== -1 ||
        d["documento"].toLowerCase().indexOf(val) !== -1 ||
        d["telefono"].toLowerCase().indexOf(val) !== -1 ||
        d["email"].toString().indexOf(val) !== -1) || !val;
    });
    // Actualizar las filas con el resultado del filtro
    this.rows = temp;
  }


  filterBitacora(event: any) {
    // Obtener el valor del input y convertirlo a minúsculas
    const val = event.target.value.toLowerCase();
    // Filtrar los datos
    const temp = this.tempBitacora.filter(function (d) {
      return (d["ciudadano"].toLowerCase().indexOf(val) !== -1 ||
        d["horariox"].toLowerCase().indexOf(val) !== -1 ||
        d["fecha"].toLowerCase().indexOf(val) !== -1 ||
        d["departamentox"].toLowerCase().indexOf(val) !== -1 ||
        d["tramitex"].toString().indexOf(val) !== -1) || !val;
    });
    // Actualizar las filas con el resultado del filtro
    this.rowsBitacora = temp;
  }



  async ListaBitacora(id: number) {
    this.ListasBitacoraID = []
    this.rowsBitacora = []
    this.xAPI.funcion = "MPPRE_R_SolicitudesID"
    this.xAPI.parametros = `${id}`
    this.xAPI.valores = ''
    this.apiService.Ejecutar(this.xAPI).subscribe({
      next: (data) => {
        if (data.Cuerpo.length > 0) {
          this.loadingTableBitacora = 1
          data.Cuerpo.map((e: any) => {
            e.ciudadano = e.tipo_documento + '-' + e.documento + ' ' + e.nombres + ' ' + e.apellidos
            this.ListasBitacoraID.push(e)
          });
          this.rowsBitacora = this.ListasBitacoraID;
          this.tempBitacora = this.rowsBitacora
        } else {
          this.loadingTableBitacora = 2
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  async ListaGenero() {
    this.xAPI.funcion = "MPPRE_R_Genero"
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        if (data.Cuerpo.length > 0) {
          return this.genero = data.Cuerpo.filter((e: any) => e.status === 1);
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
          return this.paises = data.Cuerpo.filter((e: any) => e.status === 1);
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
          data.Cuerpo.map((e: any) => {
            e.xnombre = e.nombre + ' | ' + e.descripcion
            return this.tipo = data.Cuerpo.filter((e: any) => e.status === 1);
          });
        }
      },
    )
  }

  async Registrar() {
    this.xAPI.funcion = "MPPRE_C_Ciudadanos"
    this.xAPI.parametros = ''
    this.xAPI.valores = JSON.stringify(this.xCiudadanos)
    await this.apiService.Ejecutar(this.xAPI).subscribe({
      next: (data) => {
        if (data.tipo == 1) {
          this.swal.Swal1('top-end', 'success', `<h5><strong><font color="red">${this.xCiudadanos.nombres} ${this.xCiudadanos.apellidos}</font></strong> </br> Registrado Exitosamente!</h5>`, 3000)
          this.ListasCiudadanos = []
          this.rows = []
          this.ListaCiudadano()
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
    this.xCiudadanos = {
      nombres: '',
      apellidos: '',
      genero: undefined,
      nacionalidad: undefined,
      tipo: undefined,
      documento: '',
      telefono: '',
      email: ''
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

  ModalActualizar(modalId: string, row: any) {
    this.xCiudadanos.id = row.id
    this.btnShow = true
    const modal = document.getElementById(modalId) as HTMLElement;
    this.xCiudadanos = row;
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
      html: `<strong><font color="red">${rowx.nombres} ${rowx.apellidos}</font></strong>  </br> Tenga en cuenta que no podrás revertir esto!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminalo!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.xAPI.funcion = "MPPRE_D_Ciudadanos"
        this.xAPI.parametros = `${rowx.id}`
        this.xAPI.valores = ''
        this.apiService.Ejecutar(this.xAPI).subscribe({
          next: (data) => {
            if (data.tipo == 1) {
              this.swal.Swal1('top-end', 'success', `<h5><strong><font color="red">${rowx.nombres} ${rowx.apellidos}</font></strong> </br> Eliminado Exitosamente!</h5>`, 3000)
              this.ListasCiudadanos = []
              this.rows = []
              this.ListaCiudadano()
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
    console.log(this.xCiudadanos)
    this.xAPI.funcion = "MPPRE_U_Ciudadanos"
    this.xAPI.parametros = ''
    this.xAPI.valores = JSON.stringify(this.xCiudadanos)
    await this.apiService.Ejecutar(this.xAPI).subscribe({
      next: (data) => {
        if (data.tipo == 1) {
          this.swal.Swal1('top-end', 'success', `<h5><strong><font color="red">${this.xCiudadanos.nombres} ${this.xCiudadanos.apellidos}</font></strong> </br> Actualizado Exitosamente!</h5>`, 3000)
          this.ListasCiudadanos = []
          this.rows = []
          this.ListaCiudadano()
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
