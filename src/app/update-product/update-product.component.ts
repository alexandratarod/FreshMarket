import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  updateProductForm: FormGroup;
  productName: string = '';

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage
  ) {
    this.updateProductForm = this.fb.group({
      productname: new FormControl('', [Validators.required]),
      productphoto: new FormControl(null, [Validators.required]),
      productprice: new FormControl('', [Validators.required]),
      productcategory: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.productName = params['productName']});

    // Load the current data of the product, if necessary
    this.firestore.collection('products').doc(this.productName).valueChanges().subscribe((product: any) => {
      if (product) {
        this.updateProductForm.setValue(product); 
      }
    });
  }

  async updateProduct() {

    
    const photoControl = this.updateProductForm.get('productphoto');
    if (photoControl && photoControl.value) {
      const file = photoControl.value;

      const path = `product-photos/${file.name}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      console.log(url);
      const updatedData = {
        name: this.updateProductForm.value.productname,
        photo: url, 
        price: this.updateProductForm.value.productprice,
        category: this.updateProductForm.value.productcategory,
      };

      console.log(this.productName);

      this.firestore.collection('products', ref => ref.where('name', '==', this.productName)).get()
        .subscribe(querySnapshot => {
          querySnapshot.forEach(doc => {
           
            const productId = doc.id;

            this.firestore.collection('products').doc(productId).update(updatedData)
              .then(() => {
                console.log('Product updated successfully.');
                this.router.navigateByUrl('products'); 
              })
              .catch(error => {
                console.error('Error updating product:', error);
              });
          });
        });
    }
  }

  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const photoControl = this.updateProductForm.get('productphoto');
      if (photoControl) {
        photoControl.setValue(file);
      }
    }
  }
}
