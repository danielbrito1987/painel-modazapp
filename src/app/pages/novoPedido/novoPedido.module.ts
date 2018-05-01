import { NgModule } from '@angular/core';
import { FormsModule } from '../forms/forms.module';
import { ThemeModule } from '../../@theme/theme.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { NovoPedidoRoutingModule, routedComponents } from './novoPedido-routing.module';

@NgModule({
    imports:[
        ThemeModule,
        NovoPedidoRoutingModule,
        FormsModule,
        CKEditorModule,
    ],
    declarations:[
        ...routedComponents,
    ],
    providers: [],
})
export class NovoPedidoModule { }