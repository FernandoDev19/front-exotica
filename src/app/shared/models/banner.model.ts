import { Product } from '../components/products/models/product.model';

export interface Banner {
  id: number;
  product: Product;
  title: string;
  product_type: string;
  image: string;
  created_at: Date;
  updated_at: Date;
}
