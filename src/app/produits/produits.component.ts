import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../catalogue.service';
import {ActivatedRoute, NavigationEnd, Route, Router} from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  products;

  constructor(private catalogueService: CatalogueService, private route: ActivatedRoute, private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = atob(route.snapshot.params.urlProds);
        this.getProducts(url);
      }
    });
  }

  ngOnInit() {
  }

  getProducts(url) {
  console.log(url);
    this.catalogueService.getResources(url)
      .subscribe(data => {
        console.log(data);
        this.products = data;
      }, err => {
        console.log(err);
      });
  }

}
