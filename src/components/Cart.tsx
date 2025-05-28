import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { X, ShoppingCart } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { t } = useLanguage();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    pickupTime?: string;
  }>({});

  // Calculate minimum pickup time (45 minutes from now)
  const getMinPickupTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 45);
    // Format the date to local timezone
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const validateForm = () => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
      pickupTime?: string;
    } = {};

    if (!firstName.trim()) {
      newErrors.firstName = t('order.required');
    }

    if (!lastName.trim()) {
      newErrors.lastName = t('order.required');
    }

    if (!pickupTime) {
      newErrors.pickupTime = t('order.required');
    } else {
      const selectedTime = new Date(pickupTime).getTime();
      const minTime = new Date(getMinPickupTime()).getTime();
      const now = new Date().getTime();

      if (selectedTime < now) {
        newErrors.pickupTime = t('order.invalidTime');
      } else if (selectedTime < minTime) {
        newErrors.pickupTime = t('order.tooEarly');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    if (!firstName.trim() || !lastName.trim() || !pickupTime) {
      return false;
    }

    const selectedTime = new Date(pickupTime).getTime();
    const minTime = new Date(getMinPickupTime()).getTime();
    const now = new Date().getTime();

    if (selectedTime < now || selectedTime < minTime) {
      return false;
    }

    return true;
  };

  const handleOrder = () => {
    if (!validateForm()) {
      return;
    }

    const message = encodeURIComponent(
      `Hello! I would like to order:\n\n${
        items.map(item => 
          `${item.quantity}x ${item.name}\n` +
          `Spiciness: ${item.spiciness}\n` +
          `Sauce: ${item.sauce}\n`
        ).join('\n')
      }\nTotal: €${total.toFixed(2)}\n\n` +
      `Customer: ${firstName} ${lastName}\n` +
      `Pickup Time: ${new Date(pickupTime).toLocaleString()}\n\n` +
      `This is a pickup order from Augusta Deglava iela 69-k-4.`
    );
    
    window.open(`https://wa.me/37125699303?text=${message}`, '_blank');
    clearCart();
    onClose();
  };

  const handlePickupTimeClick = () => {
    if (!pickupTime) {
      setPickupTime(getMinPickupTime());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center">
            <ShoppingCart className="mr-2" />
            <h2 className="text-xl font-bold">{t('cart.title')}</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              {t('cart.empty')}
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map((item, index) => (
                  <div key={`${item.id}-${item.spiciness}-${item.sauce}-${index}`} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {t(`order.spiciness`)}: {t(`order.${item.spiciness}Spicy`)}<br />
                        {t('order.sauce')}: {t(`order.sauces.${item.sauce}`)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-terracotta"
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1), item.spiciness, item.sauce)}
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-terracotta"
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.spiciness, item.sauce)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.spiciness, item.sauce)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t pt-4">
                <h3 className="font-bold text-lg">{t('order.customerDetails')}</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('order.firstName')}
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`w-full border rounded-lg p-2 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('order.lastName')}
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`w-full border rounded-lg p-2 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('order.pickupTime')}
                  </label>
                  <div className="relative">
                    <input
                      type="datetime-local"
                      value={pickupTime}
                      min={getMinPickupTime()}
                      onClick={handlePickupTimeClick}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className={`w-full border rounded-lg p-2 ${errors.pickupTime ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </div>
                  {errors.pickupTime && (
                    <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    {t('order.pickupTimeMin')}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">{t('order.total')}:</span>
              <span className="text-2xl font-bold text-darkBlue">
                €{total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleOrder}
              disabled={!isFormValid()}
              className={`w-full py-3 rounded-lg transition-colors ${
                isFormValid()
                  ? 'bg-terracotta text-white hover:bg-terracotta-dark'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {t('order.orderViaWhatsapp')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;