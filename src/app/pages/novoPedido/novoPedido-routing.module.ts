import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovoPedidoComponent } from './novoPedido.component';

const routes: Routes = [{
    path: '',
    component: NovoPedidoComponent,
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NovoPedidoRoutingModule { }

export const routedComponents = [
    NovoPedidoComponent
]