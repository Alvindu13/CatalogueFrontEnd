import {Component, OnInit} from '@angular/core';
import {CatalogueService} from '../catalogue.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  products;
  private editPhoto: boolean;
  private currentProduct: any;
  private selectedFiles: any;
  private progress: number;
  private currentFileUpload: any;

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

  onEditPhoto(p) {
    this.currentProduct = p;
    this.editPhoto=true;
  }

  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadPhoto() {

    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.catalogueService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id)
      .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100*event.loaded / event.total);
        } else if (event instanceof  HttpResponse) {

        }
    });
  }
}
