import React, { useState } from 'react';
import OrderModal from './OrderModal';

interface MenuItemProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ id, name, description, price, image, category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-48">
          <img 
            src={image} 
            alt={name} 
            className={`absolute inset-0 w-full h-full ${
              category === 'drinks' ? 'object-contain p-4' : 'object-cover'
            }`}
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-lg font-bold text-darkBlue flex-1">{name}</h3>
            <span className="text-base font-bold text-terracotta whitespace-nowrap">
              €{price.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-gray-600 flex-1">
            {description}
          </p>
        </div>
      </div>

      {isModalOpen && (
        <OrderModal
          item={{ id, name, price, category }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default MenuItem;