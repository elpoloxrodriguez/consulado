import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./desktop-report.component').then(m => m.DesktopReportComponent),
    data: {
      title: $localize`Reporte por Escritorios`

    }
  }
];
