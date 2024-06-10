import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
  ButtonCloseDirective,
  CardHeaderComponent,
  ModalComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent,
  ModalToggleDirective,
  DropdownModule,
  BadgeModule,
} from '@coreui/angular';
import { ApiService, IAPICore } from 'src/app/@core/services/apicore/apis.service';
import { AuthService, IToken } from 'src/app/@core/services/auth.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSelectModule } from 'ngx-select-ex';
import { FormsModule } from '@angular/forms';

import { Md5 } from 'ts-md5';
import * as jwt_decode from 'jwt-decode';
import { UtilService } from 'src/app/@core/services/util/Util.service';
import { Router } from '@angular/router';

interface Login {
  usuario: string
  clave: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
    NgxDatatableModule,
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
  ]
})
export class LoginComponent {

  public xAPI: IAPICore = {
    funcion: '',
    parametros: '',
    valores: {},
  };

  public xLogin: Login = {
    usuario: '',
    clave: ''
  }

  public iToken: IToken = { token: '', };
  public itk: IToken | undefined;

  constructor(
    private apiService: ApiService,
    private utilservice: UtilService,
    private auth: AuthService,
    private router: Router
  ) {

    if (sessionStorage.getItem('token')) {
      this.router.navigateByUrl('#/dashboard', { skipLocationChange: true }).then(() => {
        window.location.assign('#/dashboard');
      });
    }

  }

  async Login() {
    if (this.xLogin.usuario && this.xLogin.clave) {
      const md5 = new Md5();
      const password = md5.appendStr(this.xLogin.clave).end()

      this.xAPI.funcion = "MPPRE_R_Login"
      this.xAPI.parametros = this.xLogin.usuario + ',' + this.xLogin.clave
      this.xAPI.valores = ''

      await this.apiService.getLoginExternas(this.xAPI).subscribe({
        next: (data: IToken) => {
          this.itk = data;
          sessionStorage.setItem("token", this.itk.token);
          this.auth.token = this.itk.token
          this.router.navigateByUrl('#/dashboard', { skipLocationChange: true }).then(() => {
            window.location.assign('#/dashboard');
          });
          // Aquí manejas la lógica con la respuesta exitosa
        },
        error: (error: any) => {
          this.utilservice.SwalMini('top-end', 'error', 'Oops! Lo sentimos </br> algo salio mal! </br> Intente nuevamente!', 3000)
          // console.log(error)
          // Aquí manejas la lógica en caso de error
        }
      });


    }
  }

}
