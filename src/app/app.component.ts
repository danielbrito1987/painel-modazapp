/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  items: any;
  listaPedidos: any;

  constructor(private analytics: AnalyticsService, private http: HttpClient, private toasterService: ToasterService) {
    
  }

  config: ToasterConfig;

  position = 'toast-top-right';
  animationType = 'fade';
  title = 'Atenção!';
  content = `Você possui novos pedidos!`;
  timeout = 5000;
  toastsLimit = 5;
  type = 'default';

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;

  ngOnInit(): void {
    this.analytics.trackPageViews();
    //localStorage.clear();
    // this.getPedidos();

    // setInterval(() => {
    //   this.verificaPedidos();
    // }, 2000)
  }

  verificaPedidos(){
    if(localStorage.getItem('IdLoja') != null){
      this.http.get('https://api.modazapp.online/api/Pedidos/GetPedidosLoja?id=' + localStorage.getItem('IdLoja')).subscribe(data => {
        this.items = data;
        
        if(this.listaPedidos.length > 0){          
          if(this.items.length != this.listaPedidos.length)
          {
            this.makeToast();
            //console.log('Enviar Notificação!');
          }else{
            console.log('Não enviar notificação!');
            this.listaPedidos = data;
          }      
        }else{
          console.log('Não enviar notificação!');
          this.listaPedidos = data;
        }
      });
    }
  }

  getPedidos(){
    this.http.get('https://api.modazapp.online/api/Pedidos/GetPedidosLoja?id=' + localStorage.getItem('IdLoja')).subscribe(data => {
        this.listaPedidos = data;
    })
  }

  makeToast() {
    this.showToast(this.type, this.title, this.content);
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

}
