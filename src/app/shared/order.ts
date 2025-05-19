import { Product } from './product';

export interface Order {
  id?: string;
  items: Product[];
  price: number;
  message?: string;
}
