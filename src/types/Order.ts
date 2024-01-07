import { OrderProduct } from './OrderProduct';

export interface Order {
    id: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    orderProducts?: OrderProduct[];
}
