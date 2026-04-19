import React, { useState, useRef } from 'react';
import { Button, Stack, Typography, Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import Lottie from 'lottie-react';
import CheckVerificationCode from './CheckVerificationCode.tsx';
import Tiger from '../animations/tiger.json';
import BigHeadBird from '../animations/big_head_bird.json';
import Toucan from '../animations/toucan.json';
import Parrot from '../animations/parrot.json';
import WalkingApe from '../animations/walking_ape.json';
import { motion, AnimatePresence } from 'framer-motion';

//@ts-ignore
import background from '../img/background.png';

const Intro = () => {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [speed, setSpeed] = useState(8); // seconds

  return (
    <>
      <style>
        {`
        .engraved {
          color: #f7f2e8; /* legno chiarissimo, quasi avorio */
          text-shadow:
            0px 1px 1px rgba(0,0,0,0.4),      /* ombra interna sotto */
            0px -1px 1px rgba(255,255,255,0.7), /* luce sopra */
            1px 2px 2px rgba(0,0,0,0.5);      /* profondità */
          letter-spacing: 1px;
        }
      `}
      </style>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5 }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
          >
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
              <Stack
                sx={{
                  width: '100%',
                  height: '100vh',
                  backgroundImage: `url(${background})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  position: 'relative',
                }}
              >
                <Stack sx={{ alignItems: 'center' }}>
                  <Typography
                    className="engraved"
                    sx={{
                      fontSize: '24px',
                      textAlign: 'center',
                      marginTop: '330px',
                      color: '#ededd5',
                    }}
                  >
                    <span>Buon compleanno</span>
                    <br />
                    <span>Marti!</span>
                    <br />
                    <br />
                    <span>Ti va di scartare</span>
                    <br />
                    <span>un regalino?</span>
                  </Typography>

                  <Button
                    onClick={() => setShowIntro(false)}
                    sx={{
                      boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
                      mt: 2,
                      width: '150px',
                      backgroundColor: '#ededd5',
                    }}
                  >
                    <Typography color="#221a4d">SCARTA</Typography>
                  </Button>
                </Stack>
              </Stack>

              {/* Tiger (static at bottom) */}
              <Lottie
                animationData={Tiger}
                autoplay
                style={{
                  zIndex: 2,
                  width: '280px',
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              />

              {/* Parrot → right to left */}
              <Box
                sx={{
                  width: '150px',
                  position: 'absolute',
                  top: '0px',
                  animation: `rightToLeft ${speed}s linear infinite`,
                  '@keyframes rightToLeft': {
                    '0%': { transform: 'translateX(100vw)' },
                    '100%': { transform: 'translateX(-100vw)' },
                  },
                }}
              >
                <Lottie animationData={Parrot} autoplay />
              </Box>

              {/* BigHeadBird → left to right */}
              <Box
                sx={{
                  width: '150px',
                  position: 'absolute',
                  top: '50px',
                  animation: `leftToRight ${speed}s linear infinite`,
                  '@keyframes leftToRight': {
                    '0%': { transform: 'translateX(-100vw)' },
                    '100%': { transform: 'translateX(100vw)' },
                  },
                }}
              >
                <Lottie animationData={BigHeadBird} autoplay />
              </Box>

              {/* Toucan → left to right */}
              <Box
                sx={{
                  width: '200px',
                  position: 'absolute',
                  top: '150px',
                  animation: `leftToRight ${speed}s linear infinite`,
                  '@keyframes leftToRight': {
                    '0%': { transform: 'translateX(-100vw)' },
                    '100%': { transform: 'translateX(100vw)' },
                  },
                }}
              >
                <Lottie animationData={Toucan} autoplay />
              </Box>

              {/* Walking ale → left to right */}
              <Box
                sx={{
                  zIndex: 1,
                  width: '450px',
                  position: 'absolute',
                  bottom: '0px',
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
                <Lottie animationData={WalkingApe} autoplay />
              </Box>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showIntro && (
          <motion.div
            key="check"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5 }}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          >
            <CheckVerificationCode />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Intro;
