import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';




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

const firebaseConfig = {
  apiKey: "AIzaSyDA8IzkaulVmXiWtinAVLXpeCriVeA8iMQ",
  authDomain: "freshmarket-aec4e.firebaseapp.com",
  projectId: "freshmarket-aec4e",
  storageBucket: "freshmarket-aec4e.appspot.com",
  messagingSenderId: "470283059215",
  appId: "1:470283059215:web:676b9b92af7c01888b237a"
};

const appRoutes: Routes = [
  
    {path:'', component:HomeSectionComponent},
    {path:'products', component:ProductSectionComponent},
    {path:'category', component:CategoryComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'wishlist', component:WishlistComponent},
    {path:'cart', component:CartComponent}

  
]

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
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    provideFirebaseApp(() => initializeApp( firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
