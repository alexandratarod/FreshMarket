import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.css']
})
export class ProductSectionComponent {

  products: any[] = []; 
  isAdmin: boolean = false;

  constructor(
    private firestore: AngularFirestore,
    private firest: Firestore,
    private router: Router,
    private authService: AuthService
    
  ) {
    
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  ngOnInit(): void {
   
    
    this.firestore
      .collection('products')
      .valueChanges()
      .subscribe((products: any) => {
        this.products = products;
      });
  }

  async deleteProduct(product: any) {
    const productsCollection = collection(this.firestore.firestore, 'products');

    // Create a query to find products with matching details
    const q = query(productsCollection, where('name', '==', product.name), where('price', '==', product.price)); // Add more properties for matching as needed

    const querySnapshot = await getDocs(q);

    // Iterate through the documents and delete them
    querySnapshot.forEach((docSnap) => {
      const productDoc = doc(productsCollection, docSnap.id);
      deleteDoc(productDoc)
        .then(() => {
          this.products = this.products.filter(p => p.name !== product.name ); // Update filter condition based on your needs
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        });
    });
    }


    prepareUpdate(productName: string, productPhoto: string, productPrice: string, productCategory: string) {
      this.router.navigate(['/update-product-component'], {
        queryParams: { productName: productName, productPhoto: productPhoto, productPrice:productPrice, productCategory:productCategory }
      });
    }
}
