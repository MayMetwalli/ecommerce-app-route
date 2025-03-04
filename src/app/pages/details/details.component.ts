import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/guards/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);

  detailsProduct: IProduct | null = null; //empty object working as an interface, null at first

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe( {
      next:(p)=>{
        console.log(p.get('prodID')); //gets any param
        let idProduct = p.get('prodID');

        //call Api of specific products getSpecificProducts()
        this._ProductsService.getSpecificProducts(idProduct).subscribe({
          next:(res)=>{
            console.log(res.data);
            this.detailsProduct = res.data
          },
          error:(err)=>{
            console.log(err)
          }
        })
      }
    })
  }

}
