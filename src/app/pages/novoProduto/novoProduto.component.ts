import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Produto } from '../../model/produto';
import { FormGroup, FormControl } from '@angular/forms';
import { EditorsComponent } from '../editors/editors.component';
import { CKEditorComponent } from '../editors/ckeditor/ckeditor.component';
import swal from 'sweetalert2';

@Component({
    selector: 'ngx-form-layouts',
    styleUrls: ['./novoProduto.component.scss'],
    templateUrl: './novoProduto.component.html'
})
export class NovoProdutoComponent{
    private id: number;
    private idLoja: any;
    items: any;
    form: FormGroup;
    ckEditorContent: string = '';

    public model = new Produto(0, '', '', 0, '', 0, 0, 0, 0, 0, 0, 0, '', new Date(), '', 0, '', '', '');

    constructor(private http: HttpClient, private route: Router, private activeRoute: ActivatedRoute) { }

    ngOnInit() {
        this.id = this.activeRoute.snapshot.params['id'];
        this.idLoja = localStorage.getItem('IdLoja');
        this.getItem();        
    }

    getItem(){
        this.http.get('https://api.modazapp.online/api/Produto/GetProdutoId?id=' + this.id)
        //this.http.get('http://localhost:65417/api/Produto/GetProdutoId?id=' + this.id)
                        .map(res => res)
                        .subscribe(data => {
                            this.items = data;
                            this.model.Descricao = this.items[0].Descricao;
                            this.model.DescricaoCompleta = this.items[0].DescricaoCompleta;
                            this.ckEditorContent = this.items[0].DescricaoCompleta;
                            this.model.Valor = this.items[0].Valor;
                            this.model.ValorAtacado = this.items[0].ValorAtacado;
                            this.model.EstoqueP = this.items[0].EstoqueP;
                            this.model.EstoqueM = this.items[0].EstoqueM;
                            this.model.EstoqueG = this.items[0].EstoqueG;
                            this.model.EstoqueGG = this.items[0].EstoqueGG;
                            this.model.EstoqueXG = this.items[0].EstoqueXG;
                            this.model.EstoqueXGG = this.items[0].EstoqueXGG;
                            this.model.Tamanhos = this.items[0].Tamanhos;
                            this.model.Slide1 = this.items[0].Imagem;
                            this.model.Slide2 = this.items[0].Slide2;
                            this.model.Slide3 = this.items[0].Slide3;
        });
    }

    salvarProduto(descricao: string, qtdP: string, qtdM: string, qtdG: string, qtdGG: string, qtdXG: string, qtdXGG: string, valor: string, valorAtacado: string): void {
        var dados = { 'IdLoja': this.idLoja, 'IdProduto': this.id, 'Descricao': descricao, 'DescricaoCompleta': this.ckEditorContent, 'EstoqueP': qtdP, 'EstoqueM': qtdM, 'EstoqueG': qtdG, 'EstoqueGG': qtdGG, 'EstoqueXG': qtdXG, 'EstoqueXGG': qtdXGG, 'Valor': valor, 'ValorAtacado': valorAtacado };
        //console.log(JSON.stringify(dados));
        //this.http.post('http://localhost:65417/api/Produto/AtualizaProduto/', dados)
        this.http.post('https://api.modazapp.online/api/Produto/AtualizaProduto/', dados)
                    .subscribe(data => {
                        console.log(data);
                        this.items = data;
                        swal({
                            title: 'Sucesso',
                            text: 'Produto alterado com sucesso!',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'OK'
                        }).then((result) => {
                            this.route.navigate(['./pages/produtos']);
                        })
                    },
                    (err: HttpErrorResponse) => {
                        console.log('err');
                        console.dir(err);
                        swal('Erro', 'Erro ao alterar o produto.', 'error');
                    });
    }

    numberToReal(numero: any): any{
        numero = numero.toFixed(2).split('.');
        numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
        return numero.join('.');
    }
}