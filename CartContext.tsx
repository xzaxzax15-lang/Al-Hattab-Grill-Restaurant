"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '../data/menuData';

interface CartItem {
  product: MenuItem;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartTotal: number;
  tableNumber: string;
  setTableNumber: (num: string) => void;
  sendToWhatsApp: (notes: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [tableNumber, setTableNumber] = useState('');

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    setCartTotal(total);
  }, [cart]);

  const addToCart = (product: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const clearCart = () => setCart([]);

  const sendToWhatsApp = (notes: string) => {
    const restaurantPhone = "966552873632";

    if (!tableNumber.trim()) {
      alert('الرجاء إدخال رقم الطاولة أولاً');
      return;
    }

    if (cart.length === 0) {
      alert('السلة فارغة!');
      return;
    }

    let message = `*طلب جديد من المطعم* 🍽️🔥%0A%0A`;
    message += `*رقم الطاولة:* ${tableNumber}%0A%0A`;

    cart.forEach((item) => {
      message += `• ${item.product.name_ar} (العدد: ${item.quantity}) - السعر: ${item.product.price * item.quantity} ر.س%0A`;
    });

    message += `%0A*المجموع الإجمالي:* ${cartTotal} ر.س💰`;
    if (notes) message += `%0A%0A*ملاحظات العميل:* ${notes}`;

    window.open(`https://wa.me/${restaurantPhone}?text=${message}`, '_blank');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, tableNumber, setTableNumber, sendToWhatsApp }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};