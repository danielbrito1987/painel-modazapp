import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'ngx-modal',
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <img src="{{ content }}" style="max-width: 100%;" />
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" (click)="rejeitarComprovante(idComprovante)">Rejeitar</button>
      <a href="{{ content }}" download class="btn btn-secondary">Download</a>
      <button class="btn btn-md btn-primary" (click)="closeModal()">Fechar</button>
    </div>
  `,
})
export class ModalComponent {

  modalHeader: string;

  constructor(private activeModal: NgbActiveModal, private http: HttpClient, private router: Router) { }

  rejeitarComprovante(idComprovante){
    var dados = { 'IdComprovante': idComprovante };
    this.http.post('https://api.modazapp.online/api/PedidosLoja/RejeitarComprovante', idComprovante).subscribe(data =>{
    //this.http.get('http://localhost:65417/api/PedidosLoja/RejeitarComprovante?id=' + idComprovante).subscribe(data =>{            
        swal({
            title: 'Sucesso',
            text: 'Comprovante Rejeitado!',
            type: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK'
        }).then((result) => {
            this.closeModal();
            this.router.navigate(['/pedidos']);
        })                
    }, (error) => {
        swal({
            title: 'Erro',
            text: error.message,
            type: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK'
        })
    });
  }

  closeModal() {
    this.activeModal.close();
  }
}
