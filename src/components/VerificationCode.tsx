import React, { useState, useRef } from 'react';
import { TextField, Box, Stack } from '@mui/material';
import { useMediaQuery } from '@mui/material';

const VerificationCode = ({ values, setValues, codeIsRight }) => {
  const inputsRef = useRef([]);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleChange = (index, event) => {
    const val = event.target.value;
    const newValues = [...values];
    newValues[index] = val;
    setValues(newValues);

    // Move to next input if value entered
    if (val && index < 5) {
      //@ts-ignore
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !values[index] && index > 0) {
      //@ts-ignore
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <Stack
      sx={{
        width: '85%',
        alignItems: 'center',
      }}
    >
      <Box display="flex" gap={isMobile ? 1 : 2}>
        {values.map((value, index) => (
          <TextField
            sx={{
              background:
                codeIsRight === true
                  ? '#a7e37f'
                  : codeIsRight === false
                  ? '#ffcfbf'
                  : '#e7e8df',
              borderRadius: '8px',

              // Effetto incisione
              boxShadow: `
              inset 2px 2px 4px rgba(0,0,0,0.35),
              inset -2px -2px 4px rgba(255,255,255,0.4)
            `,

              '& .MuiInputBase-input': {
                textTransform: 'uppercase',
                color: '#3a2a1a',
                fontWeight: 600,

                // Testo inciso
                textShadow: `
                1px 1px 1px rgba(0,0,0,0.4),
                -1px -1px 1px rgba(255,255,255,0.5)
              `,
              },

              '&::placeholder': {
                color: '#5a4633',
                opacity: 0.7,
              },
            }}
            key={index}
            inputRef={(el) =>
              //@ts-ignore
              (inputsRef.current[index] = el)
            }
            value={value}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            inputProps={{
              maxLength: 1,
              style: {
                height: '45px',
                width: 45,
                textAlign: 'center',
                fontSize: 28,
                padding: 0,
                lineHeight: '45px',
              },
            }}
            variant="outlined"
            size="small"
          />
        ))}
      </Box>
    </Stack>
  );
};

export default VerificationCode;
