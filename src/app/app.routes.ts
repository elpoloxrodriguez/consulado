import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { authGuard } from 'src/app/@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Inicio'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes),
        canActivate: [authGuard]
      },
      {
        path: 'requests',
        loadChildren: () => import('./views/requests/register/routes').then((m) => m.routes),
        canActivate: [authGuard]
      },
      {
        path: 'citizens',
        loadChildren: () => import('./views/requests/citizens/routes').then((m) => m.routes),
        canActivate: [authGuard]
      },
      {
        path: 'setting',
        loadChildren: () => import('./views/setting/routes').then((m) => m.routes),
        canActivate: [authGuard]
      },
      {
        path: 'report/performance',
        loadChildren: () => import('./views/report/action-report/routes').then((m) => m.routes),
        canActivate: [authGuard]
      },
      {
        path: 'report/desktop',
        loadChildren: () => import('./views/report/desktop-report/routes').then((m) => m.routes),
        canActivate: [authGuard]
      },
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'login' }
];
