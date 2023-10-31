import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-section',
  templateUrl: './view-products-by-category.component.html',
  styleUrls: ['./view-products-by-category.component.css']
})
export class ViewProductsByCategoryComponent {
  products: any[] = [];
  isAdmin: boolean = false;
  categoryName: string = '';
  filteredProducts: any[] = [];

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.firestore
      .collection('products')
      .valueChanges()
      .subscribe((products: any) => {
        this.products = products;
        // Apelăm funcția de filtrare a produselor în funcție de categorie aici
        this.filterProductsByCategory();
      });

    // Obține numele categoriei din parametrii URL-ului
    this.route.params.subscribe(params => {
      this.categoryName = params['categoryName'];
      // Apelăm funcția de filtrare a produselor în funcție de categorie aici
      this.filterProductsByCategory();
    });
  }

  // Funcția de filtrare a produselor în funcție de categorie
  filterProductsByCategory() {
    if (this.categoryName && this.products) {
      // Convertim numele categoriei la litere mici pentru a nu ține cont de diferențele de litere mari/minuscule
      const lowerCaseCategoryName = this.categoryName.toLowerCase();
      this.filteredProducts = this.products.filter(product => product.category.toLowerCase() === lowerCaseCategoryName);
    } else {
      this.filteredProducts = this.products;
    }
  }
}
