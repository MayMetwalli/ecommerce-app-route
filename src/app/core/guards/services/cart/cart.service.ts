import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private httpClient:HttpClient) { }

  myToken:any = localStorage.getItem('userToken');

  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();


  cartItemsCount = 0

  addProductToCart(id:string):Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/cart', 
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

  getLoggedUserCart():Observable<any>{
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/cart',
      {
        headers:{
          token: this.myToken
        }
      }
    )
  }

  removeSpecificCartItem(id:string):Observable<any>{
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        headers:{
          token: this.myToken
        }
      }
    )
  }

  updateProductQuantity(id:string, newCount:number):Observable<any>{
    return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        'count': newCount
      },
      {
        headers: {
          token: this.myToken
        }
      }
    )
  }

  clearCart():Observable<any>{
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
      {headers:{
        token:this.myToken
      }}
    )
  }


  setCartCount(count: number): void {
    this.cartItemCount.next(count); 
  }

  getCartCount(): number {
    return this.cartItemCount.getValue();
  }
}
