import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

export default function ElephantThoughtBubbleTropical({ children }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: [0, -10, 0], // galleggia
      }}
      transition={{
        duration: 0.6,
        ease: 'backOut',
        y: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      style={{
        position: 'absolute',
        bottom: '230px',
        left: 0,
        right: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
        zIndex: 40,
      }}
    >
      {/* Nuvoletta */}
      <Box
        sx={{
          padding: '10px 14px',
          background: '#f4e7c5', // ⬅️ sabbia tropicale
          borderRadius: '18px',
          border: '1px solid #8d6e63', // ⬅️ marroncino naturale (legno/terra)
          boxShadow: `
      0 0 6px rgba(141, 110, 99, 0.35),
      0 0 14px rgba(141, 110, 99, 0.22),
      0 0 26px rgba(141, 110, 99, 0.15)
    `, // ⬅️ bordo vaporoso
          fontSize: '15px',
          color: '#4e342e', // marrone scuro elegante
          textAlign: 'center',
          display: 'inline-block',
          pointerEvents: 'auto',
          maxWidth: '80%',
        }}
      >
        {children}
      </Box>

      {/* PALLINI SOTTO LA NUVOLA */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          mt: '12px',
        }}
      >
        {/* Pallino più piccolo (in fondo) */}
        <Box
          sx={{
            width: '20px',
            height: '20px',
            background: '#f4e7c5', // ⬅️ sabbia tropicale
            borderRadius: '50%',
            boxShadow: '0 3px 6px rgba(0,0,0,0.25)',
            border: '1px solid #8d6e63', // ⬅️ marroncino naturale (legno/terra)
          }}
        />

        {/* Pallino medio */}
        <Box
          sx={{
            width: '14px',
            height: '14px',
            background: '#f4e7c5', // ⬅️ sabbia tropicale
            borderRadius: '50%',
            boxShadow: '0 3px 6px rgba(0,0,0,0.25)',
            border: '1px solid #8d6e63', // ⬅️ marroncino naturale (legno/terra)
          }}
        />

        {/* Pallino grande (vicino alla nuvoletta) */}
        <Box
          sx={{
            width: '10px',
            height: '10px',
            background: '#f4e7c5', // ⬅️ sabbia tropicale
            borderRadius: '50%',
            boxShadow: '0 3px 6px rgba(0,0,0,0.25)',
            border: '1px solid #8d6e63', // ⬅️ marroncino naturale (legno/terra)
          }}
        />
      </Box>
    </motion.div>
  );
}
