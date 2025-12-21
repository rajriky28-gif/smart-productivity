import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export type BearState = 'idle' | 'focus' | 'typing' | 'password-typing' | 'cover-eyes' | 'success' | 'reading';

interface StrideBearProps {
  state: BearState;
  lookPercent?: number; // 0 to 100 (for reading along)
}

const StrideBear: React.FC<StrideBearProps> = ({ state, lookPercent = 50 }) => {
  const [blink, setBlink] = useState(false);
  const controls = useAnimation();

  // Blinking Logic
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (state !== 'cover-eyes' && state !== 'success') {
        setBlink(true);
        setTimeout(() => setBlink(false), 200);
      }
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, [state]);

  // Calculate Eye Position based on lookPercent
  // Map 0-100 to -10 to 10 pixels
  const eyeX = (lookPercent - 50) / 3;
  const headRotate = (lookPercent - 50) / 10;

  const isCovering = state === 'cover-eyes';
  const isSuccess = state === 'success';
  const isFocus = state === 'focus' || state === 'typing' || state === 'password-typing';

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Confetti for Success */}
      {isSuccess && (
        <div className="absolute inset-0 pointer-events-none">
           {[...Array(12)].map((_, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
               animate={{ 
                 opacity: 0, 
                 x: (Math.random() - 0.5) * 200, 
                 y: (Math.random() - 0.5) * 200,
                 scale: 1
               }}
               transition={{ duration: 1, repeat: Infinity, delay: Math.random() * 0.5 }}
               className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
               style={{ backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4'][i % 3] }}
             />
           ))}
        </div>
      )}

      {/* THE BEAR */}
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full overflow-visible"
        animate={{ y: isFocus ? 10 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* --- HEAD GROUP --- */}
        <motion.g
            animate={{ rotate: headRotate, y: isFocus ? 5 : 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
        >
            {/* Ears */}
            <circle cx="45" cy="55" r="25" fill="#333" />
            <circle cx="155" cy="55" r="25" fill="#333" />
            <circle cx="45" cy="55" r="12" fill="#555" />
            <circle cx="155" cy="55" r="12" fill="#555" />

            {/* Face Shape */}
            <path
              d="M 40 80 Q 100 60 160 80 Q 190 130 160 170 Q 100 190 40 170 Q 10 130 40 80"
              fill="#1a1a1a"
            />

            {/* Muzzle */}
            <ellipse cx="100" cy="135" rx="45" ry="35" fill="#2a2a2a" />
            <ellipse cx="100" cy="120" rx="12" ry="8" fill="#000" /> {/* Nose */}
            
            {/* Mouth */}
            <motion.path 
                d={isSuccess ? "M 85 145 Q 100 160 115 145" : "M 90 145 Q 100 150 110 145"}
                stroke="#000" 
                strokeWidth="3" 
                fill="transparent" 
                animate={{ d: isSuccess ? "M 85 145 Q 100 165 115 145" : "M 90 145 Q 100 150 110 145" }}
            />

            {/* --- EYES --- */}
            {/* Left Eye */}
            <g transform="translate(70, 100)">
                <ellipse cx="0" cy="0" rx="12" ry="14" fill="#fff" />
                {!blink && !isCovering ? (
                    <motion.circle 
                        cx="0" cy="0" r="5" fill="#000" 
                        animate={{ x: eyeX, y: isFocus ? 2 : 0 }}
                    />
                ) : null}
                {blink && <line x1="-10" y1="0" x2="10" y2="0" stroke="#000" strokeWidth="3" />}
            </g>

            {/* Right Eye */}
            <g transform="translate(130, 100)">
                <ellipse cx="0" cy="0" rx="12" ry="14" fill="#fff" />
                {!blink && !isCovering ? (
                    <motion.circle 
                        cx="0" cy="0" r="5" fill="#000" 
                        animate={{ x: eyeX, y: isFocus ? 2 : 0 }}
                    />
                ) : null}
                {blink && <line x1="-10" y1="0" x2="10" y2="0" stroke="#000" strokeWidth="3" />}
            </g>
            
            {/* Blush (Success) */}
            <motion.circle cx="55" cy="130" r="10" fill="#FF6B6B" initial={{ opacity: 0 }} animate={{ opacity: isSuccess ? 0.4 : 0 }} />
            <motion.circle cx="145" cy="130" r="10" fill="#FF6B6B" initial={{ opacity: 0 }} animate={{ opacity: isSuccess ? 0.4 : 0 }} />

        </motion.g>

        {/* --- PAWS (For Covering Eyes) --- */}
        {/* Left Paw */}
        <motion.path
            d="M 20 200 Q 20 160 50 160 Q 80 160 80 200"
            fill="#333"
            initial={{ y: 0, x: 0, rotate: 0 }}
            animate={
                isCovering 
                ? { y: -105, x: 45, rotate: 15 } 
                : { y: 0, x: 0, rotate: 0 }
            }
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        />
        {/* Pad Left */}
        <motion.circle cx="50" cy="180" r="12" fill="#555" 
            animate={isCovering ? { y: -105, x: 45 } : { y: 0, x: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        />

        {/* Right Paw */}
        <motion.path
            d="M 120 200 Q 120 160 150 160 Q 180 160 180 200"
            fill="#333"
            initial={{ y: 0, x: 0, rotate: 0 }}
            animate={
                isCovering 
                ? { y: -105, x: -45, rotate: -15 } 
                : { y: 0, x: 0, rotate: 0 }
            }
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        />
        {/* Pad Right */}
        <motion.circle cx="150" cy="180" r="12" fill="#555" 
            animate={isCovering ? { y: -105, x: -45 } : { y: 0, x: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        />

      </motion.svg>
    </div>
  );
};

export default StrideBear;
