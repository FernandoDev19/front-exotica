import { Product } from "../../../products/models/product.model";

export interface CartProduct{
  product: Product;
  quantity: number;
}
