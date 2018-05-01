import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Pedido } from '../../model/pedido';
import { FormGroup, FormControl } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import swal from 'sweetalert2';

@Component({
    selector: 'ngx-form-layouts',
    styleUrls: ['./novoPedido.component.scss'],
    templateUrl: './novoPedido.component.html'
})
export class NovoPedidoComponent{
    private id: number;
    private idLoja: any;
    status: any;
    items: any;
    itemPedido: any;
    form: FormGroup;
    pedidos: any;
    totalPedido: any = 0;
    
    public model = new Pedido(0, '', '', '', 0, '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, new Date(), '', '');

    constructor(private http: HttpClient, private route: Router, private activeRoute: ActivatedRoute) { 
        //this.id = this.activeRoute.snapshot.params['id'];
    }

    ngOnInit(){
        this.id = this.activeRoute.snapshot.params['id'];
        this.getItem();
    }

    getItem(){        
        var dados = { 'IdLoja': localStorage.getItem('IdLoja'), 'CodPedido': this.id };

        this.http.get('https://api.modazapp.online/api/Pedidos/GetPedidoPeloId?id=' + JSON.stringify(dados))
        //this.http.get('http://localhost:65417/api/Pedidos/GetPedidoPeloId?id=' + JSON.stringify(dados))
                        .subscribe(data => {
                            this.items = data;
                            this.model.CodPedido = this.items[0].CodPedido;
                            this.model.DataRegistro = this.items[0].DataRegistro;                                                        
                            this.model.Status = this.items[0].Status;
                            this.model.NomeCliente = this.items[0].NomeCliente;
                            this.model.Endereco = this.items[0].Endereco;
                            this.model.Contato = this.items[0].Contato;
                            this.model.Email = this.items[0].Email;
                            this.status = this.items[0].Status;
                            this.getItemPedido();
        });
    }

    getItemPedido(){
        var dados = { 'IdLoja': localStorage.getItem('IdLoja'), 'CodPedido': this.id };

        //this.http.get('http://localhost:65417/api/Pedidos/GetItemPedido?id=' + JSON.stringify(dados))
        this.http.get('https://api.modazapp.online/api/Pedidos/GetItemPedido?id=' + JSON.stringify(dados))
                        .subscribe(data => {
                            this.itemPedido = data;
                            this.totalPedido = this.valorTotal();
                        });
    }

    valorTotal(): any{
        var total = 0;
        this.pedidos = <any[]>this.itemPedido;

        if(this.pedidos){
            this.pedidos.forEach(element => {
                total += element.ValorTotal;
            });
        }
        else{
            total = 0;
        }

        return total;
    }

    salvarPedido(codPedido: string, status: string): void{        
        var dados = { 'IdLoja': localStorage.getItem('IdLoja'), 'CodPedido': codPedido, 'Status': status };
        
        //this.http.get('http://localhost:65417/api/Pedidos/AlterarPedido?id=' + JSON.stringify(dados))
        this.http.get('https://api.modazapp.online/api/Pedidos/AlterarPedido?id=' + JSON.stringify(dados))
                    .subscribe(data => {
                        console.log(data);
                        swal('Sucesso', 'Pedido alterado com sucesso!', 'success');
                        this.items = data;
                    },
                    (err: HttpErrorResponse) => {
                        console.log('err');
                        console.dir(err);
                        swal('Erro', 'Erro ao alterar o pedido.', 'error');
                    });
    }

    selectStatus(valor){
        this.status = valor;
    }

    numberToReal(numero: any): any{
        numero = numero.toFixed(2).split('.');
        numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
        return numero.join(',');
    }
}