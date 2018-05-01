import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { SmartTableService } from '../../@core/data/smart-table.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './clientes.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }

    :host /deep/ .NomeUsuario{
      min-width: 400px;
    }

    :host /deep/ .Email{
      min-width: 400px;
    }

    :host /deep/ .Telefone{
      min-width: 180px;
    }
  `],
})
export class ClientesComponent {
  clientes: any;

  settings = {
    mode: 'external',
    noDataMessage: 'Nenhum resgitro encontrado',
    actions: {
      columnTitle: 'Ações',
      add: false,
      delete: false,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    columns: {
      IdUsuario: {
        title: 'Cód.',
        type: 'number',  
      },
      NomeUsuario: {
        title: 'Nome Cliente',
        type: 'string',
      },
      Telefone: {
        title: 'Tel. Contato',
        type: 'string',
      },
      Email: {
        title: 'E-mail',
        type: 'string',
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
    this.http.get('https://api.modazapp.online/api/usuarios/ListarUsuarios?id=' + localStorage.getItem('IdLoja')).subscribe(data =>{      
    //this.http.get('http://localhost:65417/api/usuarios/ListarUsuarios?id=' + localStorage.getItem('IdLoja')).subscribe(data =>{
        this.clientes = data;
        this.source.load(this.clientes);
    });
  }

  openEditDialog(event): void{
    alert('Editar');
    console.log(event);
  }
}
