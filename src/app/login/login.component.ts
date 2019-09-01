import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(data) {
    this.authService.login(data)
      .subscribe(resp => {
        /* tslint:disable:no-string-literal */
        const jwt = resp.headers.get('Authorization');
        /* tslint:enable:no-string-literal */
        this.authService.saveToken(jwt);
        this.router.navigateByUrl('/');
      }, err => {
        console.log(err);
      });
  }


}
