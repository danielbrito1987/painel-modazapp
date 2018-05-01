import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  percentualAbertos: number = 0;
  percentualAguardando: number = 0;
  percentualRejeitados: number = 0;
  percentualConcluidos: number = 0;
  idLoja: any;

  constructor(private http: HttpClient, private route: Router){ 
    this.idLoja = localStorage.getItem('IdLoja');
  }

  ngOnInit(){
    this.percentual();
    this.percentualConc();
    this.percentualAguardandoPgto();
    this.percentualRejeitado();
  }
  
  percentual(){
    // this.http.get('http://localhost:65417/api/PedidosLoja/PercentualAberto?id=' + localStorage.getItem("IdLoja")).subscribe(data =>{
    this.http.get('https://api.modazapp.online/api/PedidosLoja/PercentualAberto?id=' + localStorage.getItem("IdLoja")).subscribe(data =>{
        this.percentualAbertos = parseFloat(data.toString());
    });
  }

  percentualConc(){
    // this.http.get('http://localhost:65417/api/PedidosLoja/GetPercentualPedidosConcluidos?id=' + localStorage.getItem("IdLoja")).subscribe(data =>{
    this.http.get('https://api.modazapp.online/api/PedidosLoja/PercentualConcluidos?id=' + localStorage.getItem("IdLoja")).subscribe(data =>{
        this.percentualConcluidos = parseFloat(data.toString());
    });
  }

  percentualAguardandoPgto(){
    //this.http.get('http://localhost:65417/api/PedidosLoja/GetPercentualAguardando?id=' + localStorage.getItem("IdLoja")).subscribe(data =>{
    this.http.get('https://api.modazapp.online/api/PedidosLoja/PercentualAguardando?id=' + localStorage.getItem("IdLoja")).subscribe(data =>{
        this.percentualAguardando = parseFloat(data.toString());
    });
  }

  percentualRejeitado(){
    // this.http.get('http://localhost:65417/api/PedidosLoja/GetPercentualPedidosRejeitados?id=' + localStorage.getItem("IdLoja")).subscribe(data =>{
    this.http.get('https://api.modazapp.online/api/PedidosLoja/PercentualRejeitados?id=' + localStorage.getItem("IdLoja")).subscribe(data =>{
        this.percentualRejeitados = parseFloat(data.toString());
    });
  }
}