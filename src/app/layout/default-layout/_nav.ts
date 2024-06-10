import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Panel',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    title: true,
    name: 'Solicitudes'
  },
  {
    name: 'Ciudadanos',
    url: '/citizens',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Solicitudes',
    url: '/requests',
    iconComponent: { name: 'cil-description' }
  },
  {
    name: 'Configuración',
    title: true
  },
  {
    name: 'Usuarios',
    url: '/setting/users',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Tablas',
    url: '/setting',
    iconComponent: { name: 'cil-indent-increase' },
    children: [
      {
        name: 'Paises',
        url: '/setting/countries',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Horario',
        url: '/setting/schedules',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Sexo',
        url: '/setting/sex',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Tipo Documento',
        url: '/setting/document-type',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Departamentos',
        url: '/setting/departments',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Tramites',
        url: '/setting/formalities',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Reportes',
    title: true
  },
  {
    name: 'Reportes',
    url: '/report',
    iconComponent: { name: 'cil-chart' },
    children: [
      {
        name: 'Reporte por Actuación',
        url: '/report/performance',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Reporte por Escritorios',
        url: '/report/desktop',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Auditoria',
    title: true
  },
  {
    name: 'Bitacora',
    url: '/dashboard',
    iconComponent: { name: 'cil-lock-locked' },
    children: [
      {
        name: 'Logs',
        url: '/dashboard',
        icon: 'nav-icon-bullet'
      }
    ]
  },
];
