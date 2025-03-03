import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/guards/services/products/products.service';
import { CartService } from '../../core/guards/services/cart/cart.service';
import { WishlistService } from '../../core/guards/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/guards/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { SearchPipe } from "../../core/pipes/search.pipe";
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [SearchPipe, CurrencyPipe, RouterLink, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
    export class ProductsComponent implements OnInit {

    private readonly  productsService = inject(ProductsService);

    private readonly categoriesService = inject(CategoriesService);

    private readonly cartService = inject(CartService);
    
    private readonly wishlistService = inject(WishlistService);


    private readonly toastrService = inject(ToastrService)

    wishlist: string[] = [];
    
     loadedWishlist = localStorage.getItem('wishlist');
 
  


    products:IProduct[]=[];
    categories:ICategory[]=[];

    text:string ="";

    getProductsData(){
      this.productsService.getAllProducts().subscribe({
        next:(res)=>{
          console.log(res.data);
          this.products=res.data
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }

    getCategoryData(){
      this.categoriesService.getAllCategories().subscribe({
        next:(res)=>{
          console.log(res.data);
          this.categories=res.data
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }

    ngOnInit(): void {
      this.getProductsData();
      this.getCategoryData();
      this.loadedWishlist
    }

 
    addToCart(id:string): void{
      //fn takes the id of the product to send it to the service addProdToCart
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


    addToWishlist(id:string): void{
      this.wishlistService.addProductToWishlist(id).subscribe(
        {
          next:(res)=>{
            console.log(res); //show alert
            if(res.status === 'success'){
              this.toastrService.success(res.message);
              this.wishlist.push(id);
              this.saveWishlist();
              
            }
          },
          error:(err)=>{
            console.log(err)
          }
        }
      );
    }

    saveWishlist(): void {
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }
}
