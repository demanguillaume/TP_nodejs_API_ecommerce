import { Order } from "./Order";
import { Product } from "./Product";

// to make the file a module and avoid the TypeScript error
export {}

/**
 * Extends the Express Request interface to include additional properties related to orders and products.
 */
declare global {
  namespace Express {
    export interface Request {
      // order?: Order;
      // orders?: Order[];
      // product?: Product;
      // products?: Product[];
    }
  }
}