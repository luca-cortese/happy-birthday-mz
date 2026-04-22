import React, { useState } from 'react';
import { useMediaQuery, Box } from '@mui/material';
import VerificationCode from './VerificationCode.tsx';
import {
  Typography,
  Button,
  Stack,
  Alert,
  Slide,
  IconButton,
} from '@mui/material';
import { colors } from '../utils/common.js';
import giftAnimation from '../animations/gift-animation.json';
import GiftBoxAnimation from './GiftAnimation.tsx';
import Lottie from 'lottie-react';
import CloseIcon from '@mui/icons-material/Close';
import Shark from '../animations/shark.json';
import JumpingFish from '../animations/jumping_fish.json';
import Monkey from '../animations/monkey.json';
import Loading from '../animations/loading.json';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

//@ts-ignore
import background from '../img/verification_code_background.webp';

const CheckVerificationCode = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const fontSize = isMobile ? 22 : 26;
  const [values, setValues] = useState(Array(6).fill(''));
  const [showError, setShowError] = useState<boolean>(false);
  const [codeIsRight, setCodeIsRight] = useState<boolean>();
  const [showGift, setShowGift] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const checkForVerificationCode = async (code) => {
    try {
      setIsLoading(true);

      // Avvio in parallelo:
      const apiCall = axios.post(
        API_URL as string,
        { code: code.toUpperCase() },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 8000,
        }
      );

      const minimumWait = delay(3000); // 3 secondi minimi

      // Aspetto sia la risposta API che i 3 secondi
      const [response] = await Promise.all([apiCall, minimumWait]);

      if (response.data) {
        setTimeout(() => {
          setShowGift(true);
        }, 5500);

        setShowError(false);
        setCodeIsRight(true);
      } else {
        setShowError(true);
        setCodeIsRight(false);
      }
    } catch (err) {
      setShowError(true);
      setCodeIsRight(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
        body, html {
          overflow: hidden;
          width: 100%;
          height: 100%;
        }

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

      <Slide in={showError} direction="down" mountOnEnter unmountOnExit>
        <Alert
          severity="error"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            zIndex: 9999,
            m: 0, // remove default margin
            '& .MuiAlert-action': { alignItems: 'center' },
          }}
          action={
            <IconButton
              color="inherit"
              size="small"
              onClick={() => setShowError(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <Typography sx={{ fontSize: '16px' }}>
            Codice errato!
            <br />
            Solo una persona può scartare il regalo!
            <br />
            Siamo sicuri che sei te?
          </Typography>
        </Alert>
      </Slide>

      <AnimatePresence>
        {!showGift && (
          <motion.div
            key="check"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5 }}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
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
              className="slide-down"
            >
              <Stack
                sx={{ marginTop: '250px' }}
                alignContent={'center'}
                alignItems={'center'}
              >
                <Typography
                  className="engraved"
                  sx={{
                    mb: '20px',
                    fontSize: '21px',
                    textAlign: 'center',
                    color: '#ededd5',
                  }}
                  fontSize={fontSize}
                >
                  ma per essere scartato
                  <br />
                  il codice segreto va indicato!
                </Typography>
                <VerificationCode
                  values={values}
                  codeIsRight={codeIsRight}
                  setValues={setValues}
                />
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ width: '100%', mt: 1 }}
                >
                  <Button
                    onClick={() => checkForVerificationCode(values.join(''))}
                    sx={{
                      boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
                      mt: '20px',
                      width: '300px',
                      backgroundColor: '#ededd5',
                    }}
                  >
                    <Typography sx={{ color: '#221a4d' }} fontSize={fontSize}>
                      Scarta il regalo
                    </Typography>
                    <Lottie
                      animationData={giftAnimation}
                      loop
                      autoplay
                      style={{
                        marginTop: '-15px',
                        marginLeft: '10px',
                        width: '70px',
                        height: '70px',
                      }}
                    />
                  </Button>
                </Stack>
              </Stack>

              {/* monkey animation */}
              <Box
                sx={{
                  width: '150px',
                  position: 'absolute',
                  top: '-30px',
                  ml: '150px',
                }}
              >
                <Lottie animationData={Monkey} autoplay={true} />
              </Box>

              {/* Jumping fish animation */}
              <Box
                sx={{
                  width: '150px',
                  position: 'absolute',
                  bottom: '200px',
                  ml: '150px',
                }}
              >
                <Lottie animationData={JumpingFish} autoplay={true} />
              </Box>

              {/* Shark animation */}
              {codeIsRight && (
                <Box
                  sx={{
                    width: '300px',
                    position: 'absolute',
                    bottom: '-20px',
                  }}
                >
                  <Lottie animationData={Shark} autoplay={true} loop={false} />
                </Box>
              )}
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGift && (
          <motion.div
            key="check"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5 }}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          >
            <GiftBoxAnimation />
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255,255,255,0.75)',
            zIndex: 99999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            <Box sx={{ width: 200, height: 200 }}>
              <Lottie animationData={Loading} loop autoplay />
            </Box>
          </Typography>
        </Box>
      )}
    </>
  );
};

export default CheckVerificationCode;
