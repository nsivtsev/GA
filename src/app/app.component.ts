import { Component } from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private authService: AuthService) {
  }

  public get logIn(): boolean {
    return (localStorage.getItem('auth_token') !== null);
  }
}
