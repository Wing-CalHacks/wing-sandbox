import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { SelectChangeEvent } from '@mui/material';

const Container = styled('div')({
  display: 'flex',
  height: '100vh',
});

const Overlay = styled('div')({
  position: 'relative',
  flex: 1,
});

const LeftHalf = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '50%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const BlackBox = styled('div')({
  flex: '60%',
  padding: '16px',
  position: 'relative',
});

const RedBox = styled('div')({
  flex: '40%',
  backgroundColor: 'red',
});

const ColorfulDiv = styled('div')<{ color: string }>(({ color }) => ({
  position: 'absolute',
  top: '80px',
  left: '16px',
  right: '16px',
  bottom: '16px',
  backgroundColor: color,
}));

const options = [
  { value: 10, label: 'Ten', color: 'blue' },
  { value: 20, label: 'Twenty', color: 'green' },
  { value: 30, label: 'Thirty', color: 'orange' },
];

const theme = createTheme({
  typography: {
    fontWeightBold: 700,
  },
});

const AnalyticsView = () => {
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setAge(event.target.value);
  };

  const selectedOption = options.find((option) => option.value === Number(age));

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <CssBaseline />
        <Overlay>
          <LeftHalf>
            <BlackBox>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Pro</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                  sx={{
                    minWidth: 120, // Adjust the width as needed
                  }}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {selectedOption && (
                <ColorfulDiv color={selectedOption.color}>
                  Colorful Div
                </ColorfulDiv>
              )}
            </BlackBox>
            <RedBox />
          </LeftHalf>
        </Overlay>
      </Container>
    </ThemeProvider>
  );
};

export default AnalyticsView;
