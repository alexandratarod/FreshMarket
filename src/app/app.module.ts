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

import { provideFirebaseApp, getApp, initializeApp, FirebaseAppModule } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';

import { AngularFireModule, FirebaseApp } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideAuth,getAuth, signInWithPopup } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateCategoryService } from './create-category.service';
import { FirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule} from '@angular/fire/compat/storage';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';









const appRoutes: Routes = [
  
    {path:'', component:HomeSectionComponent},
    {path:'products', component:ProductSectionComponent},
    {path:'category', component:CategoryComponent},
    {path:'category-card', component:CategoryCardComponent},
    {path:'create-category', component:CreateCategoryComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'wishlist', component:WishlistComponent},
    {path:'cart', component:CartComponent},
    {path:'update-category-component', component:UpdateCategoryComponent},
    {path:'create-product', component:CreateProductComponent},
    {path:'update-product-component', component:UpdateProductComponent},
   

  

  
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
    WishlistComponent,
    CategoryCardComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    CreateProductComponent,
    UpdateProductComponent,
    
    

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => getApp()),
    AngularFireAuthModule,
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    FirestoreModule,
    AngularFireStorageModule
   
    
  ],
  providers: [AuthService, CreateCategoryService,],
  bootstrap: [AppComponent]
})


export class AppModule { }

