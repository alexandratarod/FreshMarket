import { Component , OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';



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
  


  
}