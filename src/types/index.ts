export interface ProductOption {
  label: string;
  value: string;
  priceModifier?: number; // multiplier or adder
}

export interface Product {
  id: string;
  name: string;
  hindiTagline?: string;
  category: string;
  subCategory: string;
  basePrice: number;
  priceUnit: string;
  moq: number; // Minimum Order Quantity
  turnaroundTime: string;
  popular?: boolean;
  b2bHighlight?: string;
  description: string;
  specs: {
    standardSizes: string[];
    materials: string[];
    finishes: string[];
    colorMode: string;
    fileFormatsAccepted: string[];
  };
  features: string[];
  pricingTiers: { qty: number; unitPrice: number }[];
  accentGradient: string;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  itemCount: number;
  iconName: string;
  color: string;
  bgGradient: string;
}

export interface Address {
  id: string;
  title: string; // e.g. "Head Office", "Warehouse", "Branch"
  receiverName: string;
  phone: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  category: string;
  quantity: number;
  material: string;
  finish: string;
  size: string;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
  status: 'proof_pending' | 'in_printing' | 'quality_check' | 'dispatched' | 'delivered';
  courierName?: string;
  trackingNumber?: string;
  deliveryAddress: Address;
  deliveryType: 'Delhi NCR Express' | 'Standard Courier' | 'Store Self-Pickup';
  paymentStatus: 'Advance Paid' | 'COD / Pay on Pickup' | 'Credit Term Approved';
  whatsappReferenceText: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  gstNumber?: string;
  addresses: Address[];
  orders: Order[];
  createdAt: string;
}

export interface QuoteRequest {
  productId: string;
  productName: string;
  quantity: number;
  size: string;
  material: string;
  finish: string;
  estimatedPrice: number;
  notes?: string;
}
