import React, { useState } from 'react';
import { 
  X, 
  User, 
  Package, 
  MapPin, 
  LogOut, 
  Plus, 
  Trash2, 
  Check, 
  Clock, 
  Truck, 
  MessageCircle, 
  Building2, 
  FileText,
  ShieldCheck,
  Receipt
} from 'lucide-react';
import { useAccount } from '../context/AccountContext';
import { Order, Address } from '../types';

export const AccountModal: React.FC = () => {
  const {
    currentUser,
    isAuthenticated,
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
    generateReorderWhatsAppUrl,
  } = useAccount();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regGst, setRegGst] = useState('');
  const [regError, setRegError] = useState('');

  // New address form state
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddrTitle, setNewAddrTitle] = useState('Head Office');
  const [newAddrReceiver, setNewAddrReceiver] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState('');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrLandmark, setNewAddrLandmark] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('New Delhi');
  const [newAddrState, setNewAddrState] = useState('Delhi');
  const [newAddrPincode, setNewAddrPincode] = useState('110001');
  const [newAddrIsDefault, setNewAddrIsDefault] = useState(false);

  // Digital receipt view modal state
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null);

  if (!isAccountModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = login(loginEmail);
    if (!res.success) {
      setLoginError(res.error || 'Login failed');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    const res = register({
      name: regName,
      email: regEmail,
      phone: regPhone,
      companyName: regCompany,
      gstNumber: regGst,
    });
    if (!res.success) {
      setRegError(res.error || 'Registration failed');
    }
  };

  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrReceiver || !newAddrStreet || !newAddrPincode) return;

    addAddress({
      title: newAddrTitle,
      receiverName: newAddrReceiver,
      phone: newAddrPhone || currentUser?.phone || '',
      street: newAddrStreet,
      landmark: newAddrLandmark,
      city: newAddrCity,
      state: newAddrState,
      pincode: newAddrPincode,
      isDefault: newAddrIsDefault,
    });

    setIsAddingAddress(false);
    setNewAddrStreet('');
    setNewAddrLandmark('');
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'proof_pending':
        return (
          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            Proof Review Pending
          </span>
        );
      case 'in_printing':
        return (
          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
            In Offset/Digital Printing
          </span>
        );
      case 'quality_check':
        return (
          <span className="text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
            Finishing & Quality Check
          </span>
        );
      case 'dispatched':
        return (
          <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
            Dispatched via Courier
          </span>
        );
      case 'delivered':
        return (
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            Delivered & Closed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-neutral-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                Shivani Graphics Customer Portal
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {isAuthenticated ? currentUser?.name : 'Customer Account Access'}
              </h2>
            </div>
          </div>
          <button
            onClick={closeAccountModal}
            className="p-2 rounded-full hover:bg-neutral-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        {isAuthenticated ? (
          <div className="flex border-b border-neutral-200 bg-neutral-50 text-xs font-semibold px-4 overflow-x-auto">
            <button
              onClick={() => openAccountModal('profile')}
              className={`py-3 px-4 flex items-center gap-2 cursor-pointer border-b-2 whitespace-nowrap transition-colors ${
                activeAccountTab === 'profile'
                  ? 'border-blue-600 text-blue-600 font-bold bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile & GST</span>
            </button>
            <button
              onClick={() => openAccountModal('orders')}
              className={`py-3 px-4 flex items-center gap-2 cursor-pointer border-b-2 whitespace-nowrap transition-colors ${
                activeAccountTab === 'orders'
                  ? 'border-blue-600 text-blue-600 font-bold bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Order History ({currentUser?.orders.length || 0})</span>
            </button>
            <button
              onClick={() => openAccountModal('addresses')}
              className={`py-3 px-4 flex items-center gap-2 cursor-pointer border-b-2 whitespace-nowrap transition-colors ${
                activeAccountTab === 'addresses'
                  ? 'border-blue-600 text-blue-600 font-bold bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Delivery Addresses ({currentUser?.addresses.length || 0})</span>
            </button>
          </div>
        ) : (
          <div className="flex border-b border-neutral-200 bg-neutral-50 text-xs font-semibold px-4">
            <button
              onClick={() => openAccountModal('login')}
              className={`py-3 px-6 cursor-pointer border-b-2 transition-colors ${
                activeAccountTab === 'login'
                  ? 'border-blue-600 text-blue-600 font-bold bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => openAccountModal('register')}
              className={`py-3 px-6 cursor-pointer border-b-2 transition-colors ${
                activeAccountTab === 'register'
                  ? 'border-blue-600 text-blue-600 font-bold bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Corporate Account
            </button>
          </div>
        )}

        {/* Tab Contents */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 text-xs">
          {/* TAB 1: Profile & Company Details */}
          {isAuthenticated && activeAccountTab === 'profile' && currentUser && (
            <div className="space-y-6">
              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                  <div className="font-bold text-slate-900 text-sm">Customer Profile Information</div>
                  <span className="text-[11px] text-slate-500">Member since {currentUser.createdAt}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Contact Name</label>
                    <div className="text-sm font-semibold text-slate-900">{currentUser.name}</div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Official Email</label>
                    <div className="text-sm font-semibold text-slate-900">{currentUser.email}</div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Primary Telephone</label>
                    <div className="text-sm font-semibold text-slate-900">{currentUser.phone}</div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Company / Firm Name</label>
                    <div className="text-sm font-semibold text-slate-900">
                      {currentUser.companyName || 'Individual Buyer'}
                    </div>
                  </div>
                  {currentUser.gstNumber && (
                    <div className="sm:col-span-2">
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                        GSTIN Number (For Input Tax Credit)
                      </label>
                      <div className="font-mono text-sm font-bold text-blue-700 bg-white px-3 py-1.5 rounded border border-neutral-300 inline-block">
                        {currentUser.gstNumber}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* B2B Advantage Callout */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-blue-900">Active B2B Print Account Benefits</div>
                  <p className="text-blue-700 text-[11px] mt-0.5 leading-relaxed">
                    All your future print requests from the catalog will automatically include your verified GSTIN and default Delhi NCR delivery address in the WhatsApp order routing.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  onClick={logout}
                  className="px-4 py-2 text-rose-600 hover:bg-rose-50 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-rose-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out of Account</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Order History */}
          {isAuthenticated && activeAccountTab === 'orders' && currentUser && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Past & Active Orders</h3>
                <span className="text-slate-500 text-[11px]">
                  Click "Re-Order" to instantly send repeat print specs to WhatsApp
                </span>
              </div>

              {currentUser.orders.length > 0 ? (
                <div className="space-y-4">
                  {currentUser.orders.map((order) => {
                    const item = order.items[0];
                    return (
                      <div
                        key={order.id}
                        className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5 shadow-2xs space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100">
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-sm text-slate-900">
                              {order.orderNumber}
                            </span>
                            <span className="text-slate-400">·</span>
                            <span className="text-slate-500 text-xs">{order.date}</span>
                          </div>
                          <div>{getStatusBadge(order.status)}</div>
                        </div>

                        <div className="space-y-2">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between items-start gap-4">
                              <div>
                                <div className="font-bold text-slate-900 text-xs sm:text-sm">
                                  {it.productName}
                                </div>
                                <div className="text-[11px] text-slate-500 mt-0.5">
                                  Qty: {it.quantity} · {it.material} · {it.finish}
                                </div>
                              </div>
                              <div className="font-bold text-slate-900 tabular-nums text-right">
                                ₹{it.totalPrice.toLocaleString('en-IN')}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 bg-neutral-50 -mx-4 -mb-4 p-3 rounded-b-xl">
                          <div className="text-[11px] text-slate-600">
                            Total: <strong className="text-slate-900 text-xs">₹{order.totalAmount.toLocaleString('en-IN')}</strong> (Incl. GST)
                            {order.trackingNumber && (
                              <span className="ml-2 text-indigo-600 font-medium">
                                Tracking: {order.trackingNumber}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setReceiptOrder(order)}
                              className="px-3 py-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-100 text-slate-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                            >
                              <Receipt className="w-3.5 h-3.5" />
                              <span>Receipt</span>
                            </button>

                            <a
                              href={generateReorderWhatsAppUrl(order)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <MessageCircle className="w-3.5 h-3.5 fill-white" />
                              <span>Re-Order on WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center bg-neutral-50 rounded-xl border border-neutral-200">
                  <Package className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <div className="font-bold text-slate-800">No print orders recorded yet</div>
                  <p className="text-slate-500 text-xs mt-1">
                    When you order from the product catalog or calculator, orders will appear here for fast 1-click repeat reordering!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Saved Delivery Addresses */}
          {isAuthenticated && activeAccountTab === 'addresses' && currentUser && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Saved Delivery Addresses</h3>
                  <p className="text-[11px] text-slate-500">Fast dispatch to your Delhi NCR facilities and branches</p>
                </div>
                {!isAddingAddress && (
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                )}
              </div>

              {/* Add Address Form */}
              {isAddingAddress && (
                <form onSubmit={handleAddAddressSubmit} className="bg-neutral-50 p-4 rounded-xl border border-blue-200 space-y-3">
                  <div className="font-bold text-slate-900 text-xs">New Delivery Destination</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Location Label</label>
                      <input
                        type="text"
                        value={newAddrTitle}
                        onChange={(e) => setNewAddrTitle(e.target.value)}
                        placeholder="e.g. Okhla Warehouse / Noida Office"
                        className="w-full text-xs p-2 bg-white rounded border border-neutral-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Receiver Name</label>
                      <input
                        type="text"
                        value={newAddrReceiver}
                        onChange={(e) => setNewAddrReceiver(e.target.value)}
                        placeholder="Full Name of Receiver"
                        className="w-full text-xs p-2 bg-white rounded border border-neutral-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Receiver Phone</label>
                      <input
                        type="text"
                        value={newAddrPhone}
                        onChange={(e) => setNewAddrPhone(e.target.value)}
                        placeholder="+91-98XXXXXXXX"
                        className="w-full text-xs p-2 bg-white rounded border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">City / Region</label>
                      <input
                        type="text"
                        value={newAddrCity}
                        onChange={(e) => setNewAddrCity(e.target.value)}
                        className="w-full text-xs p-2 bg-white rounded border border-neutral-300"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Street Address & Unit</label>
                      <input
                        type="text"
                        value={newAddrStreet}
                        onChange={(e) => setNewAddrStreet(e.target.value)}
                        placeholder="Plot / Flat / Street Name"
                        className="w-full text-xs p-2 bg-white rounded border border-neutral-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Landmark</label>
                      <input
                        type="text"
                        value={newAddrLandmark}
                        onChange={(e) => setNewAddrLandmark(e.target.value)}
                        placeholder="Near Metro Station..."
                        className="w-full text-xs p-2 bg-white rounded border border-neutral-300"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Pincode</label>
                      <input
                        type="text"
                        value={newAddrPincode}
                        onChange={(e) => setNewAddrPincode(e.target.value)}
                        placeholder="110001"
                        className="w-full text-xs p-2 bg-white rounded border border-neutral-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                      <input
                        type="checkbox"
                        checked={newAddrIsDefault}
                        onChange={(e) => setNewAddrIsDefault(e.target.checked)}
                        className="rounded text-blue-600"
                      />
                      <span>Set as Default Delivery Address</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="px-3 py-1.5 text-slate-600 hover:bg-neutral-200 rounded text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-blue-600 text-white rounded font-bold text-xs hover:bg-blue-700"
                      >
                        Save Address
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Address List */}
              <div className="space-y-3">
                {currentUser.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-4 rounded-xl border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      addr.isDefault
                        ? 'border-blue-500 bg-blue-50/30'
                        : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{addr.title}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                            Default Address
                          </span>
                        )}
                      </div>
                      <div className="text-slate-700 mt-1">
                        <strong>{addr.receiverName}</strong> · {addr.phone}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        {addr.street}, {addr.landmark ? `${addr.landmark}, ` : ''}{addr.city}, {addr.state} - {addr.pincode}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {!addr.isDefault && (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="px-2.5 py-1 text-xs text-blue-600 hover:bg-blue-50 border border-blue-200 rounded font-semibold cursor-pointer"
                        >
                          Make Default
                        </button>
                      )}
                      <button
                        onClick={() => removeAddress(addr.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete Address"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Login Form (When Logged Out) */}
          {!isAuthenticated && activeAccountTab === 'login' && (
            <div className="max-w-md mx-auto space-y-6 py-4">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Sign In to Shivani Graphics</h3>
                <p className="text-xs text-slate-500">Access saved delivery locations and print re-order history.</p>
              </div>

              {loginError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="rajesh.sharma@delhicorp.in"
                    className="w-full text-xs p-3 rounded-lg border border-neutral-300 focus:border-blue-600 outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              </form>

              {/* Fast 1-Click Demo Account Access */}
              <div className="pt-4 border-t border-neutral-200">
                <div className="text-center text-[11px] text-slate-500 mb-2">
                  Want to quickly test orders, addresses & re-orders?
                </div>
                <button
                  onClick={loginDemoUser}
                  className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-slate-800 rounded-lg font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 border border-neutral-300"
                >
                  <span>1-Click Test Demo Account (Rajesh Sharma - Delhi)</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: Register Form (When Logged Out) */}
          {!isAuthenticated && activeAccountTab === 'register' && (
            <div className="max-w-lg mx-auto space-y-5 py-2">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Create Corporate Buyer Account</h3>
                <p className="text-xs text-slate-500">Save delivery branches, track bulk print jobs, and get GST credit.</p>
              </div>

              {regError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  {regError}
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Vikas Gupta"
                      className="w-full text-xs p-2.5 rounded-lg border border-neutral-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+91-98XXXXXXXX"
                      className="w-full text-xs p-2.5 rounded-lg border border-neutral-300"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">Official Email Address *</label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="vikas@company.in"
                      className="w-full text-xs p-2.5 rounded-lg border border-neutral-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Company / Firm Name</label>
                    <input
                      type="text"
                      value={regCompany}
                      onChange={(e) => setRegCompany(e.target.value)}
                      placeholder="e.g. Gupta Retailers Delhi"
                      className="w-full text-xs p-2.5 rounded-lg border border-neutral-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">GSTIN (Optional)</label>
                    <input
                      type="text"
                      value={regGst}
                      onChange={(e) => setRegGst(e.target.value)}
                      placeholder="07AAAAA0000A1Z5"
                      className="w-full text-xs p-2.5 rounded-lg border border-neutral-300"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer mt-2"
                >
                  Create Account & Start Ordering
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Digital Receipt Overlay Modal */}
        {receiptOrder && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs z-20 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 border border-neutral-200 shadow-2xl">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                <div className="font-extrabold text-slate-900 font-display text-sm">
                  SHIVANI GRAPHICS · DIGITAL SLIP
                </div>
                <button
                  onClick={() => setReceiptOrder(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Order ID:</span>
                  <span className="font-mono font-bold">{receiptOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date:</span>
                  <span>{receiptOrder.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery Status:</span>
                  <span className="font-semibold text-emerald-600 uppercase">{receiptOrder.status}</span>
                </div>
              </div>

              <div className="border-t border-b border-neutral-100 py-3 space-y-2 text-xs">
                {receiptOrder.items.map((it, i) => (
                  <div key={i} className="flex justify-between">
                    <div>
                      <div className="font-bold text-slate-800">{it.productName}</div>
                      <div className="text-[10px] text-slate-500">Qty: {it.quantity} · {it.material}</div>
                    </div>
                    <div className="font-bold tabular-nums">₹{it.totalPrice}</div>
                  </div>
                ))}
                <div className="pt-2 flex justify-between font-bold text-slate-900 text-sm">
                  <span>Total Amount Paid:</span>
                  <span className="tabular-nums">₹{receiptOrder.totalAmount}</span>
                </div>
              </div>

              <button
                onClick={() => setReceiptOrder(null)}
                className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Close Receipt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
