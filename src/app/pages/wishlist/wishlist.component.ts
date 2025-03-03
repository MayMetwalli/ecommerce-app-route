import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/guards/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';
import { Datum, IWishlist } from '../../shared/interfaces/iwishlist';
import { CartService } from '../../core/guards/services/cart/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{

  private readonly wishlistService = inject(WishlistService);

  private readonly toastrService = inject(ToastrService);
 
  private readonly cartService = inject(CartService);

  //  wishlistDetails:IWishlist[]=[];
  wishlistDetails: Datum[] = [];


 
  ngOnInit(): void {
    this.getWishlistData();

    // this.wishlistService.getLoggedUserWishlist().subscribe({
    //   next: (res) => {
    //     console.log(res, "wishlist");
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })

    
  }

  getWishlistData():void{
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        console.log("DATA", res.data);
        this.wishlistDetails = res.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

removeItem(id: string): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to remove this item from your wishlist.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, remove it!',
  }).then((result) => {
    if (result.isConfirmed) {
      this.wishlistService.removeProductFromWishlist(id).subscribe({
        next: (res) => {
          Swal.fire('Removed!', 'The item has been removed from your wishlist.', 'success');
          this.wishlistDetails = this.wishlistDetails.filter(item => item._id !== id);
        },
        error: (err) => {
          console.log(err);
          Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
        },
      });
    }
  });
}



  addToCart(id:string): void{
    this.cartService.addProductToCart(id).subscribe(
      {
        next:(res)=>{
          console.log(res); //show alert
          if(res.status === 'success'){
            this.toastrService.success(res.message)
          }
        },
        error:(err)=>{
          console.log(err)
        }
      }
    );
  } 


  
}
