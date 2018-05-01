import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './modal/modal.component';

import swal from 'sweetalert2';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './pedidos.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }

    :host /deep/ .CodPedido{
      min-width: 150px;
    }

    :host /deep/ .Nome{
      min-width: 400px;
    }

    :host /deep/ .Email{
      min-width: 400px;
    }

    :host /deep/ .FormaPgto{
      min-width: 180px;
    }

    :host /deep/ .Status{
      min-width: 215px;
    }

    :host /deep/ .DataRegistro{
      min-width: 200px;
    }
  `],
})
export class PedidosComponent {
  pedidos: any;
  status: any;
  codPedido: any;
  nomeCliente: any;

  settings = {
    mode: 'external',
    noDataMessage: 'Nenhum resgitro encontrado',
    actions: {
      columnTitle: 'Ações',
      add: false,
    },    
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-compose"></i>',
    },
    columns: {
      CodPedido: {
        title: 'No. Pedido',
        type: 'string',  
      },
      Nome: {
        title: 'Nome Cliente',
        type: 'string',
      },
      Status: {
        title: 'Status',
        type: 'string',
      },
      Email: {
        title: 'E-mail',
        type: 'string',
      },
      DataRegistro: {
        title: 'Dt. Registro',
        type: 'string',
        valuePrepareFunction: (value) => { return new Date(value).toLocaleDateString('pt-BR') + " " + new Date(value).toLocaleTimeString('pt-BR') }
      },
      ValorTotal: {
        title: 'ValorTotal',
        type: 'string',
        valuePrepareFunction: (value) => { return parseFloat(value).toFixed(2) }
      },
      FormaPgto: {
        title: 'FormaPgto',
        type: 'string',
      },      
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private http: HttpClient, private router: Router, private modalService: NgbModal, private activeRoute: ActivatedRoute) {
    // const data = this.service.getData();
    // this.source.load(data);
    this.status = this.activeRoute.snapshot.queryParams['st'];
    this.codPedido = this.activeRoute.snapshot.queryParams['cod'];
    this.nomeCliente = this.activeRoute.snapshot.queryParams['nome'];
    
    if(this.status != null){
      if(this.status == 'Aberto'){
        this.getPedidosAbertos();
      }else if(this.status == 'Aguardando Pagamento'){
        this.getPedidosAguardando();      
      }else if(this.status == 'Concluido'){
        this.getPedidosConcluidos();
      }else if(this.status == 'Rejeitado'){
        this.getPedidosRejeitados();
      }
    } else if(this.codPedido != null){
      this.getPedidoPeloCodigo();
    } else if(this.nomeCliente != null){
      this.getPedidoPeloNome();
    }
    else{
      this.getItems();
    }    
  }

  ngOnInit(){    
    
  }
  
  getItems(){
    this.http.get('https://api.modazapp.online/api/pedidosloja/' + localStorage.getItem('IdLoja')).subscribe(data =>{      
    //this.http.get('http://localhost:65417/api/pedidosloja/' + localStorage.getItem('IdLoja')).subscribe(data =>{
        this.pedidos = data;
        this.source.load(this.pedidos);
    });
  }

  getPedidosAbertos(){
    //this.http.get('http://localhost:65417/api/PedidosLoja/GetPedidosAberto/' + JSON.stringify(dados)).subscribe(data =>{
    this.http.get('https://api.modazapp.online/api/PedidosLoja/GetPedidosAberto?id=' + localStorage.getItem('IdLoja')).subscribe(data =>{
      this.pedidos = data;
      this.source.load(this.pedidos);
    })
  }

  getPedidosAguardando(){
    //this.http.get('http://localhost:65417/api/PedidosLoja/GetPedidosAguardandoPgto/' + JSON.stringify(dados)).subscribe(data =>{
    this.http.get('https://api.modazapp.online/api/PedidosLoja/GetPedidosAguardandoPgto?id=' + localStorage.getItem('IdLoja')).subscribe(data =>{
      this.pedidos = data;
      this.source.load(this.pedidos);
    })
  }

  getPedidosConcluidos(){
    //this.http.get('http://localhost:65417/api/PedidosLoja/GetPedidosConcluidos/' + JSON.stringify(dados)).subscribe(data =>{
    this.http.get('https://api.modazapp.online/api/PedidosLoja/GetPedidosConcluidos?id=' + localStorage.getItem('IdLoja')).subscribe(data =>{
      this.pedidos = data;
      this.source.load(this.pedidos);
    })
  }

  getPedidosRejeitados(){
    //this.http.get('http://localhost:65417/api/PedidosLoja/GetPedidosRejeitados/' + JSON.stringify(dados)).subscribe(data =>{
    this.http.get('https://api.modazapp.online/api/PedidosLoja/GetPedidosRejeitados?id=' + localStorage.getItem('IdLoja')).subscribe(data =>{
      this.pedidos = data;
      this.source.load(this.pedidos);
    })
  }

  getPedidoPeloCodigo(){
    var dados = { 'CodPedido': this.codPedido, 'IdLoja': localStorage.getItem('IdLoja') };

    this.http.get('https://api.modazapp.online/api/PedidosLoja/GetPedidoPeloCodigo?id=' + JSON.stringify(dados)).subscribe(data => {      
    //this.http.get('http://localhost:65417/api/PedidosLoja/GetPedidoPeloCodigo?id=' + JSON.stringify(dados)).subscribe(data => {            
      this.pedidos = data;
      if(this.pedidos.length > 0){
        this.source.load(this.pedidos); 
      }else{
        swal('Atenção', 'Não foram encontrados registros para o filtro informado.', 'warning');
      }
    })
  }

  getPedidoPeloNome(){
    this.http.get('https://api.modazapp.online/api/PedidosLoja/GetPedidoPeloCliente?nome=' + this.nomeCliente + '&id=' + localStorage.getItem('IdLoja')).subscribe(data => {      
    //this.http.get('http://localhost:65417/api/PedidosLoja/GetPedidoPeloCliente?nome=' + this.nomeCliente + '&id=' + localStorage.getItem('IdLoja')).subscribe(data => {      
      this.pedidos = data;
      if(this.pedidos.length > 0){
        this.source.load(this.pedidos);
      }else{
        swal('Atenção', 'Não foram encontrados registros para o filtro informado.', 'warning');
      }
    })
  }

  openEditDialog(event): void{
    this.router.navigate(['./pages/novoPedido/' + event.data.CodPedido]);
  }

  onDeleteConfirm(event): void {
    if(event.data.IdComprovante != null){
      var dados = { 'IdComprovante': event.data.IdComprovante, 'IdLoja': localStorage.getItem('IdLoja') };
      this.http.get('https://api.modazapp.online/api/PedidosLoja/GetComprovantePedido?id=' + JSON.stringify(dados)).subscribe(data => {
      //this.http.get('http://localhost:65417/api/PedidosLoja/GetComprovantePedido?id=' + JSON.stringify(dados)).subscribe(data => {
        const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.idComprovante = event.data.IdComprovante;
        activeModal.componentInstance.content = data[0].Imagem;
        activeModal.componentInstance.modalHeader = 'Comprovante Pedido nº ' + data[0].CodPedido;
      });
    }else{
      swal('Atenção', 'Não foi enviado comprovante para este pedido.', 'warning');
    }
  }
}
