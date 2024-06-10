import { Component, OnInit } from '@angular/core';
import { DOCUMENT, NgStyle } from '@angular/common';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { ApiService, IAPICore } from 'src/app/@core/services/apicore/apis.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
} from '@coreui/angular';

@Component({
  selector: 'app-desktop-report',
  standalone: true,
  imports: [ChartjsComponent, NgStyle, ReactiveFormsModule, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, CardHeaderComponent, TableDirective, AvatarComponent],
  templateUrl: './desktop-report.component.html',
  styleUrl: './desktop-report.component.scss'
})
export class DesktopReportComponent implements OnInit {

  public xAPI: IAPICore = {
    funcion: '',
    parametros: '',
    valores: {},
  };


  data = {
    labels: [''],
    datasets: [{
      backgroundColor: ['#41B883', '#7D3C98', '#00D8FF', '#DD1B16', '#F7DC6F', '#626567'],
      data: [null]
    }]
  };

  constructor(
    private apiService: ApiService,
  ) {
  }


  async ngOnInit() {
    await this.ReporteEscritorio()
  }


  async ReporteEscritorio() {
    this.xAPI.funcion = "MPPRE_R_ReporteEscritorio"
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    await this.apiService.Ejecutar(this.xAPI).subscribe({
      next: (data) => {
        data.Cuerpo.map((e: any) => {
          console.log(e)
          this.data.labels.push(e.departamento);
          this.data.datasets[0].data.push(e.numero_oficinas);
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  handleChartRef($chartRef: any) {
    $chartRef?.update();
  }


}
