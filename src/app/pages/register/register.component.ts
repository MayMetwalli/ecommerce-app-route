import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms"
import { AuthService } from '../../core/guards/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading:boolean = false;
  msgError:string = ""; //string fady 3ashan hatetmala bel function


  x : FormGroup = new FormGroup({  //created an empty object
     name: new FormControl(null), //initial value awel mafta7 
     password: new FormControl(null),
  });

  registerForm: FormGroup = new FormGroup({ //created an empty object that has these properties
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]), //these have initial values as null awel mafta7 
    email: new FormControl(null, [Validators.required ,Validators.email]), //2 params, 1st the initial value, 2nd the validation
    password: new FormControl(null, [Validators.required ,Validators.pattern(/^[A-Z]\w{7,}$/)]),
    rePassword: new FormControl(null, [Validators.required ,Validators.pattern(/^[A-Z]\w{7,}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },{validators: this.confirmPassword.bind(this)},
);
//rakkebt el confirm fn 3al form ba3d el controls, ma7toot gowa object {}

  submitForm():void {
    if(this.registerForm.valid){
      this.isLoading = true;
      //lama te3mel submit roo7 lel authService w hat menha method sendRegisterForm
      //el "value" da el object eli shayel el data bta3ty -> param for the function
    this.authService.sendRegisterForm(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message === 'success'){ //account created successfully
          //navigate to the login path based on a condition "programming routing" -> Service!!
         this.router.navigate(['/login'])
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
    }else {
      this.registerForm.markAllAsTouched()
    }
  }

  //custom validation to check on both values of pass and rePass
  confirmPassword(group: AbstractControl){ //param hayshil gowah el form kollo
    const password = group.get('password')?.value
    const rePassword = group.get('rePassword')?.value

    // if(password === rePassword){
    //   return null; //no errors
    // } else{
    //   return {mismatch:true} //returns shakl el error 
    // }

    return password === rePassword ? null : {mismatch:true}
  }

}
