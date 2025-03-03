import { Component, inject, OnInit } from '@angular/core';
import { ICategory } from '../../shared/interfaces/icategory';
import { CategoriesService } from '../../core/guards/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
    export class CategoriesComponent implements OnInit {


    private readonly categoriesService = inject(CategoriesService);

    categories:ICategory[]=[];

    text:string ="";



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
      this.getCategoryData();
    }

}
