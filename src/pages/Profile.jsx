import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useOrder } from '../contexts/OrderContext';

const Profile = () => {
  const { user } = useAuth();
  const { getUserOrders } = useOrder();

  const userOrders = getUserOrders();

  const getStatusColor = (status) => {
    switch (status) {
      case 'preparando':
        return 'text-yellow-600 bg-yellow-100';
      case 'saiu_entrega':
        return 'text-blue-600 bg-blue-100';
      case 'entregue':
        return 'text-green-600 bg-green-100';
      case 'cancelado':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'preparando':
        return 'Preparando';
      case 'saiu_entrega':
        return 'Saiu para entrega';
      case 'entregue':
        return 'Entregue';
      case 'cancelado':
        return 'Cancelado';
      default:
        return 'Desconhecido';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Olá, {user?.name}!
              </h1>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-500">
                Membro desde {new Date(user?.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Meus Pedidos
            </h2>
            <p className="text-gray-600 mt-1">
              Acompanhe o histórico dos seus pedidos
            </p>
          </div>

          {userOrders.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum pedido encontrado
              </h3>
              <p className="text-gray-600 mb-6">
                Que tal fazer seu primeiro pedido de cupcakes?
              </p>
              <Link
                to="/catalog"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                Ver Catálogo
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {userOrders.map((order) => (
                <div key={order.id} className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          Pedido #{order.id.slice(-8)}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        Realizado em {formatDate(order.createdAt)}
                      </p>
                      
                      {order.estimatedDelivery && (
                        <p className="text-sm text-gray-600 mb-3">
                          Entrega estimada: {formatDate(order.estimatedDelivery)}
                        </p>
                      )}

                      {/* Order Items */}
                      <div className="space-y-2 mb-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {item.name} x{item.quantity}
                            </span>
                            <span className="font-medium">
                              R$ {(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Delivery Address */}
                      {order.deliveryAddress && (
                        <div className="text-sm text-gray-600">
                          <strong>Endereço:</strong> {order.deliveryAddress.street}, {order.deliveryAddress.number}
                          {order.deliveryAddress.complement && `, ${order.deliveryAddress.complement}`}
                          <br />
                          {order.deliveryAddress.neighborhood}, {order.deliveryAddress.city} - {order.deliveryAddress.state}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 lg:mt-0 lg:ml-6 text-right">
                      <div className="text-lg font-bold text-primary-600">
                        R$ {order.totalPrice.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {order.paymentMethod === 'pix' && 'Pagamento via PIX'}
                        {order.paymentMethod === 'credit' && 'Cartão de Crédito'}
                        {order.paymentMethod === 'debit' && 'Cartão de Débito'}
                        {order.paymentMethod === 'cash' && 'Dinheiro'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Section */}
        {userOrders.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-2xl font-bold text-primary-600 mb-2">
                {userOrders.length}
              </div>
              <div className="text-gray-600">
                {userOrders.length === 1 ? 'Pedido realizado' : 'Pedidos realizados'}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-2xl font-bold text-primary-600 mb-2">
                {userOrders.reduce((total, order) => total + order.items.reduce((sum, item) => sum + item.quantity, 0), 0)}
              </div>
              <div className="text-gray-600">Cupcakes pedidos</div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-2xl font-bold text-primary-600 mb-2">
                R$ {userOrders.reduce((total, order) => total + order.totalPrice, 0).toFixed(2)}
              </div>
              <div className="text-gray-600">Total gasto</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
