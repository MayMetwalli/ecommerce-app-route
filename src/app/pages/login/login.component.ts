import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms"
import { AuthService } from '../../core/guards/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
  
    isLoading:boolean = false;
    msgError:string = ""; //string fady 3ashan hatetmala bel function
    msgSucces:boolean = false; //string fady 3ashan hatetmala bel function
  
  
    // x : FormGroup = new FormGroup({  //created an empty object
    //    name: new FormControl(null), //initial value awel mafta7 
    //    password: new FormControl(null),
    // });
  
    loginForm: FormGroup = new FormGroup({ //created an empty object that has these properties
      email: new FormControl(null, [Validators.required ,Validators.email]), //2 params, 1st the initial value, 2nd the validation
      password: new FormControl(null, [Validators.required ,Validators.pattern(/^[A-Z]\w{7,}$/)]),
    }
  );
  //rakkebt el confirm fn 3al form ba3d el controls, ma7toot gowa object {}
  
    submitForm():void {
      if(this.loginForm.valid){
        this.isLoading = true;
        //lama te3mel submit roo7 lel authService w hat menha method sendloginForm
        //el "value" da el object eli shayel el data bta3ty -> param for the function
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message === 'success'){ //account created successfully


           this.msgSucces = true;

           setTimeout(()=> {
            //1.save token
            localStorage.setItem('userToken', res.token);
             
            //2.decode token
            // in the auth service to be shared
            this.authService.saveUserData

            //3.navigate to the home path based on a condition "programming routing" -> Service!
            this.router.navigate(['/home']);
           }, 1000);
          }
          this.isLoading = false;
        },
        error:(err:HttpErrorResponse)=>{
          // console.log(err.error.message);
          //if account already exist, show the msg to the user
          this.msgError = err.error.message
          this.isLoading = false;
        }
      })
      }
    }
  
    //custom validation to check on both values of pass and rePass
  }
  


