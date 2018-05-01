import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

declare const echarts: any;

@Component({
  selector: 'ngx-pedidos-abertos',
  styleUrls: ['./pedidos-abertos.component.scss'],
  template: `
    <nb-card size="xsmall" class="pedidos-card">
      <nb-card-header>Pedidos Abertos</nb-card-header>
      <nb-card-body>
        <div echarts [options]="option" class="echart">
        </div>
        <div class="info">
          <div class="value">{{ qtdPedAbertos }} pedidos</div>
        </div>
      </nb-card-body>
      <nb-card-footer>
      <a href="#/pages/pedidos?st=Aberto">Ver Pedidos</a>
      </nb-card-footer>
    </nb-card>
  `,
})
export class PedidosAbertosComponent implements AfterViewInit, OnDestroy {

  private value = 0;
  pedidos: any;
  qtdPedAbertos: any;  
  itemsPedAberto: any;

  @Input('chartValue')
  set chartValue(value: number) {
    this.value = value;
    if (this.option.series) {
      this.option.series[0].data[0].value = value;
      this.option.series[0].data[1].value = 100 - value;
      this.option.series[1].data[0].value = value;
    }
  }

  option: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService, private http: HttpClient, private router: Router) {
    
  }

  ngOnInit(){
    this.qtdPedidosAbertos();
  }

  ngAfterViewInit() {    
    this.themeSubscription = this.theme.getJsTheme().delay(1).subscribe(config => {

      const solarTheme: any = config.variables.solar;

      this.option = Object.assign({}, {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        series: [
          {
            name: ' ',
            clockWise: true,
            hoverAnimation: false,
            type: 'pie',
            center: ['45%', '50%'],
            radius: solarTheme.radius,
            data: [
              {
                value: this.value,
                name: ' ',
                label: {
                  normal: {
                    position: 'center',
                    formatter: '{d}%',
                    textStyle: {
                      fontSize: '22',
                      fontFamily: config.variables.fontSecondary,
                      fontWeight: '600',
                      color: config.variables.fgHeading,
                    },
                  },
                },
                tooltip: {
                  show: false,
                },
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: solarTheme.gradientLeft,
                      },
                      {
                        offset: 1,
                        color: solarTheme.gradientRight,
                      },
                    ]),
                    shadowColor: solarTheme.shadowColor,
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 3,
                  },
                },
                hoverAnimation: false,
              },
              {
                value: 100 - this.value,
                name: ' ',
                tooltip: {
                  show: false,
                },
                label: {
                  normal: {
                    position: 'inner',
                  },
                },
                itemStyle: {
                  normal: {
                    color: config.variables.layoutBg,
                  },
                },
              },
            ],
          },
          {
            name: ' ',
            clockWise: true,
            hoverAnimation: false,
            type: 'pie',
            center: ['45%', '50%'],
            radius: solarTheme.radius,
            data: [
              {
                value: this.value,
                name: ' ',
                label: {
                  normal: {
                    position: 'inner',
                    show: false,
                  },
                },
                tooltip: {
                  show: false,
                },
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: solarTheme.gradientLeft,
                      },
                      {
                        offset: 1,
                        color: solarTheme.gradientRight,
                      },
                    ]),
                    shadowColor: solarTheme.shadowColor,
                    shadowBlur: 7,
                  },
                },
                hoverAnimation: false,
              },
              {
                value: 28,
                name: ' ',
                tooltip: {
                  show: false,
                },
                label: {
                  normal: {
                    position: 'inner',
                  },
                },
                itemStyle: {
                  normal: {
                    color: 'none',
                  },
                },
              },
            ],
          },
        ],
      });
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  qtdPedidosAbertos(): any{
    //this.http.get('http://localhost:65417/api/PedidosLoja/GetPedidosAberto?id=' + localStorage.getItem('IdLoja')).subscribe(data =>{
    this.http.get('https://api.modazapp.online/api/PedidosLoja/GetPedidosAberto?id=' + localStorage.getItem('IdLoja')).subscribe(data =>{
        this.itemsPedAberto = data;
        
        if(this.itemsPedAberto.length > 0)
            this.qtdPedAbertos = this.itemsPedAberto.length;
        else
            this.qtdPedAbertos = 0;
    });
  }

  goPedidosAbertos(){
    this.router.navigate(['/pedidos']);
  }
}