import { Component, OnInit } from '@angular/core';
import { CreateCategoryService } from '../create-category.service';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import AngularFirestore

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: any[] = [];
  updatedData: any = {};
  selectedCategoryName: string = '';
  isAdmin: boolean = false;

  constructor(
    private categoryService: CreateCategoryService,
    private firestore: AngularFirestore,
    private router: Router,
    private authService: AuthService
    
  ) {
    
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    
  }

  ngOnInit(): void {
    // Use AngularFirestore to fetch categories from Firestore
    this.firestore
      .collection('categories')
      .valueChanges()
      .subscribe((categories: any) => {
        this.categories = categories;
      });

      
  }

  deleteCategory(categoryName: string) {
    
    this.categoryService.deleteCategory(categoryName);
  }

  prepareUpdate(categoryName: any) {
    console.log('Category Name:', categoryName);
    this.router.navigate(['/update-category-component', { categoryName: categoryName }]);
  }

  categoryName(categoryName: any){
    this.router.navigate(['/view-products-bt-category-component', { categoryName: categoryName }]);
  }
  
}



  
