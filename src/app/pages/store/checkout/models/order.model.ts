import { OrderStatus } from '../enums/order-status.enum';
import { PaymentMethods } from '../enums/payment-methods.enum';

interface Customer {
  fullname: string;
  email: string;
  phone: string;
  department: string;
  city: string;
  address: string;
  postal_code?: string;
}

export interface Order extends Customer {
  order_date: Date;
  order_status: OrderStatus;
  payment_method: PaymentMethods;
  total: number;
  mailing_address: string;
  products: {
    productId: number;
    quantity: number;
    subtotal: number;
  }[];
}
