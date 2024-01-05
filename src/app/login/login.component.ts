import { Component , OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { GoogleAuthProvider } from "firebase/auth";

import { getAuth } from "firebase/auth";

import { signInWithPopup } from "firebase/auth";






@Component({
 selector: 'app-login',
  templateUrl: './login.component.html',
 styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  hide: boolean = true;
  passwordControl : FormControl = new FormControl('' , Validators.required);

  loginForm : FormGroup = new FormGroup({
    username : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', Validators.required)

  })

  isLoggedIn = false;

  constructor(private authService : AuthService, private router : Router){}

  ngOnInit(): void {

  }

  loginWithEmailAndPassword(){

    const formData = this.loginForm.value;

    const username = formData.username;
    const password = formData.password;

    const userData = Object.assign(formData, { email: username });
    this.authService.signInWithEmailAndPassword(userData).then((res: any) => {

      this.router.navigateByUrl('products');
      localStorage.setItem('isLoggedIn', 'true');
      this.isLoggedIn = true;
    }).catch((error: any) => {
      alert("Invalid credentials");
      console.error("Sign in error", error);
    });
    
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();

      const result = await signInWithPopup(auth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(result)!;
      const token = credential.accessToken;
      const user = result.user;

      this.router.navigateByUrl('products');
      localStorage.setItem('isLoggedIn', 'true');
      this.isLoggedIn = true;

      console.log('Google sign-in successful:', user);

    } catch (error : any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData ? error.customData.email : null;
      const credential = error.credential
        ? GoogleAuthProvider.credentialFromError(error)!
        : null;

    
      

      console.error('Google sign-in error:', errorCode, errorMessage, email);

      
    }
  }

  
  


  
}