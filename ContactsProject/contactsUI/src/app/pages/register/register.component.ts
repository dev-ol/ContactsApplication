import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInformation } from 'src/models/user';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm : FormGroup;
  loginInfo: LoginInformation;

  confirmPasswordValid: boolean = true;


  constructor(private router : Router,private authService: AuthService){
    
  }
  

  ngOnInit(){
    this.registerForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password : new FormControl('', [Validators.required, Validators.minLength(1),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')]),
      confirmPassword: new FormControl('',  [Validators.required,Validators.minLength(1),  Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')])
    });

    }


    async signUp(){
      if(this.isValidForm() && this.registerForm.valid){

        await this.authService.register({
          email: this.registerForm.controls["email"].getRawValue(),
          password: this.registerForm.controls["password"].getRawValue(),
        });
      }else{
        alert("Form Invalid")
      }
    }

    signIn(){
      this.router.navigateByUrl("/login")
    }



  isValidForm() {

    let password = this.registerForm.controls["password"].getRawValue();
    let confirmPassword = this.registerForm.controls["confirmPassword"].getRawValue();
    if(confirmPassword != password){
      this.confirmPasswordValid = false;
      return false;
      alert("Password not the same");
    }
    this.confirmPasswordValid = true;

    return true;

  }
}
