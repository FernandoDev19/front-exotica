import { Injectable } from '@angular/core';
import { CartProduct } from '../model/cart.model';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../../products/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProduct: CartProduct[] = [];
  private $products: BehaviorSubject<CartProduct[]> = new BehaviorSubject<CartProduct[]>([]);
  private isCartVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  addNewProduct(product: Product, quantity?: number): void {
    if (quantity && quantity <= 0) {
      console.warn('La cantidad debe ser mayor que 0.');
      return;
    }

    const existingProduct = this.cartProduct.find(item => item.product.id === product.id);

    if (!existingProduct) {
      if(quantity){
        this.cartProduct.push({ product, quantity: (quantity > product.in_stock ? product.in_stock : quantity) });
      }else{
        this.cartProduct.push({ product, quantity: 1 });
      }
    } else {
      if(quantity){
        existingProduct.quantity = quantity > product.in_stock ? product.in_stock : quantity;
      }else{
        existingProduct.quantity < existingProduct.product.in_stock ? existingProduct.quantity++ : existingProduct.quantity = existingProduct.product.in_stock;
      }
    }

    this.$products.next([...this.cartProduct]);
  }

  removeProduct(product: Product, index: number){
    const existingProduct = this.cartProduct.find(item => item.product.id === product.id);

    if (existingProduct) {
      if(existingProduct.quantity === 1){
        this.cartProduct.splice(index, 1);
      }else{
        existingProduct.quantity--;
      }
    }

    this.$products.next([...this.cartProduct]);
  }

  clearCart(){
    this.cartProduct = [];
    this.$products.next([...this.cartProduct]);
  }

  getProducts(){
    return this.$products.asObservable();
  }

  productInCart(productId: number){
    return !!this.cartProduct.find(item => item.product.id === productId);
  }

  visibleCart(){
    return this.isCartVisible.asObservable();
  }

  showCart(): void {
    this.isCartVisible.next(true);
  }
}
