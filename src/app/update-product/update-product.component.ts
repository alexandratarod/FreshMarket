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
  updateProductForm!: FormGroup;
  productName: string = '';
  productPhoto: string = '';
  productPrice: string = '';
  productCategory: string = '';

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage
  ) {}
  

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.productName = params['productName'];
      this.productPhoto = params['productPhoto'];
      this.productPrice = params['productPrice'];
      this.productCategory = params['productCategory'];
      this.initForm();
    });
  }

  initForm(): void{
    this.updateProductForm = this.fb.group({
      productname: new FormControl(this.productName, [Validators.required]),
      productphoto: new FormControl(null, [Validators.required]),
      productprice: new FormControl(this.productPrice, [Validators.required]),
      productcategory: new FormControl(this.productCategory, [Validators.required]),
    });
  }

  async updateProduct() {

    
    const photoControl = this.updateProductForm.get('productphoto');
    let updatedData: { name: string, photo: string, price:string, category:string };
    

    if (photoControl && photoControl.value) {
      const file = photoControl.value;
      const path = `fresh-market-category/${file.name}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      
      
       
       updatedData = {
        name: this.updateProductForm.value.productname,
        photo: url, 
        price: this.updateProductForm.value.productprice,
        category: this.updateProductForm.value.productcategory,
       };
       
    }
    else{
  
      const oldurl=this.productPhoto;
      updatedData = {
        name: this.updateProductForm.value.productname,
        photo: oldurl, 
        price: this.updateProductForm.value.productprice,
        category: this.updateProductForm.value.productcategory,
       
      };
  
    }

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
