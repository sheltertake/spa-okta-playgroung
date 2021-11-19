import { Component, OnInit } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';

interface Claim {
  claim: string;
  value: string;
}

@Component({
  selector: 'app-profile',
  template: `
  <h1 class="ui header">
  <i aria-hidden="true" class="drivers license outline icon"></i> My User Profile (ID Token Claims)
</h1>
<p>
  Below is the information from your ID Token which was obtained during the
  <a href="https://developer.okta.com/docs/guides/implement-auth-code-pkce">PKCE Flow</a>
  and is now stored in local storage.
</p>
<p>
  This route is protected with the <code>OktaAuthGuard</code> component, which will ensure that this page cannot be accessed until you have authenticated.
</p>
<table class="ui table">
  <thead>
    <tr>
      <th>Claim</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let claim of claims">
      <td>{{claim.claim}}</td>
      <td id="claim-{{claim.claim}}">{{claim.value}}</td>
    </tr>
  </tbody>
</table>
  `,
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  claims: Claim[] = [];

  constructor(public oktaAuth: OktaAuth) {

  }

  async ngOnInit() {
    const userClaims = await this.oktaAuth.getUser();
    this.claims = Object.entries(userClaims).map(entry => ({ claim: entry[0], value: entry[1] }));
  }

}
