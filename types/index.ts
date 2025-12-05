export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  stock: number;
  featured?: boolean;
  createdAt: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  startDate: string;
  endDate: string;
  active: boolean;
  productIds?: string[];
}

export interface Activity {
  id: string;
  type: 'product_added' | 'product_updated' | 'offer_created' | 'order_placed';
  description: string;
  timestamp: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

