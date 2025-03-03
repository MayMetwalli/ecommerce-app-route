import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
//Api logic ---> HttpClient ---> Injection
  constructor(private httpClient:HttpClient) { };

  baseUrl:string = 'https://ecommerce.routemisr.com';


  getAllProducts():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/api/v1/products`)
  }

  getSpecificProducts(id:string | null):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/api/v1/products/${id}`)
  }
}
