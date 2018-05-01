import { NgModule } from '@angular/core';
import { FormsModule } from '../forms/forms.module';
import { ThemeModule } from '../../@theme/theme.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { NovoProdutoRoutingModule, routedComponents } from './novoProduto-routing.module';

@NgModule({
    imports:[
        ThemeModule,
        NovoProdutoRoutingModule,
        FormsModule,
        CKEditorModule,
    ],
    declarations:[
        ...routedComponents,
    ],
    providers: [],
})
export class NovoProdutoModule { }