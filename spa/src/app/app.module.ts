import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { OKTA_CONFIG, OktaAuthModule, OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { OktaAuthOptions } from '@okta/okta-auth-js';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from 'src/environments/environment';

import config from './app.config';
import { OktaAuth } from '@okta/okta-auth-js';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ OktaAuthGuard ],
  },
  // {
  //   path: 'messages',
  //   component: MessagesComponent,
  //   canActivate: [ OktaAuthGuard ],
  // },

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    OktaAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { 
      provide: OKTA_CONFIG, 
      useFactory: () => {
        const oktaAuth = new OktaAuth(config.oidc);
        return { oktaAuth };
      } 
    },
    { provide: APP_BASE_HREF, useValue: environment.appBaseHref },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
