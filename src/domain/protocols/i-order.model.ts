import Product from './i-product.model';

export default interface Order {
  orderId: number;
  products: Array<Product>;
  status: string;
}
