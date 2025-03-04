import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/guards/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  private readonly cartService = inject(CartService);

  private readonly toastrService = inject(ToastrService);

  cartDetails:ICart = {} as ICart; //initial empty value
  prod: any;
  //property hata5od men interface -> lazem yeltazem belshakl bta3 interface -> as ICart
  //alias value
 
  ngOnInit(): void {
    this.getCartData();
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log('Cart Items:', res.numOfCartItems);
        this.cartService.setCartCount(res.numOfCartItems); // Use the method to update count
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getCartData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails = res.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  removeItem(id:string):void{
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to remove this item from your cart.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeSpecificCartItem(id).subscribe({
          next: (res) => {
            this.cartDetails = res.data;
            Swal.fire('Removed!', 'The item has been removed from your cart.', 'success');
          },
          error: (err) => {
            console.log(err);
            Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
          },
        });
      }
    });
  }

  updateCount(id:string, count:number):void{
    this.cartService.updateProductQuantity(id, count).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails = res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  clearItems(): void {
    Swal.fire({
      title: 'Clear Cart?',
      text: 'Are you sure you want to clear all items from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, clear it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearCart().subscribe({
          next: (res) => {
            console.log(res)
            if (res.message === 'success') {
              this.cartDetails = {} as ICart;
              Swal.fire('Cleared!', 'Your cart has been emptied.', 'success');
            }
          },
          error: (err) => {
            console.log(err);
            Swal.fire('Error!', 'Could not clear your cart. Try again.', 'error');
          },
        });
      }
    });
  }

  
}
