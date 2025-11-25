/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';
import { Vehicle } from '../types';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface VehicleCardProps {
  artist: Vehicle; // Keeping prop name 'artist' to minimize parent refactoring in this step, logically it is 'vehicle'
  onClick: () => void;
}

const ArtistCard: React.FC<VehicleCardProps> = ({ artist: vehicle, onClick }) => {
  return (
    <motion.div
      className="group relative h-[450px] md:h-[550px] w-full overflow-hidden border-b md:border-r border-white/10 bg-black cursor-pointer"
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      data-hover="true"
      onClick={onClick}
    >
      {/* Image Background with Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          src={vehicle.image} 
          alt={vehicle.name} 
          className="h-full w-full object-cover grayscale-[0.5] will-change-transform"
          variants={{
            rest: { scale: 1, opacity: 0.7, filter: 'grayscale(50%)' },
            hover: { scale: 1.05, opacity: 1, filter: 'grayscale(0%)' }
          }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
      </div>

      {/* Overlay Info */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
           <span className="text-xs font-bold font-mono border border-[#D62828] text-[#D62828] bg-black/50 px-3 py-1 rounded-sm backdrop-blur-md uppercase tracking-wider">
             {vehicle.fipeDifference}
           </span>
           <motion.div
             variants={{
               rest: { opacity: 0, x: 20, y: -20 },
               hover: { opacity: 1, x: 0, y: 0 }
             }}
             className="bg-[#D62828] text-white rounded-full p-2 will-change-transform"
           >
             <ArrowUpRight className="w-6 h-6" />
           </motion.div>
        </div>

        <div>
           {/* Specs Badge */}
           <motion.div 
             className="flex gap-2 mb-3"
             variants={{
              rest: { opacity: 0, y: 10 },
              hover: { opacity: 1, y: 0 }
            }}
           >
             {vehicle.specs.slice(0, 2).map((spec, i) => (
                <span key={i} className="text-[10px] uppercase tracking-widest bg-white/10 backdrop-blur-md px-2 py-1 rounded-sm text-gray-300">
                  {spec}
                </span>
             ))}
           </motion.div>

          <div className="overflow-hidden">
            <motion.h3 
              className="font-heading text-2xl md:text-3xl font-bold uppercase text-white will-change-transform leading-none"
              variants={{
                rest: { y: 0 },
                hover: { y: -5 }
              }}
              transition={{ duration: 0.4 }}
            >
              {vehicle.name}
            </motion.h3>
          </div>
          
          <div className="flex items-end justify-between mt-3">
             <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase tracking-widest">{vehicle.brand}</span>
                <span className="text-xl md:text-2xl font-bold text-[#D62828]">{vehicle.price}</span>
             </div>
             <div className="flex items-center gap-1 text-[#D62828] text-xs uppercase font-bold">
                <CheckCircle2 className="w-3 h-3" />
                <span>Aprovado</span>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistCard;