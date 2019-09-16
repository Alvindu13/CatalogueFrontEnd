import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public host: string = 'http://localhost:8087';

  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  getAllCategories() {
    return this.http.get(this.host + '/categories');
  }

  getResources(url) {
    return this.http.get(url);
  }

  deleteResources(url) {
    const header = new HttpHeaders({'Authorization': 'Bearer ' + this.authService.jwt})
    return this.http.delete(url, {headers: header});
  }


  postResources(url, data) {
    const header = new HttpHeaders({'Authorization': 'Bearer ' + this.authService.jwt})
    return this.http.post(url, data, {headers: header});
  }

  putResources(url, data) {
    const header = new HttpHeaders({'Authorization': 'Bearer ' + this.authService.jwt})
    return this.http.put(url, data, {headers: header});
  }

  patchResources(url, data) {
    const header = new HttpHeaders({'Authorization': 'Bearer ' + this.authService.jwt})
    return this.http.patch(url, data, {headers: header});
  }

  uploadPhotoProduct(file: File, idProduct): Observable<HttpEvent<{}>> {

    let formdata : FormData = new FormData();


    formdata.append('file', file);

    const req = new HttpRequest('POST', this.host+'/uploadPhoto/' +idProduct, formdata, {
      reportProgress:true,
      responseType: 'text',
      headers:new HttpHeaders({'Authorization': 'Bearer ' + this.authService.jwt})
    });

    return this.http.request(req);
  }
}

