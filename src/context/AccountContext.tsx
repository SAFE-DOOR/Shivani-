import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, Address, Order } from '../types';
import { CONTACT_INFO } from '../data/contact';

interface AccountContextType {
  currentUser: UserAccount | null;
  isAuthenticated: boolean;
  isAccountModalOpen: boolean;
  activeAccountTab: 'profile' | 'orders' | 'addresses' | 'login' | 'register';
  openAccountModal: (tab?: 'profile' | 'orders' | 'addresses' | 'login' | 'register') => void;
  closeAccountModal: () => void;
  login: (email: string, pass?: string) => { success: boolean; error?: string };
  register: (data: { name: string; email: string; phone: string; companyName?: string; gstNumber?: string }) => { success: boolean; error?: string };
  loginDemoUser: () => void;
  logout: () => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
  recordNewOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'date'>) => Order;
  generateReorderWhatsAppUrl: (order: Order) => string;
}

const STORAGE_KEY = 'shivani_graphics_user_account';

const DEMO_USER: UserAccount = {
  id: 'usr_delhi_rajesh_99',
  name: 'Rajesh Sharma',
  email: 'rajesh.sharma@delhicorp.in',
  phone: '+91-9871234567',
  companyName: 'Sharma & Associates Infra Pvt Ltd',
  gstNumber: '07AAACS1234F1Z5',
  createdAt: '2026-01-15',
  addresses: [
    {
      id: 'addr_cp_hq',
      title: 'Headquarters & Accounts',
      receiverName: 'Rajesh Sharma',
      phone: '+91-9871234567',
      street: '402, Statesman House, Barakhamba Road, Connaught Place',
      landmark: 'Near CP Metro Station Gate 3',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110001',
      isDefault: true,
    },
    {
      id: 'addr_okhla_site',
      title: 'Warehouse & Print Delivery',
      receiverName: 'Amit Verma (Site Manager)',
      phone: '+91-9810987654',
      street: 'Plot No. C-44, Phase-II, Okhla Industrial Area',
      landmark: 'Opposite Crown Plaza',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110020',
      isDefault: false,
    },
  ],
  orders: [
    {
      id: 'ord_sg_8821',
      orderNumber: 'SG-2026-8821',
      date: '2026-09-28',
      items: [
        {
          productId: 'prod-visiting-cards-luxury',
          productName: 'Executive Velvet Matte Visiting Cards',
          category: 'Business Stationery',
          quantity: 1000,
          material: '350 GSM Velvet Art Card with Spot UV',
          finish: 'Velvet Soft-Touch + Spot Gloss UV',
          size: '89mm x 54mm',
          unitPrice: 1.95,
          totalPrice: 1950,
        },
      ],
      subtotal: 1950,
      gstAmount: 351,
      totalAmount: 2301,
      status: 'delivered',
      courierName: 'Delhivery Express Local',
      trackingNumber: 'DEL-99201948',
      deliveryType: 'Delhi NCR Express',
      paymentStatus: 'Advance Paid',
      whatsappReferenceText: 'Order SG-2026-8821 (1000 Visiting Cards)',
      deliveryAddress: {
        id: 'addr_cp_hq',
        title: 'Headquarters & Accounts',
        receiverName: 'Rajesh Sharma',
        phone: '+91-9871234567',
        street: '402, Statesman House, Barakhamba Road, Connaught Place',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110001',
        isDefault: true,
      },
    },
    {
      id: 'ord_sg_9044',
      orderNumber: 'SG-2026-9044',
      date: '2026-10-02',
      items: [
        {
          productId: 'prod-rollup-standees',
          productName: 'Aluminium Base Roll-Up Standees',
          category: 'Marketing & Promotional',
          quantity: 4,
          material: 'Eco-Solvent Satin Matte Vinyl With Lamination',
          finish: 'Matte Anti-Glare Lamination',
          size: '3 ft x 6 ft',
          unitPrice: 780,
          totalPrice: 3120,
        },
      ],
      subtotal: 3120,
      gstAmount: 561.6,
      totalAmount: 3681.6,
      status: 'in_printing',
      courierName: 'Shivani Logistics Rider',
      deliveryType: 'Delhi NCR Express',
      paymentStatus: 'Advance Paid',
      whatsappReferenceText: 'Order SG-2026-9044 (4 Roll-up Standees)',
      deliveryAddress: {
        id: 'addr_okhla_site',
        title: 'Warehouse & Print Delivery',
        receiverName: 'Amit Verma (Site Manager)',
        phone: '+91-9810987654',
        street: 'Plot No. C-44, Phase-II, Okhla Industrial Area',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110020',
        isDefault: false,
      },
    },
  ],
};

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [activeAccountTab, setActiveAccountTab] = useState<'profile' | 'orders' | 'addresses' | 'login' | 'register'>('profile');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      } else {
        // Pre-seed demo user into localStorage for effortless testing
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_USER));
        setCurrentUser(DEMO_USER);
      }
    } catch {
      setCurrentUser(DEMO_USER);
    }
  }, []);

  // Save changes
  const saveUser = (user: UserAccount | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const openAccountModal = (tab: 'profile' | 'orders' | 'addresses' | 'login' | 'register' = 'profile') => {
    if (!currentUser && (tab === 'profile' || tab === 'orders' || tab === 'addresses')) {
      setActiveAccountTab('login');
    } else {
      setActiveAccountTab(tab);
    }
    setIsAccountModalOpen(true);
  };

  const closeAccountModal = () => {
    setIsAccountModalOpen(false);
  };

  const login = (email: string) => {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid business or personal email address.' };
    }
    // Simulate lookup / create active session
    if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
      return { success: true };
    }
    // Otherwise log in as returning or switch
    const loggedUser: UserAccount = {
      ...DEMO_USER,
      email: email.trim(),
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
    };
    saveUser(loggedUser);
    setActiveAccountTab('profile');
    return { success: true };
  };

  const register = (data: { name: string; email: string; phone: string; companyName?: string; gstNumber?: string }) => {
    if (!data.name || !data.email || !data.phone) {
      return { success: false, error: 'Name, email, and phone number are required.' };
    }
    const newUser: UserAccount = {
      id: `usr_${Date.now()}`,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      companyName: data.companyName?.trim() || '',
      gstNumber: data.gstNumber?.trim() || '',
      createdAt: new Date().toISOString().split('T')[0],
      addresses: [],
      orders: [],
    };
    saveUser(newUser);
    setActiveAccountTab('profile');
    return { success: true };
  };

  const loginDemoUser = () => {
    saveUser(DEMO_USER);
    setActiveAccountTab('profile');
  };

  const logout = () => {
    saveUser(null);
    setActiveAccountTab('login');
  };

  const addAddress = (addrData: Omit<Address, 'id'>) => {
    if (!currentUser) return;
    const newAddr: Address = {
      ...addrData,
      id: `addr_${Date.now()}`,
      isDefault: currentUser.addresses.length === 0 ? true : !!addrData.isDefault,
    };
    let updatedAddrs = [...currentUser.addresses];
    if (newAddr.isDefault) {
      updatedAddrs = updatedAddrs.map((a) => ({ ...a, isDefault: false }));
    }
    updatedAddrs.push(newAddr);
    saveUser({ ...currentUser, addresses: updatedAddrs });
  };

  const removeAddress = (addressId: string) => {
    if (!currentUser) return;
    const updated = currentUser.addresses.filter((a) => a.id !== addressId);
    if (updated.length > 0 && !updated.some((a) => a.isDefault)) {
      updated[0].isDefault = true;
    }
    saveUser({ ...currentUser, addresses: updated });
  };

  const setDefaultAddress = (addressId: string) => {
    if (!currentUser) return;
    const updated = currentUser.addresses.map((a) => ({
      ...a,
      isDefault: a.id === addressId,
    }));
    saveUser({ ...currentUser, addresses: updated });
  };

  const recordNewOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date'>): Order => {
    const orderNumber = `SG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord_${Date.now()}`,
      orderNumber,
      date: new Date().toISOString().split('T')[0],
    };

    if (currentUser) {
      saveUser({
        ...currentUser,
        orders: [newOrder, ...currentUser.orders],
      });
    }
    return newOrder;
  };

  const generateReorderWhatsAppUrl = (order: Order): string => {
    const item = order.items[0];
    const message = `Hello Shivani Graphics Team,\n\nI would like to RE-ORDER my previous order:\n* Previous Order ID: ${order.orderNumber}\n* Product: ${item ? item.productName : 'Custom Print Job'}\n* Quantity: ${item ? item.quantity : 1}\n* Material/Specs: ${item ? `${item.material} (${item.finish})` : 'Same as previous job'}\n* Previous Invoice Total: ₹${order.totalAmount}\n* Delivery Address: ${order.deliveryAddress ? `${order.deliveryAddress.street}, ${order.deliveryAddress.city}` : 'On file'}\n\nPlease confirm print plate availability and estimated turnaround. Thank you!`;
    return `https://wa.me/${CONTACT_INFO.primaryPhoneRaw}?text=${encodeURIComponent(message)}`;
  };

  return (
    <AccountContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAccountModalOpen,
        activeAccountTab,
        openAccountModal,
        closeAccountModal,
        login,
        register,
        loginDemoUser,
        logout,
        addAddress,
        removeAddress,
        setDefaultAddress,
        recordNewOrder,
        generateReorderWhatsAppUrl,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};
