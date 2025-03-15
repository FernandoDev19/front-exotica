import { Injectable } from '@angular/core';
import { Product } from '../../../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private product!: BehaviorSubject<Product>;
  private isDialogVisible: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private currentImage: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  constructor() {
    this.product = new BehaviorSubject<Product>({} as Product);
  }

  selectProduct(product: Product) {
    this.product.next(product);
    this.showDialog(product.images[0]);
  }

  getProductSelected() {
    return this.product.asObservable();
  }

  showDialog(image: string) {
    this.currentImage.next(image);
    this.isDialogVisible.next(true);
  }

  hideDialog() {
    this.isDialogVisible.next(false);
    this.currentImage.next('');
  }

  DialogVisible() {
    return this.isDialogVisible.asObservable();
  }

  getCurrentImage() {
    return this.currentImage.asObservable();
  }

  setCurrentImage(image: string) {
    this.currentImage.next(image);
  }
}
