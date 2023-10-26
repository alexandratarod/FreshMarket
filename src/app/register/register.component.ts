import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide: boolean = true;
  hideConfirmPassword: boolean = true;

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  registerWithEmailAndPassword() {
    const userData = Object.assign(this.registerForm.value, { email: this.registerForm.value.username });
    this.authService.registerWithEmailAndPassword(userData).then((res: any) => {
      this.router.navigateByUrl('login');
    }).catch((error: any) => {
      alert("Invalid Registration");
      console.error("Register error", error);
    });
  }
}
