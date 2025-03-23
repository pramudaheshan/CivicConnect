export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}