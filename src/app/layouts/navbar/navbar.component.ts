import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/guards/services/auth/auth.service';
import { CartService } from '../../core/guards/services/cart/cart.service';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  @Input() isLogin:boolean = true;

   readonly _AuthService = inject(AuthService); //public so i can use it in html


  // hamada():void {
  //    this._AuthService.logOut()
  // }

  router = inject(Router);
  cartService = inject(CartService);
  cartItemsCount = 0

  ngOnInit(): void {
    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemsCount = count; 
    });
  }
}
