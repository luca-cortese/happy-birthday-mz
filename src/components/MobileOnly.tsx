import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import Bear from '../animations/bear-no.json';

export default function MobileOnly({ children }) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mobileRegex = /Android|iPhone|iPad|iPod/i;
    setIsMobile(mobileRegex.test(navigator.userAgent));
  }, []);

  if (isMobile === null) return null; // prevent flicker on load

  if (!isMobile) {
    return (
      <>
        <style>
          {`
            body, html {
                overflow: hidden;
                width: 100%;
                height: 100%;
            }
        `}
        </style>
        <Box
          sx={{
            height: '100svh',
            //@ts-ignore
            height: '100dvh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: '#fff3d4',
          }}
        >
          <Typography variant="h4">
            Questo sito è disponibile solo da mobile!
          </Typography>
          <Box
            sx={{
              width: '250px',
              position: 'absolute',
              top: '50px',
            }}
          >
            <Lottie animationData={Bear} autoplay />
          </Box>
        </Box>
      </>
    );
  }

  return children;
}
