export type Product = {
  _id?: string;
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
};
export type CartItem = Product & { quantity: number };

export type User = {
  joinDate: any;
  id: any;
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  wishlist: { product_id: string; quantity: number }[];
  cart: { product_id: string; quantity: number }[];
  notifications: {
    orders: boolean;
    promotions: boolean;
  };
  createdAt: string;
  updatedAt: string;
};

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}