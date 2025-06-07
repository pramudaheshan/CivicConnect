import create from "zustand";

interface User {
  notifications: any;
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  // add other fields if needed
}

interface AuthState {
  isAuthenticated: any;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,

  login: async (email, password) => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }

    const data = await res.json();
    set({ isAuthenticated: true, user: data.user, token: data.token });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  },

  register: async (name, email, password) => {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Registration failed");
    }

    const data = await res.json();
    set({ isAuthenticated: true, user: data.user, token: data.token });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  },

  logout: () => {
    set({ isAuthenticated: false, user: null, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
}));
