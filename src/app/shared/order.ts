import { Product } from './product';
import { UserProfile } from './user';
import { Shipping } from './shipping';

export interface Order {
  id?: string;
  email: string;
  items: Product[];
  price: number;
  user?: UserProfile;
  shipping?: Shipping;
  message?: string;
}
