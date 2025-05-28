import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

interface OrderModalProps {
  item: {
    id: number;
    name: string;
    price: number;
    category?: string;
  };
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ item, onClose }) => {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const [spiciness, setSpiciness] = useState<'no' | 'medium' | 'spicy'>('medium');
  const [sauce, setSauce] = useState<'garlic' | 'yogurt' | 'chili' | 'tahini' | 'none'>('garlic');
  const [quantity, setQuantity] = useState(1);

  const isDessert = item.category === 'desserts';
  const isDrink = item.category === 'drinks';
  const showOptions = !isDessert && !isDrink;

  const spicinessOptions = [
    { value: 'no', label: t('order.noSpicy') },
    { value: 'medium', label: t('order.mediumSpicy') },
    { value: 'spicy', label: t('order.spicy') },
  ] as const;

  const sauceOptions = [
    { value: 'garlic', label: t('order.sauces.garlic') },
    { value: 'yogurt', label: t('order.sauces.yogurt') },
    { value: 'chili', label: t('order.sauces.chili') },
    { value: 'tahini', label: t('order.sauces.tahini') },
  ] as const;

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      spiciness: showOptions ? spiciness : 'no',
      sauce: showOptions ? sauce : 'none',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-bold text-darkBlue mb-6">{item.name}</h3>

        <div className="space-y-6">
          {showOptions && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('order.spiciness')}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {spicinessOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`py-2 px-4 rounded-lg border ${
                        spiciness === option.value
                          ? 'bg-terracotta text-white border-terracotta'
                          : 'border-gray-300 hover:border-terracotta'
                      }`}
                      onClick={() => setSpiciness(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('order.sauce')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {sauceOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`py-2 px-4 rounded-lg border ${
                        sauce === option.value
                          ? 'bg-terracotta text-white border-terracotta'
                          : 'border-gray-300 hover:border-terracotta'
                      }`}
                      onClick={() => setSauce(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('order.quantity')}
            </label>
            <div className="flex items-center space-x-4">
              <button
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-terracotta"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="text-xl font-medium">{quantity}</span>
              <button
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-terracotta"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">{t('order.total')}:</span>
              <span className="text-2xl font-bold text-darkBlue">
                €{(item.price * quantity).toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-terracotta text-white py-3 rounded-lg hover:bg-terracotta-dark transition-colors"
            >
              {t('cart.addToCart')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;