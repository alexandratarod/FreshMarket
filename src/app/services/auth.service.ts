import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afs: AngularFireAuth) {
    
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


  isAdmin(): Observable<boolean> {
    return this.afs.authState.pipe(
      map(user => {
        if (user && user.email) {
          return user.email.endsWith("@freshmarket.com");
        }
        return false; 
      })
    );

}
}
