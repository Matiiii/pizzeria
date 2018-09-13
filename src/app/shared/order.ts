import {Customer} from './customer';

export interface Order {
  id?: number;
  dishIds: number[];
  customer?: Customer;
  price?: number;
  status?: string;
  date: Date;
}
