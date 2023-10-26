import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './category/category.component';
import { HomeSectionComponent } from './home-section/home-section.component';
import { ProductSectionComponent } from './product-section/product-section.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideAuth,getAuth, signInWithPopup } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


/*const firebaseConfig = {
  apiKey: "AIzaSyC3Ez2C5kSJ8s3jdbLBDiC18ddAMmVrmG4",
  authDomain: "freshmarket-d0661.firebaseapp.com",
  projectId: "freshmarket-d0661",
  storageBucket: "freshmarket-d0661.appspot.com",
  messagingSenderId: "635418123047",
  appId: "1:635418123047:web:046630c957d5d24565a702",
  measurementId: "G-8W3SVRGCP2"
};

*/




const appRoutes: Routes = [
  
    {path:'', component:HomeSectionComponent},
    {path:'products', component:ProductSectionComponent},
    {path:'category', component:CategoryComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'wishlist', component:WishlistComponent},
    {path:'cart', component:CartComponent},
  

  
]



//const app = initializeApp(firebaseConfig)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryComponent,
    HomeSectionComponent,
    ProductSectionComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    WishlistComponent,

  ],
  imports: [
    
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule,
    provideFirebaseApp(() => getApp()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirestore(() => getFirestore()),
    AngularFireAuthModule,
    ReactiveFormsModule,
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})



export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
