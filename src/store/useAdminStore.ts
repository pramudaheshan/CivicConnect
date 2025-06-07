import { create } from "zustand";
import type { Product, Order, User } from "../types";
import { products as initialProducts } from "../data/products";

interface AdminState {
  products: Product[];
  orders: Order[];
  users: User[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  deleteUser: (userId: string) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  products: initialProducts,
  orders: [
    {
      id: "1",
      userId: "1",
      items: [
        {
          id: 1,
          name: "Sustainable Peace Journal",
          quantity: 2,
          price: 24.99,
          description: "",
          image: "",
          category: "",
          rating: 4.8,
        },
      ],
      total: 49.98,
      status: "delivered",
      createdAt: "2024-03-15",
    },
  ],
  users: [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      joinDate: "2024-02-01",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      joinDate: "2024-02-15",
    },
  ],
  addProduct: (product) =>
    set((state) => ({
      products: [
        ...state.products,
        { ...product, id: state.products.length + 1 },
      ],
    })),
  updateProduct: (product) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === product.id ? product : p)),
    })),
  deleteProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    })),
  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      ),
    })),
  deleteUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
}));
