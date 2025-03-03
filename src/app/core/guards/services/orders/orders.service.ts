import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iorders } from '../../../../shared/interfaces/iorders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  myToken:any = localStorage.getItem('userToken');


  constructor(private httpClient:HttpClient) { };


  checkoutPayment(id:string, data:object):Observable<any>{
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
     { "shippingAddress": data
        },
        {
          headers: 
          {token : this.myToken}
        }
    )
  }

  getAllOrders(id: string): Observable<any> {
    return this.httpClient.get<Iorders[]>(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`, {
      headers: { token: this.myToken }, 
    })

}

}
