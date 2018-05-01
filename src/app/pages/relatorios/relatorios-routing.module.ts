import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatoriosComponent } from './relatorios.component';
import { CarteiraClientesComponent } from './carteira-clientes/carteira-clientes.component';
import { VendaSemanalComponent } from './venda-semanal/venda-semanal.component';
// import { EchartsComponent } from './echarts/echarts.component';
// import { D3Component } from './d3/d3.component';
// import { ChartjsComponent } from './chartjs/chartjs.component';

const routes: Routes = [{
  path: '',
  component: RelatoriosComponent,
  children: [{
    path: 'carteira-clientes',
    component: CarteiraClientesComponent,
  }, {
    path: 'venda-semanal',
    component: VendaSemanalComponent
  }]
//   children: [{
//     path: 'echarts',
//     component: EchartsComponent,
//   }, {
//     path: 'd3',
//     component: D3Component,
//   }, {
//     path: 'chartjs',
//     component: ChartjsComponent,
//   }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatoriosRoutingModule { }

export const routedComponents = [
  RelatoriosComponent,
  CarteiraClientesComponent,
  VendaSemanalComponent,
//   EchartsComponent,
//   D3Component,
//   ChartjsComponent,
];
