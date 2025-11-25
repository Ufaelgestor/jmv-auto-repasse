
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Vehicle {
  id: string;
  name: string; // Ex: Toyota Corolla XEi
  brand: string; // Ex: Toyota • 2024
  
  // Dados brutos (para cálculos se necessário)
  rawPrice?: number;
  
  // Dados formatados para exibição
  price: string; // Ex: "R$ 142.900"
  fipeDifference: string; // Ex: "12% ABAIXO FIPE" (Calculado automaticamente)
  
  km: string; // Ex: "15.000 km"
  transmission: string; // Ex: "Automático"
  fuel: string; // Ex: "Flex"
  
  image: string;
  description: string;
  specs: string[]; // Mantido para compatibilidade visual (gerado automaticamente)
  sold?: boolean; // Se true, o carro some do site
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  CATALOG = 'catalog',
  ABOUT = 'about',
  CONTACT = 'contact',
}
