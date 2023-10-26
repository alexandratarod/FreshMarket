import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afs: AngularFireAuth) {
    // Nu mai avem nevoie de this.afs.onAuthStateChanged aici
  }

  registerWithEmailAndPassword(user: { email: string, password: string }) {
    return this.afs.createUserWithEmailAndPassword(user.email, user.password);
  }

  signInWithEmailAndPassword(user: { email: string, password: string }) {
    return this.afs.signInWithEmailAndPassword(user.email, user.password);
  }

  logout() {
   
    localStorage.removeItem('isLoggedIn');
    return this.afs.signOut();
  }

  getIsLoggedIn(): boolean {
    
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  isAdmin(user: { email: string }): boolean {
    return user.email.endsWith("@freshmarket.com");
  }
  
}
