import { ID, UserID } from './../../shared/interfaces/iorders';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  
  if(localStorage.getItem('userToken') !== null){
    const userToken = localStorage.getItem('userToken')!;
    localStorage.setItem('userID', (jwtDecode(userToken) as {id:string}).id )
    // console.log(UserID)
    return true;
    // const token = localStorage.getItem('token')
    

  } else{
    //navigate to login or register --> router --> inject the service
    _Router.navigate(['/login'])
    return false;
  }





  // const _PLATFORM_ID = inject(PLATFORM_ID);

  // if(isPlatformBrowser(_PLATFORM_ID)){
  //   const token = localStorage.getItem('token') !;
  //   localStorage.setItem('userID',(jwtDecode(token)as {id:string} ).id)
  //   jwtDecode(token) as string 
  //   if(token){
  //     return true;
  //   }else{
  //     _Router.navigate(['/login']);
  //     return false
  //   }
  // } 
  // return false


};
