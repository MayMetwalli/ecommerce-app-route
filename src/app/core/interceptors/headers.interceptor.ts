import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {

  const _PLATFORM_ID = inject(PLATFORM_ID)

  // check for platform first because server don't have window globl object 
  if(isPlatformBrowser(_PLATFORM_ID)) {
    const token = localStorage.getItem('userToken')

  if(token) {
    req = req.clone({
      setHeaders:{
        token : token
      }
    })
  }
  }

  return next(req);
};
