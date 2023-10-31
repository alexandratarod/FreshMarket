import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent {
  cartItems: any[] = [];

  constructor(private firestore: AngularFirestore){}

  ngOnInit(): void {
    this.firestore.collection('cart').valueChanges().subscribe((cartItems: any) => {
      this.cartItems = cartItems;
    });
  }


  removeFromCart(item: any) {
    const cartCollection = this.firestore.collection('cart');
  
    // Query to find the document with the product name
    const query = cartCollection.ref.where('product.name', '==', item.product.name);
  
    query.get()
      .then((querySnapshot) => {
        // Check if a document was found
        if (!querySnapshot.empty) {
          // Delete the first found document (you can add additional logic to handle multiple documents with the same name if needed)
          const docToDelete = querySnapshot.docs[0];
          docToDelete.ref.delete()
            .then(() => {
              console.log('Product removed from cart and database successfully.');
            })
            .catch((error) => {
              console.error('Error removing the product from cart and database:', error);
            });
        } else {
          console.log('Product not found in the cart.');
        }
      })
      .catch((error) => {
        console.error('Error searching for the product in the cart:', error);
      });
  }



  editQuantity(item: any) {
    const cartCollection = this.firestore.collection('cart');
    const query = cartCollection.ref.where('product.name', '==', item.product.name);

    query.get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const docToUpdate = querySnapshot.docs[0];
          docToUpdate.ref.update({ quantity: item.quantity })
            .then(() => {
              console.log('Quantity updated successfully.');
            })
            .catch((error) => {
              console.error('Error updating quantity:', error);
            });
        } else {
          console.log('Product not found in the cart.');
        }
      })
      .catch((error) => {
        console.error('Error searching for the product in the cart:', error);
      });
  }

  emptyCart() {
    const cartCollection = this.firestore.collection('cart');
  
    // Get all documents from the "cart" collection
    cartCollection.get().toPromise().then((querySnapshot) => {
      if (querySnapshot) {
        if (!querySnapshot.empty) {
          // Delete all documents in the "cart" collection
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
          // Clear the cartItems array in your component
          this.cartItems = [];
          console.log('Cart cleared successfully.');
        } else {
          console.log('Cart is already empty.');
        }
      } else {
        console.log('No documents found in the cart.');
      }
    }).catch((error) => {
      console.error('Error clearing the cart:', error);
    });
  }
  
}