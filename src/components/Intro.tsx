import React, { useState } from 'react';
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
import giftAnimation from '../animations/gift-animation.json';

//@ts-ignore
import background from '../img/background.webp';

const Intro = () => {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [speed] = useState(8);

  return (
    <>
      <style>
        {`
        .engraved {
          color: #f7f2e8;
          text-shadow:
            0px 1px 1px rgba(0,0,0,0.4),
            0px -1px 1px rgba(255,255,255,0.7),
            1px 2px 2px rgba(0,0,0,0.5);
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
            {/* WRAPPER PER UNIFORMARE MOBILE REALE E DEVTOOLS */}
            <Box
              sx={{
                width: '100%',
                height: '100svh',
                //@ts-ignore
                height: '100dvh',
                aspectRatio: '9 / 19.5', // iPhone-like ratio
                margin: '0 auto',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Stack
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${background})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  position: 'relative',
                }}
              >
                {/* Testo + bottone */}
                <Stack sx={{ alignItems: 'center' }}>
                  <Typography
                    className="engraved"
                    sx={{
                      fontSize: '21px',
                      textAlign: 'center',
                      marginTop: '270px',
                      color: '#ededd5',
                    }}
                  >
                    <span>Feliz cumpleaños</span>
                    <br />
                    <span>Martina!</span>
                  </Typography>

                  <Button
                    onClick={() => setShowIntro(false)}
                    sx={{
                      boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
                      mt: '20px',
                      width: '220px',
                      backgroundColor: '#ededd5',
                    }}
                  >
                    <Typography color="#221a4d">SCARTA IL REGALO</Typography>
                    <Lottie
                      animationData={giftAnimation}
                      loop
                      autoplay
                      style={{
                        marginTop: '-15px',
                        marginLeft: '10px',
                        width: '60px',
                        height: '60px',
                      }}
                    />
                  </Button>
                </Stack>

                {/* Tiger */}
                <Lottie
                  animationData={Tiger}
                  autoplay
                  style={{
                    zIndex: 2,
                    width: '220px',
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                />

                {/* Parrot */}
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

                {/* BigHeadBird */}
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

                {/* Toucan */}
                <Box
                  sx={{
                    width: '200px',
                    position: 'absolute',
                    top: '150px',
                    animation: `leftToRight ${speed}s linear infinite`,
                  }}
                >
                  <Lottie animationData={Toucan} autoplay />
                </Box>

                {/* Walking Ape */}
                <Box
                  sx={{
                    zIndex: 1,
                    width: '450px',
                    position: 'absolute',
                    bottom: '0px',
                    animation: `pingpong 20s linear infinite`,
                    '@keyframes pingpong': {
                      '0%': {
                        transform: 'translateX(-100vw) scaleX(1)',
                      },
                      '49%': {
                        transform: 'translateX(100vw) scaleX(1)',
                      },
                      '50%': {
                        transform: 'translateX(100vw) scaleX(-1)',
                      },
                      '100%': {
                        transform: 'translateX(-100vw) scaleX(-1)',
                      },
                    },
                  }}
                >
                  <Lottie animationData={WalkingApe} autoplay />
                </Box>
              </Stack>
            </Box>
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
