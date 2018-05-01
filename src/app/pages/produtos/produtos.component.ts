import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { SmartTableService } from '../../@core/data/smart-table.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './produtos.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }

    :host /deep/ .Descricao{
      min-width: 400px;
    }

    :host /deep/ .EstoqueP{
      min-width: 130px;
    }

    :host /deep/ .EstoqueM{
      min-width: 130px;
    }

    :host /deep/ .EstoqueG{
      min-width: 130px;
    }

    :host /deep/ .EstoqueGG{
      min-width: 140px;
    }

    :host /deep/ .EstoqueXG{
      min-width: 140px;
    }

    :host /deep/ .EstoqueXGG{
      min-width: 140px;
    }

    :host /deep/ .ValorAtacado{
      min-width: 160px;
    }
  `],
})
export class ProdutosComponent {
  produtos: any;

  settings = {
    mode: 'external',
    noDataMessage: 'Nenhum resgitro encontrado',
    actions: {
      columnTitle: 'Ações',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      IdProduto: {
        title: 'Cód.',
        type: 'number',  
      },
      Descricao: {
        title: 'Descrição',
        type: 'string',
      },
      EstoqueP: {
        title: 'Estoque P',
        type: 'string',
      },
      EstoqueM: {
        title: 'Estoque M',
        type: 'string',
      },
      EstoqueG: {
        title: 'Estoque G',
        type: 'string',
      },
      EstoqueGG: {
        title: 'Estoque GG',
        type: 'string',
      },
      EstoqueXG: {
        title: 'Estoque XG',
        type: 'string',
      },
      EstoqueXGG: {
        title: 'Estoque XGG',
        type: 'string',
      },
      Valor: {
        title: 'Valor',
        type: 'number',
      },
      ValorAtacado: {
        title: 'Valor Atacado',
        type: 'number',     
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService, private http: HttpClient, private router: Router) {
    // const data = this.service.getData();
    // this.source.load(data);
    this.getItems();
  }
  
  getItems(){
    this.http.get('https://api.modazapp.online/api/produto/ListarProdutos?id=' + localStorage.getItem('IdLoja')).subscribe(data =>{      
    //this.http.get('http://localhost:65417/api/produto/ListarProdutos?id=' + localStorage.getItem('IdLoja')).subscribe(data =>{
        this.produtos = data;
        this.source.load(this.produtos);
    });
  }

  openCreateDialog(event): void{
    this.router.navigate(['./pages/novoProduto']);
  }

  openEditDialog(event): void{
    this.router.navigate(['./pages/novoProduto/' + event.data.IdProduto]);
  }

  onDeleteConfirm(event): void {
    swal({
      title: 'Atenção',
      text: 'Deseja excluir o item selecionado?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if(result.value){
        // this.http.delete('http://localhost:65417/api/produto?id=' + idProduto).subscribe(data => {
        this.http.delete('https://api.modazapp.online/api/produto?id=' + event.data.IdProduto).subscribe(data => {
            this.getItems();
        });
      }
    })
  }
}
