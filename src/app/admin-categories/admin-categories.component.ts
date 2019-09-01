import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../catalogue.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  mode = 'list';
  categories;
  currentCategorie;

  constructor(private catalogueService: CatalogueService) { }

  ngOnInit() {
    this.onGetAllCategories();
  }

  onGetAllCategories() {
    this.catalogueService.getAllCategories()
      .subscribe(data => {
        this.categories = data;
      }, err => {
        console.log(err);
      });
  }

  onDeleteCat(cat) {
    const c = confirm(' êtes-vous sûre de voulour supprimer ? ')
    if (!c) { return; }
    this.catalogueService.deleteResources(cat._links.self.href)
      .subscribe(data => {
        this.onGetAllCategories();
      }, err => {
        console.log(err);
      });
  }

  onNewCat() {
    this.mode = 'new-cat';
  }

  onSaveCat(data) {
    const url = this.catalogueService.host + '/categories';
    this.catalogueService.postResources(url, data)
    // tslint:disable-next-line:no-shadowed-variable
      .subscribe(data => {
        this.mode = 'list';
        this.onGetAllCategories();
      }, err => {
        console.log(err);
      });
  }

  onEditCat(cat) {
    this.catalogueService.getResources(cat._links.self.href)
      .subscribe(data => {
        this.currentCategorie = data;
        this.mode = 'edit-cat';
      }, err => {
        console.log(err);
      });
  }

  onUpdateCat(data) {
    this.catalogueService.putResources(this.currentCategorie._links.self.href, data)
    // tslint:disable-next-line:no-shadowed-variable
      .subscribe(data => {
        this.mode = 'list';
        this.onGetAllCategories();
      }, err => {
        console.log(err);
      });
  }
}
