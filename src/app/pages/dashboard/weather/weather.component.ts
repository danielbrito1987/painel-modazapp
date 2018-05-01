import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-weather',
  styleUrls: ['./weather.component.scss'],
  templateUrl: './weather.component.html',
})

export class WeatherComponent implements OnInit {
  cidade: any;
  uf: any;
  idCidade: any;
  dataDia: Date;
  temperatura: any;
  sensacao: any;
  ventos: any;
  umidade: any;
  icon: any;
  token: string = 'e24a19f5500ef59fd52afee122f44fc0 ';
  results: any;

  constructor(private http: HttpClient){
    this.obterCodCidade();
  }

  ngOnInit(){
    
  }

  obterCodCidade(){
    if(navigator){
      navigator.geolocation.getCurrentPosition(pos => {
        this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.coords.latitude + ',' + pos.coords.longitude).subscribe(data => {
          this.results = data;
          this.cidade = this.results.results[1].address_components[0].short_name;
          this.uf = this.results.results[1].address_components[1].short_name;

          this.http.get('http://apiadvisor.climatempo.com.br/api/v1/locale/city?name=' + this.cidade + '&state=' + this.uf + '&token=' + this.token).subscribe(data =>{
            this.idCidade = data[0].id;
            this.previsaoDoTempo();
          });
        })
      })
    }
  }

  previsaoDoTempo(){
    this.http.get('http://apiadvisor.climatempo.com.br/api/v1/weather/locale/' + this.idCidade + '/current?token=' + this.token).subscribe(data =>{
      console.log(data);
      this.dataDia = new Date(data["data"]["date"]);
      this.temperatura = data["data"]["temperature"];
      this.ventos = data["data"]["wind_velocity"];
      this.umidade = data["data"]["humidity"];
      this.sensacao = data["data"]["sensation"];
      this.icon = data["data"]["icon"];
    });
  }
}
