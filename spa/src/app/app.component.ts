import { Component } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
// *ngIf="(authStateService.authState$ | async)?.isAuthenticated" 
     
@Component({
  selector: 'app-root',
  template: `
    <h1>
      Welcome to {{title}}!
    </h1>
    <nav>
     <a id="profile-button" class="item" 
     routerLink="/profile">Profile</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'spa';
  
  constructor(public authStateService: OktaAuthStateService, private oktaAuth: OktaAuth) {

  }
  
  async login() {
    await this.oktaAuth.signInWithRedirect({ originalUri: '/' });
  }

  async logout() {
    await this.oktaAuth.signOut();
  }
}
