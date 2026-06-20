import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { settingsService } from '../services/api';
import { Link } from 'react-router-dom';

export const Cart: FC = () => {
  const { items, removeItem, updateQuantity, getTotalAmount, getTotalItems } = useCart();
  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    settingsService.get()
      .then((settings) => setDeliveryFee(settings.deliveryFee))
      .catch((err) => console.error('Failed to load delivery fee:', err));
  }, []);

  const itemsTotal  = getTotalAmount();
  const totalAmount = itemsTotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
          <div className="bg-surface2 rounded-3xl shadow-xl p-10 text-center card-border">
            <p className="text-gray-400 mb-4">Your cart is empty</p>
            <Link to="/menu" className="btn-primary inline-block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2">

            {/* ── Desktop table (hidden on mobile) ── */}
            <div className="hidden md:block overflow-hidden rounded-3xl border border-white/10 shadow-xl bg-surface2">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-4 py-4 text-sm text-gray-300">Product</th>
                    <th className="px-4 py-4 text-sm text-gray-300">Size</th>
                    <th className="px-4 py-4 text-sm text-gray-300">Price</th>
                    <th className="px-4 py-4 text-sm text-gray-300">Quantity</th>
                    <th className="px-4 py-4 text-sm text-gray-300">Subtotal</th>
                    <th className="px-4 py-4 text-sm text-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={`${item.productId}-${item.type}`} className="border-b border-white/10">
                      <td className="px-4 py-4 text-sm text-white">{item.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-300 capitalize">{item.type}</td>
                      <td className="px-4 py-4 text-sm text-brand">₹{item.price}</td>
                      <td className="px-4 py-4">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.productId, item.type, parseInt(e.target.value))
                          }
                          className="w-20 rounded-xl border border-white/10 bg-black/60 px-2 py-2 text-white"
                        />
                      </td>
                      <td className="px-4 py-4 text-sm text-white">₹{item.price * item.quantity}</td>
                      <td className="px-4 py-4 text-sm">
                        <button
                          onClick={() => removeItem(item.productId, item.type)}
                          className="text-red-400 hover:text-red-500 font-medium"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Mobile cards (hidden on desktop) ── */}
            <div className="md:hidden space-y-3">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.type}`}
                  className="rounded-2xl border border-white/10 bg-surface2 p-4"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-base leading-snug truncate">
                        {item.name}
                      </h3>
                      <p className="text-gray-400 text-xs capitalize mt-0.5">{item.type}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.type)}
                      className="shrink-0 w-8 h-8 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                      aria-label="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.type, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 rounded-lg bg-black/60 border border-white/10 text-white flex items-center justify-center hover:border-brand/50 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-white font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.type, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-black/60 border border-white/10 text-white flex items-center justify-center hover:border-brand/50 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-500">₹{item.price} each</p>
                      <p className="text-brand font-bold text-base">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Order Summary */}
          <div className="rounded-3xl border border-white/10 bg-surface2 p-6 shadow-xl h-fit card-border">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-300 text-sm">
                <span>Total Items:</span>
                <span className="font-semibold">{getTotalItems()}</span>
              </div>
              <div className="flex justify-between text-gray-300 text-sm">
                <span>Subtotal</span>
                <span>₹{itemsTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300 text-sm">
                <span>Delivery Fee</span>
                <span>{deliveryFee > 0 ? `₹${deliveryFee.toFixed(2)}` : 'Free'}</span>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between text-lg font-bold text-white">
                <span>Total Amount:</span>
                <span className="text-brand">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout" className="btn-primary block text-center">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};