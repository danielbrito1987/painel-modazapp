import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { PedidosRoutingModule, routedComponents } from './pedidos-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { ModalsComponent } from '../ui-features/modals/modals.component';
import { ModalComponent } from './modal/modal.component';

const components = [ModalsComponent, ModalComponent]

@NgModule({
  imports: [
    ThemeModule,
    PedidosRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    ...components,
  ],
  entryComponents: [
    ModalComponent,
  ],
  providers: [
    SmartTableService,
  ],
})
export class PedidosModule { }
