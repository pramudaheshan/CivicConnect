import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Users as UsersIcon,
  DollarSign,
  TrendingUp,
  Search,
  Edit,
  Trash,
  X,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useAdminStore } from "../store/useAdminStore";
import type { Product, User, Order } from "../types";

// If your types differ, adjust accordingly
type ProductData = Product;
type UserData = User;
type OrderData = Order;

export default function AdminPage() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  // Zustand admin store
  const {
    products,
    users,
    orders,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchUsers,
    updateUser,
    deleteUser,
    // Optionally: fetchOrders, updateOrderStatus, etc.
  } = useAdminStore();

  // UI state
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "products" | "orders" | "users"
  >("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(
    null
  );
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  // Auth guard
  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    } else if (!user || user.role !== "admin") {
      navigate("/profile", { replace: true });
    }
    // eslint-disable-next-line
  }, [token, user, navigate]);

  // Fetch data from backend on mount
  useEffect(() => {
    fetchProducts();
    fetchUsers();
    // Optionally: fetchOrders();
    // eslint-disable-next-line
  }, []);

  // Filtering helpers (adjust as needed)
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      users
        .find((u) => u.id === order.userId)
        ?.name?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Dashboard stats
  const stats = [
    {
      icon: <Package className="h-6 w-6" />,
      label: "Total Products",
      value: products.length,
    },
    {
      icon: <UsersIcon className="h-6 w-6" />,
      label: "Total Users",
      value: users.length,
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      label: "Revenue",
      value:
        "$" +
        orders
          .reduce((sum, order) => sum + (order.total || 0), 0)
          .toLocaleString("en-US", { minimumFractionDigits: 2 }),
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      label: "Orders",
      value: orders.length,
    },
  ];

  // Product CRUD handlers
  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId);
      // fetchProducts(); // Zustand auto-updates state
    }
  };
  const handleEditProduct = (product: ProductData) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const productData: Omit<ProductData, "id"> = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      price: parseFloat(formData.get("price") as string),
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      rating: parseFloat(formData.get("rating") as string),
    };
    if (editingProduct) {
      await updateProduct({ ...productData, id: editingProduct.id });
    } else {
      await addProduct(productData);
    }
    setShowProductModal(false);
    setEditingProduct(null);
  };

  // User handlers
  const handleEditUser = (user: UserData) => {
    setEditingUser(user);
    setShowUserModal(true);
  };
  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedUser: UserData = {
      ...editingUser,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as "user" | "admin",
      joinDate: editingUser.joinDate,
    };
    await updateUser(updatedUser);
    setShowUserModal(false);
    setEditingUser(null);
  };
  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
      // fetchUsers(); // Zustand auto-updates state
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                {stat.icon}
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {stat.value}
              </span>
            </div>
            <p className="mt-2 text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="flex border-b">
          {[
            { tab: "dashboard", label: "Dashboard" },
            { tab: "products", label: "Products" },
            { tab: "orders", label: "Orders" },
            { tab: "users", label: "Users" },
          ].map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab as any)}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === item.tab
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {filteredOrders.slice(0, 10).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">
                      {order.items.map((item) => item.name).join(", ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total}</p>
                    <p className="text-sm text-gray-500">{order.createdAt}</p>
                  </div>
                </div>
              ))}
              {filteredOrders.length === 0 && (
                <div className="text-gray-500 text-center py-6">
                  No orders found.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Products</h2>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowProductModal(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Product
              </button>
            </div>
            <div className="overflow-x-auto mb-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Price</th>
                    <th className="text-left py-3 px-4">Rating</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">{product.category}</td>
                      <td className="py-3 px-4">${product.price}</td>
                      <td className="py-3 px-4">{product.rating}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="p-1 text-blue-600 hover:text-blue-700"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-1 text-red-600 hover:text-red-700"
                          >
                            <Trash className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-gray-500"
                      >
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Total</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3 px-4">#{order.id}</td>
                      <td className="py-3 px-4">
                        {users.find((u) => u.id === order.userId)?.name ||
                          "Unknown"}
                      </td>
                      <td className="py-3 px-4">${order.total}</td>
                      <td className="py-3 px-4">{order.status}</td>
                      <td className="py-3 px-4">{order.createdAt}</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-700">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-6 text-gray-500"
                      >
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Role</th>
                    <th className="text-left py-3 px-4">Join Date</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">{user.role}</td>
                      <td className="py-3 px-4">{user.joinDate}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-1 text-blue-600 hover:text-blue-700"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1 text-red-600 hover:text-red-700"
                          >
                            <Trash className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-gray-500"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40"
          aria-modal="true"
          role="dialog"
        >
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg relative z-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => {
                  setShowProductModal(false);
                  setEditingProduct(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleProductSubmit} className="space-y-2 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingProduct?.name}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  defaultValue={editingProduct?.category}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  defaultValue={editingProduct?.price}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editingProduct?.description}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  defaultValue={editingProduct?.image}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <input
                  type="number"
                  name="rating"
                  step="0.1"
                  min="0"
                  max="5"
                  defaultValue={editingProduct?.rating}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && editingUser && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40"
          aria-modal="true"
          role="dialog"
        >
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg relative z-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit User</h3>
              <button
                onClick={() => {
                  setShowUserModal(false);
                  setEditingUser(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleUserSubmit} className="space-y-2 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingUser?.name}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editingUser?.email}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  defaultValue={editingUser?.role}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Update User
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
