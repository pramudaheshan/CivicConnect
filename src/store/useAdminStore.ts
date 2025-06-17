import { create } from "zustand";
import type { Product, Order, User } from "../types";

// Helper: get token from localStorage or zustand auth store as needed
const getToken = () => localStorage.getItem("token");

interface AdminState {
  products: Product[];
  orders: Order[];
  users: User[];
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  fetchUsers: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  // Add order actions as needed
}

export const useAdminStore = create<AdminState>((set, get) => ({
  products: [],
  orders: [],
  users: [],
  fetchProducts: async () => {
    const res = await fetch("http://localhost:5000/api/product");
    const data = await res.json();
    set({ products: data });
  },
  addProduct: async (product) => {
    const res = await fetch("http://localhost:5000/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const newProduct = await res.json();
    set((state) => ({ products: [...state.products, newProduct] }));
  },
  updateProduct: async (product) => {
    const res = await fetch(`http://localhost:5000/api/product/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const updated = await res.json();
    set((state) => ({
      products: state.products.map((p) => (p.id === updated.id ? updated : p)),
    }));
  },
  deleteProduct: async (productId) => {
    await fetch(`http://localhost:5000/api/product/${productId}`, {
      method: "DELETE",
    });
    set((state) => ({
      products: state.products.filter((p) => p.id !== String(productId)),
    }));
  },
  // --- User-related actions ---
  fetchUsers: async () => {
    const token = getToken();
    const res = await fetch("http://localhost:5000/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    set({
      users: data.map((u: any) => ({
        id: u._id,
        name: u.name,
        email: u.email,
        role: u.role,
        joinDate: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "",
        // Map other fields if needed
      })),
    });
  },
  updateUser: async (user) => {
    const token = getToken();
    const res = await fetch(`http://localhost:5000/api/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    const updated = await res.json();
    set((state) => ({
      users: state.users.map((u) =>
        u.id === updated._id
          ? {
              ...u,
              ...updated,
              id: updated._id,
              joinDate: updated.createdAt
                ? new Date(updated.createdAt).toLocaleDateString()
                : u.joinDate,
            }
          : u
      ),
    }));
  },
  deleteUser: async (userId) => {
    const token = getToken();
    await fetch(`http://localhost:5000/api/user/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    set((state) => ({
      users: state.users.filter((u) => u.id !== userId),
    }));
  },
  // (Add order actions as needed)
}));
