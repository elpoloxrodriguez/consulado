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
  selector: 'app-action-report',
  standalone: true,
  imports: [ChartjsComponent, NgStyle, ReactiveFormsModule, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, CardHeaderComponent, TableDirective, AvatarComponent],
  templateUrl: './action-report.component.html',
  styleUrl: './action-report.component.scss'
})
export class ActionReportComponent implements OnInit {


  public xAPI: IAPICore = {
    funcion: '',
    parametros: '',
    valores: {},
  };

  data = {
    labels: [''],
    datasets: [
      {
        label: 'Reporte por Actuación',
        backgroundColor: ['#41B883', '#7D3C98', '#00D8FF', '#DD1B16', '#F7DC6F', '#626567', '#F5B7B1', '#1B4F72', '#D35400 ', '#E74C3C '],
        borderColor: 'rgba(220, 220, 220, 1)',
        pointBackgroundColor: 'rgba(220, 220, 220, 1)',
        pointBorderColor: '#fff',
        data: [0]
      },
    ]
  };


  // handleChartRef($chartRef: any) {
  //   if ($chartRef) {
  //     console.log('handleChartRef', $chartRef);
  //     this.data.labels.push('August');
  //     this.data.datasets[0].data.push(60);
  //     this.data.datasets[1].data.push(20);
  //     setTimeout(() => {
  //       $chartRef?.update();
  //     }, 3000);
  //   }
  // }

  constructor(
    private apiService: ApiService,
  ) {
  }


  async ngOnInit() {
    await this.ReporteActuacion()
  }

  async ReporteActuacion() {
    this.xAPI.funcion = "MPPRE_R_ReporteActuacion"
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    await this.apiService.Ejecutar(this.xAPI).subscribe({
      next: (data) => {
        data.Cuerpo.map((e: any) => {
          console.log(e)
          this.data.labels.push(e.tramite);
          this.data.datasets[0].data.push(e.numero_registros);
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
