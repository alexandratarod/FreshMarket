import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  updateCategoryForm: FormGroup;
  categoryName: string = '';

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage
  ) {
    this.updateCategoryForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      photo: new FormControl(null, [Validators.required]),
      
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.categoryName = params['categoryName'];
    });

    // Încărcați datele curente ale categoriei, dacă este necesar
    this.firestore.collection('categories').doc(this.categoryName).valueChanges().subscribe((category: any) => {
      if (category) {
        this.updateCategoryForm.setValue(category); 
      }
    });
  }

  async updateCategory() {
    const photoControl = this.updateCategoryForm.get('photo');
    if (photoControl && photoControl.value) {
      const file = photoControl.value;

      const path = `fresh-market-category/${file.name}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();

      const updatedData = {
        name: this.updateCategoryForm.value.name,
        photo: url, // Store the download URL as a string
      };

      console.log('URL of the updated image:', url);

      // Parcurgeți colecția de categorii pentru a găsi categoria cu numele specificat
      this.firestore.collection('categories', ref => ref.where('name', '==', this.categoryName)).get()
        .subscribe(querySnapshot => {
          querySnapshot.forEach(doc => {
            // Obțineți id-ul documentului (documentID)
            const categoryId = doc.id;

            // Actualizați categoria în Firebase Firestore folosind id-ul documentului
            this.firestore.collection('categories').doc(categoryId).update(updatedData)
              .then(() => {
                console.log('Category updated successfully.');
                this.router.navigate(['/category']); // Navigați înapoi la lista de categorii sau la o altă pagină
              })
              .catch(error => {
                console.error('Error updating category:', error);
              });
          });
        });
    }
    

  }

  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const photoControl = this.updateCategoryForm.get('photo');
      if (photoControl) {
        photoControl.setValue(file);
      }
    }
  }
}
  
  
    
  

