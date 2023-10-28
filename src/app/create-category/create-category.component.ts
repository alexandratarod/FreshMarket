import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateCategoryService } from '../create-category.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  createCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    photo: new FormControl(null, [Validators.required]),
  });

  constructor(
    private createCategoryService: CreateCategoryService,
    private router: Router,
    private fireStorage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {}

  async createCategory() {
    const photoControl = this.createCategoryForm.get('photo');
    if (photoControl && photoControl.value) {
      const file = photoControl.value;
  
      const path = `fresh-market-category/${file.name}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
  
      const categoryData = {
        name: this.createCategoryForm.value.name,
        photo: url, // Store the download URL as a string
      };
  
      // Save category data with the URL to Firestore
      this.firestore
        .collection('categories')
        .add(categoryData)
        .then((res) => {
          this.router.navigateByUrl('category');
        })
        .catch((error: any) => {
          alert('Invalid Category');
          console.error('Create category error', error);
        });
    }
  }
  

  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const photoControl = this.createCategoryForm.get('photo');
      if (photoControl) {
        photoControl.setValue(file);
      }
    }
  }
  
}
