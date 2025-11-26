
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShieldCheck, TrendingDown, Clock, MapPin, Menu, X, Car, ChevronLeft, ChevronRight, MessageCircle, Star, Award, Instagram, Facebook } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ArtistCard from './components/ArtistCard'; // Still imported but logic moved to Showcase
import VehicleShowcase from './components/VehicleShowcase';
import AIChat from './components/AIChat';
import { Vehicle } from './types';
import { IMAGES } from './assets';
import { VEHICLES } from './vehicleData'; // Importando dados centralizados

// Constants
const WHATSAPP_NUMBER = "5562999063891";
const WHATSAPP_MESSAGE = encodeURIComponent("Acabei de vim do site e gostaria de mais informações.");
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
const MAPS_LINK = "https://maps.app.goo.gl/FfUBXgR653NGz3t37";
const INSTAGRAM_LINK = "https://www.instagram.com/jmvautorepasse/";

const FloatingWhatsApp = () => (
  <motion.a
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center border-2 border-white/20 cursor-pointer transition-all duration-300"
    data-hover="true"
    style={{ 
      textDecoration: 'none',
      boxShadow: '0 0 25px rgba(37, 211, 102, 0.7)' // Forcing green shadow explicitly with inline style to override global defaults
    }}
  >
    <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
    {/* WhatsApp Icon SVG */}
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-9 md:h-9 fill-white relative z-10" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  </motion.a>
);

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  
  // Filter out sold vehicles for the catalog
  const activeVehicles = VEHICLES.filter(v => !v.sold);

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedVehicle) return;
      if (e.key === 'ArrowLeft') navigateVehicle('prev');
      if (e.key === 'ArrowRight') navigateVehicle('next');
      if (e.key === 'Escape') setSelectedVehicle(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVehicle]);


  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigateVehicle = (direction: 'next' | 'prev') => {
    if (!selectedVehicle) return;
    const currentIndex = activeVehicles.findIndex(v => v.id === selectedVehicle.id);
    if (currentIndex === -1) return; // Should not happen

    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % activeVehicles.length;
    } else {
      nextIndex = (currentIndex - 1 + activeVehicles.length) % activeVehicles.length;
    }
    setSelectedVehicle(activeVehicles[nextIndex]);
  };
  
  return (
    <div className="relative min-h-screen text-white selection:bg-[#D62828] selection:text-white cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      <FloatingWhatsApp />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-end md:justify-between px-4 md:px-8 py-3 md:py-6 mix-blend-normal bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm md:backdrop-blur-none transition-all duration-300">
        
        {/* LOGO - Centered on Mobile (Absolute), Left on Desktop (Static) */}
        <div 
           className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 md:inset-auto z-50 cursor-pointer h-20 md:h-24 w-auto drop-shadow-lg" 
           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}
        >
            <img src={IMAGES.LOGO_SRC} alt="JMV Auto Repasse" className="h-full w-auto object-contain" />
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase items-center">
          {['Estoque', 'Sobre', 'Contato'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item === 'Estoque' ? 'catalog' : item === 'Sobre' ? 'about' : 'contact')}
              className="hover:text-[#D62828] transition-colors text-white cursor-pointer bg-transparent border-none drop-shadow-md"
              data-hover="true"
            >
              {item}
            </button>
          ))}
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300 text-white cursor-pointer bg-black/40 backdrop-blur-md rounded-sm no-underline shadow-lg"
            data-hover="true"
          >
            <MessageCircle className="w-4 h-4" />
            Falar no WhatsApp
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-12 h-12 flex items-center justify-center bg-black/60 rounded-full backdrop-blur-md border border-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-0 z-30 bg-[#0a0a0a] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Estoque', 'Sobre', 'Contato'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item === 'Estoque' ? 'catalog' : item === 'Sobre' ? 'about' : 'contact')}
                className="text-4xl font-heading font-bold text-white hover:text-[#25D366] transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 bg-[#25D366] px-10 py-4 text-sm font-bold tracking-widest uppercase text-white rounded-sm shadow-lg shadow-green-900/50"
            >
              Falar no WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4 pt-20 md:pt-0">
        {/* Cinematic Background Effect - Updated for Storefront Photo */}
        <div className="absolute inset-0 z-[-1] opacity-60">
             <img src={IMAGES.HERO_BACKGROUND} className="w-full h-full object-cover" alt="JMV Auto Repasse" />
             <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-7xl pb-16 md:pb-20"
        >
           {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-[0.65rem] md:text-sm font-bold font-mono text-[#25D366] tracking-[0.2em] uppercase mb-6 bg-black/60 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md shadow-lg"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Procedência Garantida</span>
            </div>
            <span className="hidden md:block w-1.5 h-1.5 bg-white rounded-full"/>
            <span>Laudo Cautelar Aprovado</span>
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full flex flex-col items-center">
            <h1 className="text-3xl md:text-7xl font-black font-heading tracking-tighter mb-2 text-white drop-shadow-2xl">
                SEU CARRO NOVO
            </h1>
            <GradientText 
              text="PREÇO DE REPASSE" 
              as="h1" 
              className="text-[10vw] md:text-[8vw] leading-[0.9] font-black tracking-tighter text-center uppercase" 
            />
            
            {/* Red Orb Glow */}
            <motion.div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-20 w-[60vw] h-[60vw] bg-[#D62828] blur-[80px] rounded-full pointer-events-none opacity-20"
               animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.15, 0.25, 0.15] }}
               transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-16 md:w-24 h-1 bg-[#D62828] mt-6 mb-6 md:mt-8 md:mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-sm md:text-xl font-light max-w-2xl mx-auto text-gray-200 leading-relaxed drop-shadow-xl px-6 text-center"
          >
            Transparência, agilidade e os melhores preços do Brasil. <br className="hidden md:block"/>
            Atendemos lojistas e consumidor final.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            onClick={() => scrollToSection('catalog')}
            className="mt-8 md:mt-10 bg-[#D62828] text-white px-10 py-4 font-bold tracking-widest uppercase text-xs md:text-sm hover:bg-white hover:text-[#D62828] transition-all duration-300 rounded-sm shadow-[0_0_20px_rgba(214,40,40,0.4)]"
            data-hover="true"
          >
             Ver Estoque
          </motion.button>
        </motion.div>

        {/* MARQUEE */}
  <div className="absolute bottom-12 md:bottom-16 left-0 w-full py-3 md:py-4 bg-[#25D366] text-white z-20 overflow-hidden border-y border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <motion.div 
            className="flex w-fit will-change-transform"
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-lg md:text-3xl font-heading font-bold px-4 md:px-8 flex items-center gap-4 italic tracking-tighter">
                    ABAIXO DA FIPE <span className="text-black text-xs md:text-lg">●</span> 
                    LAUDO APROVADO <span className="text-black text-xs md:text-lg">●</span> 
                    SEM SINISTRO <span className="text-black text-xs md:text-lg">●</span> 
                    ENTREGA BRASIL <span className="text-black text-xs md:text-lg">●</span> 
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* CATALOG SECTION - NEW PREMIUM SLIDER */}
      <section id="catalog" className="relative z-10 py-16 md:py-24 bg-black">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 mb-8 md:mb-12 text-center md:text-left">
           <div className="flex flex-col md:flex-row justify-between items-end px-2 md:px-4">
             <h2 className="text-4xl md:text-7xl font-heading font-bold uppercase leading-[0.9] drop-shadow-lg w-full md:w-auto mb-6 md:mb-0">
              OPORTUNIDADES <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-white">PREMIUM</span>
            </h2>
             <div className="hidden md:block text-right">
                <p className="text-gray-400 uppercase tracking-widest text-sm mb-2">Estoque Rotativo Diário</p>
                <div className="h-1 w-full bg-[#25D366]"></div>
            </div>
           </div>
        </div>

        {/* The New Vehicle Showcase Component */}
        <VehicleShowcase 
           vehicles={activeVehicles} 
           onSelect={setSelectedVehicle} 
        />

        {activeVehicles.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-400 text-xl font-heading">Estoque sendo atualizado...</p>
          </div>
        )}
      </section>

      {/* VALUES / ABOUT SECTION */}
      <section id="about" className="relative z-10 py-16 md:py-32 bg-[#111] border-t border-white/10 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-[#222] to-transparent opacity-20 -skew-x-12 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 md:mb-8 leading-tight">
                POR QUE COMPRAR <br/> <GradientText text="CONOSCO?" className="text-5xl md:text-6xl" />
              </h2>
              <p className="text-base md:text-lg text-gray-400 mb-8 md:mb-12 font-light leading-relaxed">
                Somos especialistas em veículos de procedência. Atendemos lojistas, revendedores e clientes finais que buscam segurança, preço justo e processos rápidos.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: TrendingDown, title: 'Preço Abaixo da FIPE', desc: 'Margens agressivas para revenda ou economia real para uso próprio.' },
                  { icon: ShieldCheck, title: 'Laudo Cautelar Aprovado', desc: 'Transparência total. Carros sem leilão e sem sinistro.' },
                  { icon: Clock, title: 'Agilidade na Aprovação', desc: 'Processo de compra e financiamento rápido e desburocratizado.' },
                ].map((feature, i) => (
                  <div
                    key={i} 
                    className="flex items-start gap-4 md:gap-6 group"
                  >
                    <div className="p-3 md:p-4 rounded-md bg-white/5 border border-white/10 group-hover:border-[#25D366] transition-colors shrink-0">
                      <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-[#25D366]" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-1 font-heading text-white">{feature.title}</h4>
                      <p className="text-sm text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 relative h-[300px] md:h-[600px] w-full order-1 lg:order-2">
              <div className="absolute inset-0 bg-[#25D366] rounded-sm -rotate-2 opacity-20 blur-sm" />
              <div className="relative h-full w-full rounded-sm overflow-hidden border border-white/10 group shadow-2xl">
                <img 
                  src={IMAGES.SHOWROOM} 
                  alt="Showroom" 
                  className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                  <div className="flex gap-4 mb-4">
                     <Award className="w-10 h-10 md:w-12 md:h-12 text-[#25D366]" />
                  </div>
                  <div className="text-2xl md:text-5xl font-heading font-bold text-white">
                    LIDERANÇA EM REPASSE
                  </div>
                  <div className="text-xs md:text-sm font-mono tracking-widest uppercase mt-2 text-gray-300">
                    Desde 2018 entregando qualidade
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* TESTIMONIALS */}
      <section className="py-20 bg-black relative border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-center font-heading text-2xl md:text-4xl mb-12 uppercase text-gray-500">O que nossos parceiros dizem</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { name: "Roberto Mendes", role: "Lojista - Curitiba/PR", text: "Compro com a JMV há 2 anos. A descrição dos carros é sempre fiel e a margem me permite girar rápido o estoque." },
                 { name: "Ana Paula Silva", role: "Cliente Final - SP", text: "Fiquei receosa de comprar online, mas o laudo cautelar me passou segurança. O carro chegou impecável, como nas fotos." },
                 { name: "Garage Imports", role: "Revenda - BH/MG", text: "Parceria sólida. Agilidade na documentação e carros que não dão dor de cabeça. Recomendo para quem quer escalar." }
               ].map((t, i) => (
            <div key={i} className="bg-[#111] p-8 border border-white/10 rounded-sm hover:border-[#25D366] transition-colors group">
              <div className="flex gap-1 mb-4 text-[#25D366]">
                       {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed">"{t.text}"</p>
                    <div>
                       <p className="font-bold text-white uppercase tracking-wider text-sm">{t.name}</p>
                       <p className="text-xs text-gray-500 mt-1">{t.role}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CONTACT / CTA SECTION */}
      <section id="contact" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12 md:mb-16">
             <h2 className="text-4xl md:text-8xl font-heading font-bold text-white mb-6">
               PRONTO PARA <br/><span className="text-[#25D366]">NEGOCIAR?</span>
             </h2>
             <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto">
               Nosso estoque é atualizado diariamente. Não perca a chance de garantir os melhores modelos com preço de repasse.
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-8 bg-[#111] border border-white/10 hover:bg-[#D62828] transition-colors duration-500"
             >
                <MessageCircle className="w-10 h-10 text-[#D62828] group-hover:text-white mb-4 transition-colors mx-auto md:mx-0" />
                <h3 className="text-2xl font-bold uppercase mb-2">WhatsApp Vendas</h3>
                <p className="text-gray-400 group-hover:text-white/80">Atendimento imediato para cotações e vídeos detalhados.</p>
             </a>
             <a 
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer" 
                className="group block p-8 bg-[#111] border border-white/10 hover:bg-white hover:text-black transition-colors duration-500"
             >
                <MapPin className="w-10 h-10 text-white group-hover:text-black mb-4 transition-colors mx-auto md:mx-0" />
                <h3 className="text-2xl font-bold uppercase mb-2">Visite a Loja</h3>
                <p className="text-gray-400 group-hover:text-black/60">Agende sua visita e conheça nosso showroom premium.</p>
             </a>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-12 md:py-16 bg-black pb-24 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-end gap-8 text-center md:text-left">
          <div className="w-full md:w-auto flex flex-col items-center md:items-start">
             <div className="mb-6 md:mb-4 text-white flex items-center justify-center md:justify-start h-20 md:h-24 w-auto">
               <img src={IMAGES.LOGO_SRC} alt="JMV Auto Repasse" className="h-full w-auto object-contain" />
             </div>
             <div className="flex flex-col gap-2 text-xs font-mono text-gray-500">
               <span>CNPJ: 00.000.000/0001-00</span>
               <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-[#D62828] transition-colors w-fit mx-auto md:mx-0">
                 Goiânia - GO (Clique para ver no mapa)
               </a>
             </div>
          </div>
          
          <div className="flex gap-6 md:gap-8 flex-wrap items-center w-full md:w-auto justify-center md:justify-end">
            <a 
              href={INSTAGRAM_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#D62828] font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer flex items-center gap-2" 
              data-hover="true"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-[#D62828] font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer flex items-center gap-2" data-hover="true">
              <Facebook className="w-4 h-4" />
              Facebook
            </a>
          </div>
        </div>

        {/* Copyright Section - Placed at the very bottom */}
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center">
            <span className="text-gray-600 text-xs font-mono">© 2025 por JMV AUTO REPASSE - Created Perfowise ©</span>
        </div>
      </footer>

      {/* Vehicle Detail Modal */}
      <AnimatePresence>
        {selectedVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVehicle(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md cursor-auto p-0 md:p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-6xl bg-[#111] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-red-900/10 group/modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVehicle(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-[#D62828] transition-colors border border-white/10"
                data-hover="true"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons (Desktop) */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateVehicle('prev'); }}
                className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm"
                data-hover="true"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateVehicle('next'); }}
                className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm"
                data-hover="true"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Side - Responsive Height */}
              <div className="w-full md:w-3/5 h-[35vh] md:h-auto relative overflow-hidden bg-black shrink-0">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedVehicle.id}
                    src={selectedVehicle.image} 
                    alt={selectedVehicle.name} 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent md:bg-gradient-to-r" />
                
                {/* Mobile Nav Overlay */}
                <div className="md:hidden absolute inset-0 flex items-center justify-between p-2 pointer-events-none">
                   <button onClick={(e) => { e.stopPropagation(); navigateVehicle('prev'); }} className="pointer-events-auto p-2 bg-black/30 rounded-full text-white"><ChevronLeft/></button>
                   <button onClick={(e) => { e.stopPropagation(); navigateVehicle('next'); }} className="pointer-events-auto p-2 bg-black/30 rounded-full text-white"><ChevronRight/></button>
                </div>
              </div>

              {/* Content Side - Scrollable on Mobile */}
              <div className="w-full md:w-2/5 p-6 md:p-12 flex flex-col relative bg-[#111] overflow-y-auto grow">
                <motion.div
                  key={selectedVehicle.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="pb-20 md:pb-0" // Add padding bottom for mobile scroll
                >
                  <div className="flex items-center gap-3 text-[#D62828] mb-4">
                     <Car className="w-5 h-5" />
                     <span className="font-mono text-sm tracking-widest uppercase font-bold">{selectedVehicle.brand}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-4xl font-heading font-bold uppercase leading-none mb-2 text-white">
                    {selectedVehicle.name}
                  </h3>
                  
                  <p className="text-xl md:text-2xl text-white font-bold tracking-tight mb-2 mt-4">
                    {selectedVehicle.price}
                  </p>
                  
                  <span className="inline-block bg-[#D62828]/20 text-[#D62828] border border-[#D62828]/50 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-6">
                    {selectedVehicle.fipeDifference}
                  </span>
                  
                  <div className="h-px w-full bg-white/10 mb-6" />
                  
                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 p-3 rounded-sm border border-white/5">
                        <span className="text-gray-400 text-xs uppercase block">KM</span>
                        <span className="text-white font-medium text-sm">{selectedVehicle.km}</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-sm border border-white/5">
                        <span className="text-gray-400 text-xs uppercase block">Câmbio</span>
                        <span className="text-white font-medium text-sm">{selectedVehicle.transmission}</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-sm border border-white/5">
                        <span className="text-gray-400 text-xs uppercase block">Combustível</span>
                        <span className="text-white font-medium text-sm">{selectedVehicle.fuel}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light mb-8">
                    {selectedVehicle.description}
                  </p>
                  
                  <a 
                    href={`${WHATSAPP_LINK} sobre o ${selectedVehicle.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#D62828] text-white py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors rounded-sm flex items-center justify-center gap-2 no-underline sticky bottom-0 md:relative shadow-[0_-10px_20px_rgba(0,0,0,0.5)] md:shadow-none"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Tenho Interesse
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
