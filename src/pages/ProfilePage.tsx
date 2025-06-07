import React, { useEffect, useState } from "react";
import { User, Settings, Package, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

// Types
type OrderItem = {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string | number;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, token, logout } = useAuthStore((state) => ({
    user: state.user,
    token: state.token,
    logout: state.logout,
  }));
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "settings">(
    "profile"
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(false);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      setLoadingOrders(true);
      try {
        const res = await fetch("http://localhost:5000/api/orders/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data.orders ?? []);
      } catch {
        setOrders([]);
      } finally {
        setLoadingOrders(false);
      }
    };
    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab, token]);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    avatar: user?.avatar ?? "",
  });

  // Update profile form when user changes (after login)
  useEffect(() => {
    setProfileForm({
      name: user?.name ?? "",
      email: user?.email ?? "",
      avatar: user?.avatar ?? "",
    });
  }, [user]);

  // Handle profile form input
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit profile changes to backend
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5000/api/user/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profileForm.name,
          email: profileForm.email,
          avatar: profileForm.avatar,
        }),
      });
      if (!res.ok) throw new Error("Profile update failed");
      // Optionally reload user info from backend or update store here
      window.location.reload();
    } catch (err) {
      // TODO: Show error toast
    }
  };

  // Logout button
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Handle not logged in
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-8 rounded shadow text-center">
          <p className="mb-4">You need to log in to view your profile.</p>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-6 h-fit">
          <div className="flex items-center gap-4 pb-6 border-b">
            <img
              src={
                user.avatar ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(user.name)
              }
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">
                {(() => {
                  const [name, domain] = user.email.split("@");
                  if (!domain) return user.email;
                  const maskedName =
                    name.length > 2 ? name.slice(0, 2) + "****" : name + "****";
                  return `${maskedName}@${domain}`;
                })()}
              </p>
            </div>
          </div>

          <nav className="mt-6 space-y-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
                activeTab === "profile"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <User className="h-5 w-5" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
                activeTab === "orders"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Package className="h-5 w-5" />
              Orders
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
                activeTab === "settings"
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Settings className="h-5 w-5" />
              Settings
            </button>
            <button
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
              onClick={handleLogout}
              type="button"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          {activeTab === "profile" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
              <form className="space-y-6" onSubmit={handleProfileSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avatar URL
                  </label>
                  <input
                    type="text"
                    name="avatar"
                    value={profileForm.avatar}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  type="submit"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Order History</h2>
              {loadingOrders ? (
                <p>Loading orders...</p>
              ) : orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Order #{order.id}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.createdAt}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {order.status}
                        </span>
                      </div>
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2"
                        >
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                      <div className="border-t mt-4 pt-4 flex justify-between">
                        <p className="font-semibold">Total</p>
                        <p className="font-semibold">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Password</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Update Password
                    </button>
                  </form>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Notifications</h3>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="rounded text-blue-600"
                        defaultChecked={user.notifications?.orders ?? true}
                        readOnly
                      />
                      <span>Email notifications for orders</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="rounded text-blue-600"
                        defaultChecked={user.notifications?.promotions ?? true}
                        readOnly
                      />
                      <span>Email notifications for promotions</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
