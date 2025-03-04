import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import {TranslateService} from '@ngx-translate/core'

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  private readonly renderer2 = inject(RendererFactory2).createRenderer(null,null)

  constructor(private translateService:TranslateService, @Inject(PLATFORM_ID) private id:object) {
    
    if(isPlatformBrowser(this.id)){
  //translate logic for words
  
  //1. set default language 'fallback'
  this.translateService.setDefaultLang('en');
  
  //2. get language in localStorage and save it
  const savedLang = localStorage.getItem('lang');
  
  //3. use language in localStorage
  if(savedLang){
    this.translateService.use(savedLang !)
  }
  this.changeDirection()
}

 }

 changeDirection():void{
  if(localStorage.getItem('lang') === 'en'){ //ltr
    this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr')
    this.renderer2.setAttribute(document.documentElement, 'lang', 'en')
  }else if(localStorage.getItem('lang') === 'ar'){ //rtl
    this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl')
    this.renderer2.setAttribute(document.documentElement, 'lang', 'ar')

  }
 }
}
