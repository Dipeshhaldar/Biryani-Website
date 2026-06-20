import type { Product, Order, DashboardData, Settings } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }
    const payload = await response.json();
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload.data)) return payload.data;
    if (Array.isArray(payload.products)) return payload.products;
    return [];
  },

  create: async (product: Partial<Product>): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ error: 'Failed to create product' }));
      throw new Error(errorBody.error || 'Failed to create product');
    }
    return response.json();
  },

  uploadImage: async (file: File): Promise<{ url: string }> => {
    const form = new FormData();
    form.append('image', file);
    const response = await fetch(`${API_BASE_URL}/products/upload`, {
      method: 'POST',
      body: form,
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(err.error || 'Upload failed');
    }
    return response.json();
  },

  getById: async (id: string): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return response.json();
  },

  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/products/${id}`, { method: 'DELETE' });
  },
};

export const orderService = {
  create: async (order: Partial<Order>): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    return response.json();
  },

  getAll: async (): Promise<Order[]> => {
    const response = await fetch(`${API_BASE_URL}/orders`);
    return response.json();
  },

  getById: async (id: string): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    return response.json();
  },

  updateStatus: async (id: string, orderStatus: string): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderStatus }),
    });
    return response.json();
  },

  verifyPayment: async (id: string, verified: boolean): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/verify-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ verified }),
    });
    return response.json();
  },
};

export const adminService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ error: 'Login failed' }));
      throw new Error(errorBody.error || 'Invalid credentials');
    }
    return response.json();
  },

  getDashboard: async (): Promise<DashboardData> => {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard`);
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
    return response.json();
  },
};

export const settingsService = {
  get: async (): Promise<Settings> => {
    const response = await fetch(`${API_BASE_URL}/settings`);
    if (!response.ok) {
      throw new Error('Failed to fetch settings');
    }
    return response.json();
  },

  update: async (deliveryFee: number): Promise<Settings> => {
    const response = await fetch(`${API_BASE_URL}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deliveryFee }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: 'Failed to update settings' }));
      throw new Error(err.error || 'Failed to update settings');
    }
    return response.json();
  },
};