import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder deve ser usado dentro de OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Carregar pedidos do localStorage ao inicializar
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    // Salvar pedidos no localStorage sempre que mudar
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = (cartItems, deliveryAddress, paymentMethod) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!user) {
          reject(new Error('Usuário não logado'));
          return;
        }

        const newOrder = {
          id: `order_${Date.now()}`,
          userId: user.id,
          items: cartItems,
          totalPrice: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
          deliveryAddress,
          paymentMethod,
          status: 'preparando',
          createdAt: new Date().toISOString(),
          estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutos
        };

        setOrders(prevOrders => [newOrder, ...prevOrders]);
        resolve(newOrder);
      }, 1000);
    });
  };

  const getUserOrders = () => {
    if (!user) return [];
    return orders.filter(order => order.userId === user.id);
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const value = {
    orders,
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
