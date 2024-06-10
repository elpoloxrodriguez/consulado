import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./action-report.component').then(m => m.ActionReportComponent),
    data: {
      title: $localize`Reporte por Actuación`
    }
  }
];
