import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AccountRegistration, LoginInformation } from "src/models/user";
import {
    Auth,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    User,
    UserCredential,
  } from '@angular/fire/auth';
import { browserSessionPersistence, getAuth, setPersistence } from "firebase/auth";
  
@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    user: any;
  
    constructor(
      private auth: Auth,
      public router: Router
    ) {}
  
    getUserInfo() :User | null{
      return this.auth.currentUser;
    }
    async register(accountInfo: AccountRegistration) {
      try {
        const results: UserCredential = await createUserWithEmailAndPassword(
          this.auth,
          accountInfo.email,
          accountInfo.password
        );
  
        this.router.navigateByUrl('/login');
      } catch (e) {
        alert("Something went wrong. Please try again later!")
      }
    }
  
    async login(loginInfo: LoginInformation) {
      try {
        const auth = getAuth();

        await setPersistence(auth, browserSessionPersistence);

        this.auth = auth;
        
        let user = await signInWithEmailAndPassword(
          this.auth,
          loginInfo.email,
          loginInfo.password
        );
        this.user = user;
        if (user) {
         // console.log("user token : ", (await user.user.getIdToken()))
          this.router.navigateByUrl('/');
        }
      } catch (e) {
  
        alert("Could not login user.")
      }
    }
  
    logout() {
      signOut(this.auth)
        .then((x) => {
          this.router.navigateByUrl('/login');
        })
        .catch((x) => {
          alert("Something went wrong. Please try again!")
        });
    }
  
    resetPassord(email : string) {
      sendPasswordResetEmail(this.auth, email)
        .then(() => {
          // Password reset email sent!
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  
    async presentToast(position: 'top' | 'middle' | 'bottom', message : string) {
      alert(message);
    }
  }
  