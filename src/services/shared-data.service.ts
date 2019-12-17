import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseurl2, baseurl, bureaUrl } from './config';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  products: string[] = ['mango', 'ice'];
  constructor(
    private http: HttpClient
  ) { }

  addProduct(data) {
    return this.http.post(bureaUrl + 'saveClientProduct', data);
  }

  getProduct() {
    return this.http.post(bureaUrl + 'getClientProducts', '');
  }

}
