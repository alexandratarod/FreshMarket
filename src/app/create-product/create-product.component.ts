import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  createProductForm: FormGroup = new FormGroup({
    productname: new FormControl('', [Validators.required]),
    productprice: new FormControl('', [Validators.required]),
    productphoto: new FormControl(null, [Validators.required]),
    productcategory: new FormControl('', [Validators.required]),
  });

  constructor(
    private fireStorage: AngularFireStorage,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  async createProduct() {
    const photoControl = this.createProductForm.get('productphoto');
    if (photoControl && photoControl.value) {
      const file = photoControl.value;
  
      const path = `product-photos/${file.name}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
  
      const productData = {
        name: this.createProductForm.value.productname,
        price: this.createProductForm.value.productprice,
        photo: url, 
        category: this.createProductForm.value.productcategory,
      };
  
      
      this.firestore
        .collection('products')
        .add(productData)
        .then((res) => {
          this.router.navigateByUrl('products');
          
        })
        .catch((error: any) => {
          alert('Invalid Product');
          console.error('Create product error', error);
        });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const photoControl = this.createProductForm.get('productphoto');
      if (photoControl) {
        photoControl.setValue(file);
      }
    }
  }
}
