
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Vehicle } from './types';
import { IMAGES } from './assets';

// ==========================================
// 🚗 CADASTRO DE VEÍCULOS (SEU ESTOQUE)
// ==========================================
// Adicione ou edite os carros aqui.
// O sistema calcula automaticamente o desconto da FIPE.

const RAW_VEHICLES = [
  { 
    id: '1', 
    name: 'Onix Sedan Pluz 1.0 Turbo Premier', 
    brand: 'Chevrolet',
    year: '2023/2024',
    price: 76500,      // Valor de Venda (Número puro, sem R$ ou ponto)
    fipe: 96753,       // Valor da FIPE (Número puro)
    km: 8180,          // Quilometragem
    transmission: 'Automático',
    fuel: '1.0 Flex',
    image: "https://imgur.com/qPsDfQ0.png", // Added quotes here
    description: 'Oportunidade única para quem busca conforto e liquidez.',
    sold: false         // Mude para true se vender
  },
  { 
    id: '2', 
    name: 'Volkswagem Polo Track 1.0', 
    brand: 'Volkswagem',
    year: '2024/2025',
    price: 64000,      // Valor de Venda (Número puro, sem R$ ou ponto)
    fipe: 76362,       // Valor da FIPE (Número puro)
    km: 59000,          // Quilometragem
    transmission: 'Manual',
    fuel: '1.0 Flex',
    image: "https://imgur.com/putmN9D.png", // Added quotes here
    description: 'Oportunidade única para quem busca conforto e liquidez.',
    sold: false         // Mude para true se vender
  },
  { 
    id: '3', 
    name: 'Fiat/Mobi Like 1.0', 
    brand: 'Fiat',
    year: '2021',
    price: 37700,      // Valor de Venda (Número puro, sem R$ ou ponto)
    fipe: 46727,       // Valor da FIPE (Número puro)
    km: 89344,          // Quilometragem
    transmission: 'Manual',
    fuel: '1.0 Flex',
    image: "https://imgur.com/SLrwZXN.png", // Added quotes here
    description: 'Oportunidade única para quem busca conforto e liquidez.',
    sold: false         // Mude para true se vender
  },
  { 
    id: '4', 
    name: 'VW Nivus Highline', 
    brand: 'Volkswagen',
    year: '2022',
    price: 108000,
    fipe: 126000,
    km: 35000,
    transmission: 'Automático',
    fuel: '200 TSI',
    image: IMAGES.VEHICLES.NIVUS,
    description: 'Design coupé esportivo. Tecnologia ACC e VW Play. Veículo de procedência garantida, sem sinistro.',
    sold: false
  },
  { 
    id: '5', 
    name: 'Fiat Toro Volcano', 
    brand: 'Fiat',
    year: '2023',
    price: 155000,
    fipe: 189000,
    km: 28000,
    transmission: 'Automático',
    fuel: 'Diesel 4x4',
    image: IMAGES.VEHICLES.TORO,
    description: 'Picape robusta para trabalho e lazer. Tração integral, caçamba intacta. Preço imbatível para revenda.',
    sold: false
  },
  { 
    id: '6', 
    name: 'BMW 320i M Sport', 
    brand: 'BMW',
    year: '2022',
    price: 289000,
    fipe: 315000,
    km: 12000,
    transmission: 'Automático',
    fuel: '2.0 Turbo',
    image: IMAGES.VEHICLES.BMW,
    description: 'O puro prazer de dirigir. Sedan premium em estado impecável. Pacote M Sport completo.',
    sold: false
  },
];

// ==========================================
// ⚙️ LÓGICA AUTOMÁTICA (NÃO PRECISA MEXER)
// ==========================================
// Esta parte formata os dados acima para o site.

export const VEHICLES: Vehicle[] = RAW_VEHICLES.map(car => {
  // 1. Formatar Preço (R$ 100.000)
  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(car.price);
  
  // 2. Calcular % abaixo da FIPE
  const discount = car.fipe > 0 ? Math.round(((car.fipe - car.price) / car.fipe) * 100) : 0;
  const fipeText = discount > 0 ? `${discount}% ABAIXO FIPE` : 'PREÇO DE REPASSE';

  // 3. Formatar KM
  const kmText = `${new Intl.NumberFormat('pt-BR').format(car.km)} km`;

  return {
    id: car.id,
    name: car.name,
    brand: `${car.brand} • ${car.year}`,
    rawPrice: car.price,
    price: formattedPrice,
    fipeDifference: fipeText,
    km: kmText,
    transmission: car.transmission,
    fuel: car.fuel,
    image: car.image,
    description: car.description,
    // Cria os "Specs" para os cards
    specs: [car.fuel, car.transmission, kmText],
    sold: car.sold
  };
});
