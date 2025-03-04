import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/guards/services/orders/orders.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly ordersService = inject(OrdersService)


  isLoading:boolean = false;
  cartId: string = " ";

  checkoutForm! : FormGroup; //global


  ngOnInit(): void {
    this.checkoutForm = new FormGroup({
      details: new FormControl(null, [Validators.required ] ),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)] ),
      city: new FormControl(null, [Validators.required ] )
    })

    this.getCartId()
  }

    submitCheckout():void {
      console.log(this.checkoutForm.value);
      this.ordersService.checkoutPayment(this.cartId, this.checkoutForm.value).subscribe({
        next:(res)=>{
          console.log(res);
         if(res.status === 'success'){
          open(res.session.url , '_self')
         }
        },
        error:(err) =>{
          console.log(err)
        }
      })
      if(this.checkoutForm.valid){
        this.isLoading = true;
      }else {
        this.checkoutForm.markAllAsTouched()
      }
    }

    getCartId():void{
      this.activatedRoute.paramMap.subscribe({
        next:(param)=>{
          this.cartId = param.get('id') !;
        }
      })
    }


}
