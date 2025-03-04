import { Iorders } from './../../shared/interfaces/iorders';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { OrdersService } from '../../core/guards/services/orders/orders.service';
import { CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent  {
   ordersService = inject(OrdersService);
   _PLATFORM_ID = inject(PLATFORM_ID);

   allOrders! :Iorders [];
  
  
  
  ngOnInit(): void {
      this.getAllOrders()
    }

    getAllOrders():void{
      if(isPlatformBrowser(this._PLATFORM_ID)){

        const userID = localStorage.getItem('userID') as string;
        this.ordersService.getAllOrders(userID).subscribe({
        next:(res)=>{
            console.log(res);
            this.allOrders = res
          },
          error:(err)=>{
            console.log(err)
          }
        })
      }
    }


  

}
