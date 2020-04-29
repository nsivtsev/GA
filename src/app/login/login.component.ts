import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  login = '';
  password = '';

  constructor(private authService: AuthService) {

  }

  Login() {
    this.authService.login(this.login, this.password)
  }

  ngOnInit() { }
}
