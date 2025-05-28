import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  spiciness: 'no' | 'medium' | 'spicy';
  sauce: 'garlic' | 'yogurt' | 'chili' | 'tahini' | 'none';
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number, spiciness: string, sauce: string) => void;
  updateQuantity: (id: number, quantity: number, spiciness: string, sauce: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (newItem: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => 
        item.id === newItem.id && 
        item.spiciness === newItem.spiciness && 
        item.sauce === newItem.sauce
      );

      if (existingItem) {
        return currentItems.map(item =>
          item === existingItem
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }

      return [...currentItems, newItem];
    });
  };

  const removeItem = (id: number, spiciness: string, sauce: string) => {
    setItems(items => items.filter(item => 
      !(item.id === id && item.spiciness === spiciness && item.sauce === sauce)
    ));
  };

  const updateQuantity = (id: number, quantity: number, spiciness: string, sauce: string) => {
    setItems(items => {
      if (quantity <= 0) {
        return items.filter(item => 
          !(item.id === id && item.spiciness === spiciness && item.sauce === sauce)
        );
      }
      
      return items.map(item =>
        (item.id === id && item.spiciness === spiciness && item.sauce === sauce)
          ? { ...item, quantity }
          : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};