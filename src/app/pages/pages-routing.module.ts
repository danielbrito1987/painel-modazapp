import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  }, {
    path: 'components',
    loadChildren: './components/components.module#ComponentsModule',
  }, {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsModule',
  }, {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
  }, {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  }, {
    path: 'produtos',
    loadChildren: './produtos/produtos.module#ProdutosModule',
  }, {
    path: 'pedidos',
    loadChildren: './pedidos/pedidos.module#PedidosModule',
  },{
    path: 'pedidos/:st',
    loadChildren: './pedidos/pedidos.module#PedidosModule',
  },{
    path: 'pedidos/:cod',
    loadChildren: './pedidos/pedidos.module#PedidosModule',
  },{
    path: 'pedidos/:nome',
    loadChildren: './pedidos/pedidos.module#PedidosModule',
  },{
    path: 'clientes',
    loadChildren: './clientes/clientes.module#ClientesModule',
  },{
    path: 'novoProduto',
    loadChildren: './novoProduto/novoProduto.module#NovoProdutoModule',
  },{
    path: 'novoProduto/:id',
    loadChildren: './novoProduto/novoProduto.module#NovoProdutoModule',
  },{
    path: 'novoPedido/:id',
    loadChildren: './novoPedido/novoPedido.module#NovoPedidoModule',
  },{
    path: 'relatorios',
    loadChildren: './relatorios/relatorios.module#RelatoriosModule',
  },
  {
    path: '',
    redirectTo: 'dashboard',
    //pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PagesRoutingModule {
}