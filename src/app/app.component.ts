import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';

import { ApiService } from 'src/app/@core/services/apicore/apis.service';
import { BadgeModule } from '@coreui/angular';



@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  standalone: true,
  imports: [
    RouterOutlet,
    NgxDatatableModule,
    HttpClientModule,
    NgxSelectModule,
    BadgeModule
  ],
  providers: [
    ApiService  // Aquí se declara el proveedor del servicio _ApiService
  ]
})
export class AppComponent implements OnInit {
  title = 'Sistema de Registro';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService
  ) {
    this.titleService.setTitle(this.title);
    // iconSet singleton
    this.iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
