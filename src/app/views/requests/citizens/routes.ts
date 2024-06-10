import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./citizens.component').then(m => m.CitizensComponent),
    data: {
      title: $localize`Ciudadanos`
    }
  }
];

