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
  cartItems: any[] = [];

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

      this.firestore.collection('cart')
      .valueChanges()
      .subscribe((cartItems: any) => {
        this.cartItems = cartItems;
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

    addToCart(product: any, selectedQuantity: number) {
      const cartCollection = this.firestore.collection('cart');
      const cartItems = this.cartItems;
    
      // Caută un produs în coș cu același nume ca produsul pe care doriți să-l adăugați
      const existingCartItem = cartItems.find((item) => item.product.name === product.name);
    
      if (existingCartItem) {
        existingCartItem.quantity += selectedQuantity;
        // Căutați documentul din coș bazat pe nume și actualizați cantitatea
        const cartItemDoc = this.firestore.collection('cart', (ref) => ref.where('product.name', '==', product.name));
        cartItemDoc.get().toPromise().then((querySnapshot) => {
          if (querySnapshot && !querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const id = doc.id;
              cartCollection.doc(id).update({ quantity: existingCartItem.quantity });
            });
            this.router.navigateByUrl('cart');
            console.log('Cantitate actualizată în coș cu succes');
          } else {
            console.log('Produsul nu a fost găsit în coș.');
          }
        });
      } else {
        const cartItem = {
          product: product,
          quantity: selectedQuantity
        };
        cartCollection.add(cartItem)
          .then(() => {
            this.router.navigateByUrl('cart');
            console.log('Produs adăugat în coș cu succes');
          })
          .catch((error) => {
            console.error('Eroare la adăugarea produsului în coș:', error);
          });
      }
    }
    
    
    
    
}