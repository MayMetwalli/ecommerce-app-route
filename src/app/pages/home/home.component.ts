import { CartService } from './../../core/guards/services/cart/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/guards/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/guards/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from "../../core/pipes/search.pipe";
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/guards/services/wishlist/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
    export class HomeComponent implements OnInit {

    private readonly  productsService = inject(ProductsService);

    private readonly categoriesService = inject(CategoriesService);

    private readonly cartService = inject(CartService);
    
    private readonly wishlistService = inject(WishlistService);


    private readonly toastrService = inject(ToastrService)

    wishlist: string[] = [];
    
     loadedWishlist = localStorage.getItem('wishlist');

    customMainSlider: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      navSpeed: 700,
      navText: ['', ''],
      items:1,
      nav: false,
    }
    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: true,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      navSpeed: 700,
      navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 4
        }
      },
      nav: true
    }
 
  


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
