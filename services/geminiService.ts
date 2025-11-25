/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `Você é o Assistente Virtual da JMV Auto Repasse.
      
      Sobre a empresa:
      - Especialista em venda de veículos semi-novos e novos com preço abaixo da FIPE.
      - Foco em procedência: Todos os carros têm Laudo Cautelar Aprovado.
      - Público: Atende tanto lojistas (revenda) quanto consumidor final.
      - Diferenciais: Preço de repasse, garantia de procedência, entrega em todo Brasil.
      
      Inventário (Exemplos):
      - SUVs: Jeep Compass, Chevrolet Tracker, VW Nivus.
      - Sedans: Toyota Corolla, Honda Civic.
      - Populares: HB20, Onix, Kwid.
      
      Tom de voz:
      - Profissional, confiante, direto e prestativo.
      - Use emojis automotivos: 🚗, 🛡️, 💨, 🔧, ✅.
      
      Objetivo:
      - Tirar dúvidas sobre financiamento, estado do carro e agendar visita/contato no WhatsApp.
      - Respostas curtas e persuasivas (max 50 palavras).
      - Sempre direcione para o botão de WhatsApp para fechar negócio.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Sistema offline. (Missing API Key)";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Sem resposta no momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sinal perdido. Tente novamente.";
  }
};