import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import MenuItem from './MenuItem';

// Menu data
const menuItems = {
  shawarma: [
    {
      id: 1,
      name: 'menu.items.shawarma.title',
      description: 'menu.items.shawarma.description',
      price: 8.50,
      image: '/images/schwarma.jpeg',
      category: 'shawarma'
    },
    {
      id: 2,
      name: 'menu.items.shawarmaCombo.title',
      description: 'menu.items.shawarmaCombo.description',
      price: 13.50,
      image: '/images/side-view-doner-pita-with-french-fries-fresh-cucumber-tomato_141793-4970.avif',
      category: 'shawarma'
    },
    {
      id: 3,
      name: 'menu.items.shawarma11.title',
      description: 'menu.items.shawarma11.description',
      price: 14.00,
      image: '/images/schwarma1+1.jpeg',
      category: 'shawarma'
    },
    {
      id: 4,
      name: 'menu.items.shawarmaPlate.title',
      description: 'menu.items.shawarmaPlate.description',
      price: 10.00,
      image: '/images/chicken-shawarmin-pitwith-french-fries-ketchup-mayo-lettuce-table_140725-10901.avif',
      category: 'shawarma'
    }
  ],
  specials: [
    {
      id: 5,
      name: 'menu.items.studentSpecial.title',
      description: 'menu.items.studentSpecial.description',
      price: 21.00,
      image: '/images/student special.png',
      category: 'specials'
    },
    {
      id: 6,
      name: 'menu.items.valueMeal.title',
      description: 'menu.items.valueMeal.description',
      price: 18.00,
      image: '/images/value meal.png',
      category: 'specials'
    },
    {
      id: 7,
      name: 'menu.items.lateNightSpecial.title',
      description: 'menu.items.lateNightSpecial.description',
      price: 29.00,
      image: '/images/late night special.png',
      category: 'specials'
    }
  ],
  kebabs: [
    {
      id: 8,
      name: 'menu.items.adanaCombo.title',
      description: 'menu.items.adanaCombo.description',
      price: 17.00,
      image: '/images/adana sashlik combo.jpeg',
      category: 'kebabs'
    },
    {
      id: 9,
      name: 'menu.items.kofteCombo.title',
      description: 'menu.items.kofteCombo.description',
      price: 15.00,
      image: '/images/turkish kofte.jpeg',
      category: 'kebabs'
    },
    {
      id: 10,
      name: 'menu.items.chickenCombo.title',
      description: 'menu.items.chickenCombo.description',
      price: 15.00,
      image: '/images/chicken sashlik.jpeg',
      category: 'kebabs'
    }
  ],
  plates: [
    {
      id: 11,
      name: 'menu.items.adanaPlate.title',
      description: 'menu.items.adanaPlate.description',
      price: 12.00,
      image: '/images/turkish-adana-kebab-serving-plate-with-vegetables-bulgur-lavash-bread_711700-24409.avif',
      category: 'plates'
    },
    {
      id: 12,
      name: 'menu.items.chickenPlate.title',
      description: 'menu.items.chickenPlate.description',
      price: 11.00,
      image: '/images/chicken sashlik.jpeg',
      category: 'plates'
    }
  ],
  wraps: [
    {
      id: 13,
      name: 'menu.items.adana.title',
      description: 'menu.items.adana.description',
      price: 11.00,
      image: '/images/mixed-grilled-foods-with-meat-vegetables_114579-3152.avif',
      category: 'wraps'
    },
    {
      id: 14,
      name: 'menu.items.chickenShashlik.title',
      description: 'menu.items.chickenShashlik.description',
      price: 10.00,
      image: '/images/chicken sashlik.jpeg',
      category: 'wraps'
    },
    {
      id: 15,
      name: 'menu.items.kofte.title',
      description: 'menu.items.kofte.description',
      price: 10.50,
      image: '/images/turkish kofte.jpeg',
      category: 'wraps'
    },
    {
      id: 16,
      name: 'menu.items.tantuni.title',
      description: 'menu.items.tantuni.description',
      price: 12.50,
      image: '/images/tantuni.jpeg',
      category: 'wraps'
    }
  ],
  snacks: [
    {
      id: 17,
      name: 'menu.items.cheeseburger.title',
      description: 'menu.items.cheeseburger.description',
      price: 8.50,
      image: '/images/double cheeseburger.jpeg',
      category: 'snacks'
    },
    {
      id: 18,
      name: 'menu.items.fries.title',
      description: 'menu.items.fries.description',
      price: 4.50,
      image: '/images/french fries.jpeg',
      category: 'snacks'
    },
    {
      id: 19,
      name: 'menu.items.schnitzel.title',
      description: 'menu.items.schnitzel.description',
      price: 4.00,
      image: '/images/chicken schnitzel.jpeg',
      category: 'snacks'
    },
    {
      id: 20,
      name: 'menu.items.wings.title',
      description: 'menu.items.wings.description',
      price: 6.00,
      image: '/images/chicken wings.jpeg',
      category: 'snacks'
    },
    {
      id: 21,
      name: 'menu.items.nuggets.title',
      description: 'menu.items.nuggets.description',
      price: 5.50,
      image: '/images/chicken nuggets.jpeg',
      category: 'snacks'
    }
  ],
  vegetarian: [
    {
      id: 22,
      name: 'menu.items.falafelCombo.title',
      description: 'menu.items.falafelCombo.description',
      price: 13.00,
      image: '/images/falafel.jpeg',
      category: 'vegetarian'
    },
    {
      id: 23,
      name: 'menu.items.falafel.title',
      description: 'menu.items.falafel.description',
      price: 6.50,
      image: '/images/falafel.jpeg',
      category: 'vegetarian'
    },
    {
      id: 24,
      name: 'menu.items.lentilSoup.title',
      description: 'menu.items.lentilSoup.description',
      price: 5.00,
      image: '/images/lentil soup.jpeg',
      category: 'vegetarian'
    }
  ],
  desserts: [
    {
      id: 25,
      name: 'menu.items.baklava.title',
      description: 'menu.items.baklava.description',
      price: 6.80,
      image: '/images/baklava.jpeg',
      category: 'desserts'
    }
  ],
  drinks: [
    {
      id: 26,
      name: 'menu.items.cola.title',
      description: 'menu.items.cola.description',
      price: 2.00,
      image: '/images/cola.webp',
      category: 'drinks'
    },
    {
      id: 27,
      name: 'menu.items.colaZero.title',
      description: 'menu.items.colaZero.description',
      price: 2.00,
      image: '/images/cola-zero.jpeg',
      category: 'drinks'
    },
    {
      id: 28,
      name: 'menu.items.sprite.title',
      description: 'menu.items.sprite.description',
      price: 2.00,
      image: '/images/sprite.webp',
      category: 'drinks'
    },
    {
      id: 29,
      name: 'menu.items.fanta.title',
      description: 'menu.items.fanta.description',
      price: 2.00,
      image: '/images/fanta.jpeg',
      category: 'drinks'
    },
    {
      id: 30,
      name: 'menu.items.ayran.title',
      description: 'menu.items.ayran.description',
      price: 2.00,
      image: '/images/ayran.avif',
      category: 'drinks'
    }
  ]
};

const Menu = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('shawarma');

  const categories = [
    { id: 'shawarma', name: t('menu.categories.shawarma') },
    { id: 'specials', name: t('menu.categories.specials') },
    { id: 'kebabs', name: t('menu.categories.kebabs') },
    { id: 'plates', name: t('menu.categories.plates') },
    { id: 'wraps', name: t('menu.categories.wraps') },
    { id: 'snacks', name: t('menu.categories.snacks') },
    { id: 'vegetarian', name: t('menu.categories.vegetarian') },
    { id: 'desserts', name: t('menu.categories.desserts') },
    { id: 'drinks', name: t('menu.categories.drinks') }
  ];

  return (
    <section id="menu" className="py-20 bg-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 font-serif text-darkBlue">{t('menu.title')}</h2>
          <p className="text-xl text-gray-600">{t('menu.subtitle')}</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-6 py-2 rounded-full text-lg transition-colors ${
                activeCategory === category.id
                  ? 'bg-terracotta text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems[activeCategory as keyof typeof menuItems].map((item) => (
            <MenuItem
              key={item.id}
              id={item.id}
              name={t(item.name)}
              description={t(item.description)}
              price={item.price}
              image={item.image}
              category={item.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;