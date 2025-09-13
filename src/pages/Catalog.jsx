import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { cakeTypes, fillings, decorations } from '../data/products';

const Catalog = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCake, setSelectedCake] = useState(null);
  const [selectedFillings, setSelectedFillings] = useState([]);
  const [selectedDecoration, setSelectedDecoration] = useState(null);
  const [customCupcake, setCustomCupcake] = useState(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const maxFillings = 5;

  const handleCakeSelect = (cake) => {
    setSelectedCake(cake);
    setCurrentStep(2);
  };

  const handleFillingToggle = (filling) => {
    setSelectedFillings(prev => {
      const isSelected = prev.find(f => f.id === filling.id);
      if (isSelected) {
        return prev.filter(f => f.id !== filling.id);
      } else if (prev.length < maxFillings) {
        return [...prev, filling];
      }
      return prev;
    });
  };

  const handleDecorationSelect = (decoration) => {
    setSelectedDecoration(decoration);
    setCurrentStep(4);
  };

  const calculateTotal = () => {
    let total = 0;
    if (selectedCake) total += selectedCake.price;
    selectedFillings.forEach(filling => total += filling.price);
    if (selectedDecoration) total += selectedDecoration.price;
    return total;
  };

  const createCustomCupcake = () => {
    if (!selectedCake || !selectedDecoration) return;

    const cupcake = {
      id: `cupcake_${Date.now()}`,
      name: `${selectedCake.name} com ${selectedFillings.length > 0 ? selectedFillings.map(f => f.name).join(', ') + ' e ' : ''}${selectedDecoration.name}`,
      cake: selectedCake,
      fillings: selectedFillings,
      decoration: selectedDecoration,
      price: calculateTotal(),
      quantity: 1,
      custom: true
    };

    setCustomCupcake(cupcake);
  };

  const addToCartHandler = () => {
    if (customCupcake) {
      addToCart(customCupcake);
      navigate('/cart');
    }
  };

  const resetSelection = () => {
    setSelectedCake(null);
    setSelectedFillings([]);
    setSelectedDecoration(null);
    setCustomCupcake(null);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Crie seu Cupcake Personalizado
          </h1>
          <p className="text-lg text-gray-600">
            Siga os passos para criar o cupcake perfeito para você
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-1 ml-4 ${
                    currentStep > step ? 'bg-primary-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 text-sm text-gray-600">
            <span className={currentStep >= 1 ? 'text-primary-600 font-medium' : ''}>Massa</span>
            <span className="mx-4">•</span>
            <span className={currentStep >= 2 ? 'text-primary-600 font-medium' : ''}>Recheio</span>
            <span className="mx-4">•</span>
            <span className={currentStep >= 3 ? 'text-primary-600 font-medium' : ''}>Decoração</span>
            <span className="mx-4">•</span>
            <span className={currentStep >= 4 ? 'text-primary-600 font-medium' : ''}>Resumo</span>
          </div>
        </div>

        {/* Step 1: Cake Selection */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Escolha o tipo de massa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cakeTypes.map((cake) => (
                <div
                  key={cake.id}
                  onClick={() => handleCakeSelect(cake)}
                  className="cursor-pointer border-2 border-gray-200 rounded-lg p-6 hover:border-primary-500 hover:shadow-lg transition-all"
                >
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-500">Imagem do {cake.name}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{cake.name}</h3>
                  <p className="text-gray-600 mb-4">{cake.description}</p>
                  <div className="text-xl font-bold text-primary-600">
                    R$ {cake.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Filling Selection */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Escolha os recheios (até {maxFillings})
              </h2>
              <button
                onClick={() => setCurrentStep(1)}
                className="text-primary-600 hover:text-primary-700"
              >
                ← Voltar
              </button>
            </div>
            
            <div className="mb-4">
              <span className="text-sm text-gray-600">
                Selecionados: {selectedFillings.length}/{maxFillings}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fillings.map((filling) => {
                const isSelected = selectedFillings.find(f => f.id === filling.id);
                const canSelect = selectedFillings.length < maxFillings || isSelected;
                
                return (
                  <div
                    key={filling.id}
                    onClick={() => canSelect && handleFillingToggle(filling)}
                    className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50'
                        : canSelect
                        ? 'border-gray-200 hover:border-primary-500 hover:shadow-lg'
                        : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Imagem do {filling.name}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{filling.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{filling.description}</p>
                    <div className="text-lg font-bold text-primary-600">
                      R$ {filling.price.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setCurrentStep(3)}
                className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Decoration Selection */}
        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Escolha a decoração
              </h2>
              <button
                onClick={() => setCurrentStep(2)}
                className="text-primary-600 hover:text-primary-700"
              >
                ← Voltar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {decorations.map((decoration) => (
                <div
                  key={decoration.id}
                  onClick={() => handleDecorationSelect(decoration)}
                  className="cursor-pointer border-2 border-gray-200 rounded-lg p-4 hover:border-primary-500 hover:shadow-lg transition-all"
                >
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Imagem da {decoration.name}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{decoration.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{decoration.description}</p>
                  <div className="text-lg font-bold text-primary-600">
                    R$ {decoration.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Summary */}
        {currentStep === 4 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Resumo do seu cupcake
              </h2>
              <button
                onClick={() => setCurrentStep(3)}
                className="text-primary-600 hover:text-primary-700"
              >
                ← Voltar
              </button>
            </div>

            <div className="space-y-6">
              {/* Cake */}
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Massa:</h3>
                <div className="flex justify-between items-center">
                  <span>{selectedCake.name}</span>
                  <span className="font-semibold">R$ {selectedCake.price.toFixed(2)}</span>
                </div>
              </div>

              {/* Fillings */}
              {selectedFillings.length > 0 && (
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Recheios:</h3>
                  {selectedFillings.map((filling) => (
                    <div key={filling.id} className="flex justify-between items-center mb-1">
                      <span>{filling.name}</span>
                      <span className="font-semibold">R$ {filling.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Decoration */}
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Decoração:</h3>
                <div className="flex justify-between items-center">
                  <span>{selectedDecoration.name}</span>
                  <span className="font-semibold">R$ {selectedDecoration.price.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-primary-600">R$ {calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex space-x-4">
              <button
                onClick={resetSelection}
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Criar Novo
              </button>
              <button
                onClick={() => {
                  createCustomCupcake();
                  addToCartHandler();
                }}
                className="flex-1 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
