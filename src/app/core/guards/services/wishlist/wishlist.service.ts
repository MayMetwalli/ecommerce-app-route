import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IWishlist } from '../../../../shared/interfaces/iwishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor( private httpClient:HttpClient) { }

  myToken:any = localStorage.getItem('userToken');

  // private cartItemCount = new BehaviorSubject<number>(0);
  // cartItemCount$ = this.cartItemCount.asObservable();



  addProductToWishlist(id:string):Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist', 
      { //body
        "productId" : id 
      },
      { //headers
        headers:{
          token: this.myToken 
        }

      }
    )
  }

  getLoggedUserWishlist():Observable<IWishlist>{
    return this.httpClient.get<IWishlist>('https://ecommerce.routemisr.com/api/v1/wishlist',
      {
        headers:{
          token: this.myToken
        }
      }
    )
  }

  removeProductFromWishlist(id:string):Observable<any>{
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        headers:{
          token: this.myToken
        }
      }
    )
  }

}
