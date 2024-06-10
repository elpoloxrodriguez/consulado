import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Configuración'
    },
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: 'users',
        loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
        data: {
          title: 'Usuarios'
        },
      },
      {
        path: 'countries',
        loadComponent: () => import('./countries/countries.component').then(m => m.CountriesComponent),
        data: {
          title: 'Paises'
        },
      },
      {
        path: 'departments',
        loadComponent: () => import('./departments/departments.component').then(m => m.DepartmentsComponent),
        data: {
          title: 'Departamento'
        },
      },
      {
        path: 'document-type',
        loadComponent: () => import('./document-type/document-type.component').then(m => m.DocumentTypeComponent),
        data: {
          title: 'Tipo Documento'
        },
      },
      {
        path: 'formalities',
        loadComponent: () => import('./formalities/formalities.component').then(m => m.FormalitiesComponent),
        data: {
          title: 'Tramites'
        },
      },
      {
        path: 'schedules',
        loadComponent: () => import('./schedules/schedules.component').then(m => m.SchedulesComponent),
        data: {
          title: 'Horarios'
        },
      },
      {
        path: 'sex',
        loadComponent: () => import('./sex/sex.component').then(m => m.SexComponent),
        data: {
          title: 'Sexo'
        },
      },
    ]
  }
]
