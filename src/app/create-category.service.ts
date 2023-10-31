import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, query, getDocs, QuerySnapshot, DocumentData, deleteDoc, DocumentReference, doc } from '@angular/fire/firestore';
import { setDoc, updateDoc, where } from 'firebase/firestore';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CreateCategoryService {
  constructor(private firestore: Firestore) {}
  

  addCategory(category: { name: string, photo: ImageData }) {
    const collectionInstance = collection(this.firestore, 'categories');
    return addDoc(collectionInstance, category);
  }

  getCategories(): Observable<QuerySnapshot<DocumentData>> {
    const categoriesCollection = collection(this.firestore, 'categories');
    const categoriesQuery = query(categoriesCollection);
    return from(getDocs(categoriesQuery));
  }

  

  deleteCategory(categoryName: string) {
    const categoriesCollection = collection(this.firestore, 'categories');
    const queryByName = query(categoriesCollection, where('name', '==', categoryName));
    getDocs(queryByName).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref).then(() => {
          console.log('Category deleted successfully.');
        }).catch((error) => {
          console.error('Error deleting category:', error);
        });
      });
    });
  }

updateCategory(categoryName : string, newData : { name: string, photo: string } ) {
  const categoriesCollection = collection(this.firestore, 'categories');
  const queryByName = query(categoriesCollection, where('name', '==', categoryName));

  getDocs(queryByName).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // Update the category with the new data
      const categoryRef = doc.ref;
      updateDoc(categoryRef, newData)
        .then(() => {
          console.log('Category updated successfully.');
        })
        .catch((error) => {
          console.error('Error updating category:', error);
        });
    });
  });
}

}
  


  

