
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Vehicle } from '../types';
import { ChevronLeft, ChevronRight, MessageCircle, Gauge, Calendar, Zap, ArrowRight, Fuel } from 'lucide-react';

interface VehicleShowcaseProps {
  vehicles: Vehicle[];
  onSelect: (vehicle: Vehicle) => void;
}

const VehicleShowcase: React.FC<VehicleShowcaseProps> = ({ vehicles, onSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const activeVehicle = vehicles[currentIndex];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    let newIndex = currentIndex + newDirection;
    if (newIndex < 0) newIndex = vehicles.length - 1;
    if (newIndex >= vehicles.length) newIndex = 0;
    setCurrentIndex(newIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1,
      filter: 'blur(10px)'
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)'
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)'
    })
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 50, skewX: 20 },
    visible: { opacity: 1, y: 0, skewX: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  if (!activeVehicle) return null;

  return (
    <div className="relative w-full min-h-[85vh] bg-black overflow-hidden flex flex-col justify-center border-y border-white/10 group">
      
      {/* BACKGROUND AMBIENCE */}
      <div className="absolute inset-0 z-0">
        <motion.div
           key={activeVehicle.id}
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.3 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1 }}
           className="absolute inset-0 bg-cover bg-center blur-[100px] scale-110"
           style={{ backgroundImage: `url(${activeVehicle.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-10 pointer-events-none"></div>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="relative z-20 w-full max-w-[1800px] mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-center py-12 md:py-0">
        
        {/* LEFT: TEXT INFO */}
        <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 relative">
           <AnimatePresence mode='wait'>
             <motion.div
               key={activeVehicle.id}
               initial="hidden"
               animate="visible"
               exit="hidden"
               className="flex flex-col gap-4 md:gap-6"
             >
                {/* Brand Badge */}
                <motion.div variants={textVariants} className="flex items-center gap-3">
                   <span className="px-3 py-1 bg-[#D62828] text-white text-xs font-bold uppercase tracking-widest rounded-sm">
                      {activeVehicle.fipeDifference}
                   </span>
                   <span className="text-gray-400 font-mono text-sm uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> Disponível
                   </span>
                </motion.div>

                {/* Title */}
                <motion.h2 
                  variants={textVariants}
                  className="text-4xl md:text-7xl font-black font-heading uppercase italic tracking-tighter text-white leading-[0.9]"
                >
                  {activeVehicle.name}
                </motion.h2>

                {/* Specs Grid */}
                <motion.div variants={textVariants} className="flex flex-wrap gap-4 my-2">
                   <div className="flex items-center gap-2 text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-sm backdrop-blur-sm">
                      <Gauge size={14} className="text-[#D62828]" />
                      <span className="text-xs font-bold uppercase">{activeVehicle.km}</span>
                   </div>
                   <div className="flex items-center gap-2 text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-sm backdrop-blur-sm">
                      <Zap size={14} className="text-[#D62828]" />
                      <span className="text-xs font-bold uppercase">{activeVehicle.transmission}</span>
                   </div>
                   <div className="flex items-center gap-2 text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-sm backdrop-blur-sm">
                      <Fuel size={14} className="text-[#D62828]" />
                      <span className="text-xs font-bold uppercase">{activeVehicle.fuel}</span>
                   </div>
                </motion.div>

                {/* Price */}
                <motion.div variants={textVariants} className="relative w-fit">
                    <div className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                       {activeVehicle.price}
                    </div>
                    <div className="h-1 w-full bg-gradient-to-r from-[#D62828] to-transparent mt-2" />
                </motion.div>

                {/* Description */}
                <motion.p variants={textVariants} className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md border-l-2 border-[#D62828] pl-4">
                   {activeVehicle.description}
                </motion.p>

                {/* CTA Button */}
                <motion.div variants={textVariants} className="mt-4 flex gap-4">
                  <button 
                    onClick={() => onSelect(activeVehicle)}
                    className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-[#D62828] hover:text-white transition-all duration-300 overflow-hidden"
                  >
                     <span className="relative z-10 flex items-center gap-2">Ver Detalhes <ArrowRight size={16}/></span>
                  </button>
                  <a 
                     href={`https://wa.me/5562999063891?text=Olá, tenho interesse no ${activeVehicle.name}`}
                     target="_blank"
                     rel="noreferrer"
                     className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                     <MessageCircle size={16}/> Negociar
                  </a>
                </motion.div>
             </motion.div>
           </AnimatePresence>
        </div>

        {/* RIGHT: IMAGE CAROUSEL */}
        <div className="lg:col-span-7 h-[40vh] md:h-[60vh] relative order-1 lg:order-2 perspective-1000">
           <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
                className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer"
                onClick={() => onSelect(activeVehicle)}
              >
                 <div className="relative w-full h-full md:w-[110%] md:h-[110%] overflow-hidden rounded-lg md:rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 group-hover:border-[#D62828]/50 transition-colors">
                    <img 
                      src={activeVehicle.image} 
                      alt={activeVehicle.name} 
                      className="w-full h-full object-cover"
                    />
                    {/* Speed Lines Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 right-0 p-8 opacity-50">
                       <span className="text-[10rem] font-black text-white/5 leading-none -tracking-[0.05em]">
                          0{currentIndex + 1}
                       </span>
                    </div>
                 </div>
              </motion.div>
           </AnimatePresence>

           {/* Navigation Arrows (Floating) */}
           <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-8 z-30">
              <button 
                onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                className="p-3 md:p-4 rounded-full bg-black/50 border border-white/10 text-white hover:bg-[#D62828] hover:border-[#D62828] backdrop-blur-md transition-all active:scale-95"
              >
                 <ChevronLeft className="w-6 h-6" />
              </button>
           </div>
           <div className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-8 z-30">
              <button 
                onClick={(e) => { e.stopPropagation(); paginate(1); }}
                className="p-3 md:p-4 rounded-full bg-black/50 border border-white/10 text-white hover:bg-[#D62828] hover:border-[#D62828] backdrop-blur-md transition-all active:scale-95"
              >
                 <ChevronRight className="w-6 h-6" />
              </button>
           </div>
        </div>
      </div>

      {/* BOTTOM THUMBNAILS (PlayStation Style) */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 pb-8 hidden md:block">
         <div className="flex items-center justify-center gap-4 overflow-x-auto pb-4 no-scrollbar">
            {vehicles.map((v, idx) => (
               <button
                 key={v.id}
                 onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                 }}
                 className={`relative h-16 w-32 shrink-0 rounded-sm overflow-hidden transition-all duration-300 border-b-2 ${
                    idx === currentIndex 
                    ? 'scale-110 border-[#D62828] opacity-100 ring-2 ring-[#D62828]/50' 
                    : 'border-transparent opacity-40 hover:opacity-80'
                 }`}
               >
                  <img src={v.image} className="w-full h-full object-cover" alt="" />
               </button>
            ))}
         </div>
      </div>
    </div>
  );
};

export default VehicleShowcase;
