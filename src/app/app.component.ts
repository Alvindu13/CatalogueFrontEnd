import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {CatalogueService} from './catalogue.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cat';

   constructor(private authService: AuthenticationService,
               private catalogueService: CatalogueService) {}

  ngOnInit(): void {
     this.authService.loadToken();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isUser() {
    return this.authService.isUser();
  }

  isAuthenticated() {
     return this.authService.isAuthenticated();
     console.log(this.authService.isAuthenticated());
  }


  logout() {
    this.authService.logout();
  }

}
