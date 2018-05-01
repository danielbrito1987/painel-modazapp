import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovoProdutoComponent } from './novoProduto.component';
import { EditorsComponent } from '../editors/editors.component';
import { CKEditorComponent } from '../editors/ckeditor/ckeditor.component';

const routes: Routes = [{
    path: '',
    component: NovoProdutoComponent,
    children: [{
        path: '../editors/ckeditor',
        component: CKEditorComponent,
    }]
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NovoProdutoRoutingModule{}

export const routedComponents = [
    NovoProdutoComponent,
    CKEditorComponent,
];