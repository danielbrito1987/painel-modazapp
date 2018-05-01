/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbAuthModule, NbEmailPassAuthProvider } from '@nebular/auth';
import { NB_AUTH_TOKEN_CLASS, NbAuthJWTToken } from '@nebular/auth';
import { AuthGuard } from './auth-guard.service';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ToasterModule,
    
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),

    NbAuthModule.forRoot({
      providers: {
        email:{
          service: NbEmailPassAuthProvider,          
          config: {
            //baseEndpoint: 'http://localhost:65417/api',
            baseEndpoint: 'https://api2.modazapp.online/api',
            token: {
              key: 'token',
            },
            login: {
              endpoint: '/Token/Get',
              method: 'POST',
              redirect: {
                success: '/pages/dashboard',
                failure: null,
              }
            },
            logout:{
              endpoint: '',
              redirect:{
                success: '/auth/login',
                failure: null,
              },
            },
            requestPass:{
              endpoint: '/Usuarios/RequestPassword',
              method: 'POST',
              redirect:{
                success: '/auth/login',
                failure: null,
              },
            },
            resetPass:{
              endpoint: '',
              redirect:{
                success: '/auth/login',
                failure: null,
              },
            },
          },
        },
      },
      forms:{
        login:{
          redirectDelay: 0,
          showMessages:{
            success: false,
          }
        },
      }
    })
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: NB_AUTH_TOKEN_CLASS, useValue: NbAuthJWTToken },
    AuthGuard
  ],
})
export class AppModule {
}
