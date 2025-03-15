export interface Product{
  id: number;
  name: string;
  in_stock: number;
  price: number;
  offer?: number;
  qualification: number;
  quantity_of_qualifications: number;
  images: string[];
  description: string;
  created_at: Date;
}
