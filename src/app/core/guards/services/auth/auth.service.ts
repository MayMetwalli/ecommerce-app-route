import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { };

  baseUrl:string = 'https://ecommerce.routemisr.com';
  userData:any = null;

  private readonly _Router = inject(Router);


  sendRegisterForm(data:object):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/api/v1/auth/signup`, data ) //send body after url
  }
  
  sendLoginForm(data:object):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/api/v1/auth/signin`, data ) //send body after url
  }

  saveUserData():void {
    if(localStorage.getItem('userToken')! == null){ //mawgood
      let getToken:any = localStorage.getItem('userToken')
      this.userData = jwtDecode( getToken)
      console.log('userData', this.userData)
    }
  }

  logOut():void{
    localStorage.removeItem('userToken');
    this.userData = null; //to clear it
    //navigate to login
    this._Router.navigate(['/login'])
  }


  setEmailVerify(data:object):Observable <any>{
    return this.httpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`, data)
  } 

  setCodeVerify(data:object):Observable <any>{
    return this.httpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`, data)
  } 

  setResetPass(data:object):Observable <any>{
    return this.httpClient.put(`${this.baseUrl}/api/v1/auth/resetPassword`, data)
  } 
}















function jwtDecode(getToken: any) {
  throw new Error('Function not implemented.');
}

