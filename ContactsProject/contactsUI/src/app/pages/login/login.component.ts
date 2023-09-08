import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInformation } from 'src/models/user';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm : FormGroup;
  loginInfo: LoginInformation;

  constructor(private router : Router,private authService: AuthService){
    
  }
  

  ngOnInit(){
    this.loginForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.minLength(1)]),
      password : new FormControl('', [Validators.required, Validators.minLength(1)]),
      });

    }


    signIn(){
      if (this.loginForm.valid) {
        this.loginInfo = new LoginInformation();
  
        this.loginInfo.email =
          this.loginForm.controls["email"].getRawValue();
        this.loginInfo.password =
          this.loginForm.controls["password"].getRawValue();
  
        this.authService.login(this.loginInfo);
      }
    }

    signUp(){
      this.router.navigateByUrl("/sign-up")
    }
}
