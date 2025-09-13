import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Pedido realizado com sucesso!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Seu pedido foi confirmado e está sendo preparado com muito carinho.
          </p>

          {/* Order Info */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informações do Pedido
            </h2>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Número do pedido:</span>
                <span className="font-medium">#{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600">Preparando</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tempo estimado:</span>
                <span className="font-medium">30 minutos</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-2">
              O que acontece agora?
            </h3>
            <ul className="text-sm text-blue-800 space-y-1 text-left">
              <li>• Seus cupcakes estão sendo preparados com ingredientes frescos</li>
              <li>• Você receberá uma notificação quando estiverem prontos</li>
              <li>• Nossa equipe sairá para entrega em até 30 minutos</li>
              <li>• Você pode acompanhar o status em "Meu Perfil"</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Fazer Novo Pedido
            </Link>
            
            <Link
              to="/profile"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Ver Meus Pedidos
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Precisa de ajuda? Entre em contato conosco:
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-600">
              <span>📞 (11) 99999-9999</span>
              <span>✉️ contato@lumierecupcakes.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
