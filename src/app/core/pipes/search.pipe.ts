import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObject:any[], term:string ): any[] { //2params: array + word searched -> : returns array of any
    return arrayOfObject.filter( (item)=> item.title.toLowerCase().includes(term.toLowerCase()) );
    //filter returns array of the data after filteration
  }

}
