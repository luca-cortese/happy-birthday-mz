import React, { useEffect, useState } from 'react';
import { useMediaQuery, Stack, Box, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import Sloth from '../animations/enjoying_sloth.json';
import Turtle from '../animations/turtle.json';
import Elephant from '../animations/elephant.json';

//@ts-ignore
import background from '../img/last-step-background.webp';
import ElephantSpeechBubble from './ElephantSpeechBubble.tsx';

export default function GiftBoxAnimation() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const speed = 0.01;
  const [visible, setVisible] = useState(false);

  const downloadTextFile = () => {
    const blob = new Blob(['Hello, world!'], {
      type: 'application/octet-stream',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'BuonCompleanno.pdf';
    link.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    downloadTextFile();
  });

  return (
    <Stack
      sx={{
        overflow: 'none',
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {/* Turtle → left to right */}
      <Box
        sx={{
          width: '150px',
          position: 'absolute',
          bottom: '200px',
          animation: `pingpong 20s linear infinite`,
          '@keyframes pingpong': {
            '0%': {
              transform: 'translateX(-100vw) scaleX(1)', // guarda a destra
            },
            '49%': {
              transform: 'translateX(100vw) scaleX(1)', // ancora verso destra
            },
            '50%': {
              transform: 'translateX(100vw) scaleX(-1)', // flip istantaneo
            },
            '100%': {
              transform: 'translateX(-100vw) scaleX(-1)', // torna verso sinistra
            },
          },
        }}
      >
        <Lottie animationData={Turtle} autoplay />
      </Box>

      {/* Elephant animation */}
      <Box
        sx={{
          width: '350px',
          position: 'absolute',
          bottom: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Lottie animationData={Elephant} autoplay />
      </Box>

      {/* Sloth */}
      <Box
        sx={{
          width: '220px',
          position: 'absolute',
          top: '50px',
          marginLeft: '-30px',
        }}
      >
        <Lottie animationData={Sloth} autoplay />
      </Box>

      <ElephantSpeechBubble>
        <Typography>
          Fantastico! <br />
          Un file è stato scaricato nel tuo dispositivo. <br />
          Troverai tutto lì. <br />
          Ciaoooooo!!!
        </Typography>
      </ElephantSpeechBubble>
    </Stack>
  );
}
