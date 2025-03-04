import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/guards/services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forget-pass',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.scss'
})
export class ForgetPassComponent {

  private readonly _AuthService = inject (AuthService);
  private readonly _Router = inject (Router);

      step:number = 1;
      isLoading:boolean = false;

      verifyEmail:FormGroup = new FormGroup({
        email: new FormControl (null, [Validators.required , Validators.email])
      })

      verifyCode:FormGroup = new FormGroup({
        resetCode: new FormControl (null, [Validators.required , Validators.pattern(/^[0-9]{5,6}$/)])
      })

      resetPassword:FormGroup = new FormGroup({
        email: new FormControl (null, [Validators.required , Validators.email]),
        newPassword: new FormControl(null, [Validators.required ,Validators.pattern(/^[A-Z]\w{7,}$/)]),
      })


      verifyEmailSubmitted():void{

        //get value inside email input and send it to step 3 form 
        let emailValue = this.verifyEmail.get('email')?.value;
        this.resetPassword.get('email')?.patchValue(emailValue);
        //emsek control esmo email fel form reset pass w edilo value emailValue

        if(this.verifyEmail.valid){
          this.isLoading = true;
        this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
          next:(res)=>{
            console.log(res)
            if(res.statusMsg === "success"){
              this.step =2;
            }
            this.isLoading = false;
          },
          error:(err)=>{
            console.log(err);
            this.isLoading = false;
          }
        })
      }
    }

      verifyCodeSubmitted():void{
        if(this.verifyCode.valid){
          this.isLoading = true;
        this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
          next:(res)=>{
            console.log(res)
            if(res.status === "Success"){
              this.step =3;
            }
            this.isLoading = false;
          },
          error:(err)=>{
            console.log(err);
            this.isLoading = false;
          }
        })
      }
      }

      newPasswordSubmitted():void{
        if(this.resetPassword.valid){
          this.isLoading = true;
        this._AuthService.setResetPass(this.resetPassword.value).subscribe({
          next:(res)=>{
            console.log(res);
            localStorage.setItem('userToken', res.token);
            this._AuthService.saveUserData();
            this._Router.navigate(['/home']);            
            
            this.isLoading = false;

          },
          error:(err)=>{
            console.log(err);
            this.isLoading = false;
          }
        })
      }
    }

}
