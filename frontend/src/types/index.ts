export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  prices: {
    plate: number;
    kg: number;
    halfKg: number;
  };
  available: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  type: 'plate' | 'kg' | 'halfKg';
  image: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  locationLat?: number;
  locationLng?: number;
  locationMapsUrl?: string;
  items: CartItem[];
  totalAmount: number;
  paymentTransactionId: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
}

export interface DashboardData {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalProducts: number;
  totalRevenue: number;
  recentOrders: Order[];
}

export interface Outlet {
  name: string;
  address: string;
}

export interface Settings {
  _id: string;
  deliveryFee: number;
  ownerPhone: string;
  outlets: Outlet[];
  updatedAt: string;
}