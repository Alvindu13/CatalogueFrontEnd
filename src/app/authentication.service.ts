import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  host2: string = 'http://localhost:8080';
  jwt: string;
  username: string;
  roles: Array<string>;
  authenticated: boolean;

  constructor(private http: HttpClient) {}

  login(data) {
    return this.http.post(this.host2 + '/login', data, {observe : 'response'});
  }


  saveToken(jwt: string) {
    localStorage.setItem('token', jwt);
    this.jwt = jwt;
    this.loadUserIdentity();
  }

  // JwtParse/decode
  private loadUserIdentity() {
    const jwtHelper = new JwtHelperService();
    const objJWT = jwtHelper.decodeToken(this.jwt);
    this.username = objJWT.obj;
    this.roles = objJWT.roles;
  }

  isAdmin() {
    return this.roles.indexOf('ADMIN') >= 0;
  }

  isUser() {
    return this.roles.indexOf('USER') >= 0;
  }

  isAuthenticated() {
    return this.roles && (this.isAdmin() || this.isUser());
  }

  loadToken() {
    this.jwt = localStorage.getItem('token');
    this.loadUserIdentity();
  }

  logout() {
    localStorage.removeItem('token');
    this.initParams();
  }

  initParams() {
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined;
  }
}