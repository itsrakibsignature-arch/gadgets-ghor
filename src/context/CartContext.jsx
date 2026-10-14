import React, { createContext, useContext, useState, useEffect } from 'react';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('gadgets_ghor_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('gadgets_ghor_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Past Orders
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('gadgets_ghor_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [directCheckoutItem, setDirectCheckoutItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('featured');
  const [deliveryZone, setDeliveryZone] = useState('inside_dhaka'); // 'inside_dhaka' (70) or 'outside_dhaka' (130)

  // Save cart
  useEffect(() => {
    localStorage.setItem('gadgets_ghor_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save wishlist
  useEffect(() => {
    localStorage.setItem('gadgets_ghor_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Save orders
  useEffect(() => {
    localStorage.setItem('gadgets_ghor_orders', JSON.stringify(orders));
  }, [orders]);

  // Show temporary toast notification
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Add to Cart
  const addToCart = (product, quantity = 1, selectedColor = null) => {
    const color = selectedColor || (product.colors && product.colors[0]) || 'Standard';
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id && item.color === color);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          category: product.category,
          color,
          quantity
        }];
      }
    });
    showToast(`"${product.name.slice(0, 24)}..." কার্টে যোগ করা হয়েছে!`);
  };

  // Direct Quick Order (Buy Now)
  const openQuickCheckout = (product, quantity = 1, selectedColor = null) => {
    const color = selectedColor || (product.colors && product.colors[0]) || 'Standard';
    setDirectCheckoutItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      color,
      quantity
    });
    setIsCheckoutOpen(true);
  };

  // Remove from Cart
  const removeFromCart = (id, color) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.color === color)));
  };

  // Update Cart Quantity
  const updateQuantity = (id, color, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.color === color) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Toggle Wishlist
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast('উইশলিস্ট থেকে সরানো হয়েছে');
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast('উইশলিস্টে যুক্ত করা হয়েছে');
        return [...prev, product];
      }
    });
  };

  // Calculations
  const activeItems = directCheckoutItem ? [directCheckoutItem] : cartItems;
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const deliveryFee = deliveryZone === 'inside_dhaka' ? 70 : 130;
  
  // Free delivery threshold: 2500 BDT
  const freeDeliveryThreshold = 2500;
  const isFreeDelivery = cartSubtotal >= freeDeliveryThreshold;
  const finalDeliveryFee = isFreeDelivery ? 0 : deliveryFee;
  const cartTotal = cartSubtotal + finalDeliveryFee;

  // Place Order handler
  const placeOrder = (customerData) => {
    const itemsToOrder = directCheckoutItem ? [directCheckoutItem] : [...cartItems];
    const subtotal = itemsToOrder.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const orderDeliveryFee = (subtotal >= freeDeliveryThreshold) ? 0 : (customerData.deliveryZone === 'inside_dhaka' ? 70 : 130);
    
    const newOrder = {
      orderId: `GG-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      customer: customerData,
      items: itemsToOrder,
      subtotal,
      deliveryFee: orderDeliveryFee,
      total: subtotal + orderDeliveryFee,
      status: 'কনফার্মড (Processing)'
    };

    setOrders(prev => [newOrder, ...prev]);
    setCompletedOrder(newOrder);

    // Clear cart if ordered from cart
    if (!directCheckoutItem) {
      clearCart();
    }
    setDirectCheckoutItem(null);
    setIsCheckoutOpen(false);
    return newOrder;
  };

  return (
    <CartContext.Provider value={{
      products: productsData,
      categories: categoriesData,
      cartItems,
      totalCartCount,
      cartSubtotal,
      deliveryZone,
      setDeliveryZone,
      deliveryFee: finalDeliveryFee,
      cartTotal,
      freeDeliveryThreshold,
      isFreeDelivery,
      isCartOpen,
      setIsCartOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      directCheckoutItem,
      setDirectCheckoutItem,
      selectedProduct,
      setSelectedProduct,
      completedOrder,
      setCompletedOrder,
      wishlist,
      toggleWishlist,
      orders,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openQuickCheckout,
      placeOrder,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedSort,
      setSelectedSort,
      toastMessage,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
