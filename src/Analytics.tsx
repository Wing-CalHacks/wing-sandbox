import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  CssBaseline,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material";
import { log } from "console";

const Container = styled("div")({
  display: "flex",
  height: "100vh",
});

const Overlay = styled("div")({
  position: "relative",
  flex: 1,
});

const LeftHalf = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "50%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const BlackBox = styled("div")({
  flex: "60%",
  padding: "16px",
  position: "relative",
});

const RedBox = styled("div")({
  flex: "40%",
  backgroundColor: "red",
});

const ColorfulDiv = styled("div")<{ color: string }>(({ color }) => ({
  position: "absolute",
  top: "80px",
  left: "16px",
  right: "16px",
  bottom: "16px",
  backgroundColor: color,
}));

const options = [
  { value: 10, label: "Ten", color: "blue" },
  { value: 20, label: "Twenty", color: "green" },
  { value: 30, label: "Thirty", color: "orange" },
];

const theme = createTheme({
  typography: {
    fontWeightBold: 700,
  },
});

const AnalyticsView = () => {
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);
  const [nextPoints, setNextPoints] = useState<Array<[Date, number]>>([]);
  const [products, setProducts] = useState([] as any[]);
  const [nameOptions, setNameOptions] = useState<string[]>([]);


  const handleChange = (event: SelectChangeEvent<string>) => {
    setAge(event.target.value);
  const selectedValue = event.target.value;
  const selectedProduct = products.find(product => product.name === selectedValue);

  if (selectedProduct) {
    const selectedId = selectedProduct.id;
    var a =fetchData(selectedId);
    console.log()
  }    //TODO: get ID instead
  };
  

    useEffect(() => {
    fetchProductList();
  }, []);


  const selectedOption = options.find((option) => option.value === Number(age));

    async function fetchProductList() {
    // Your API call function goes here
    const endpoint = "http://localhost:8080/productlist";
    axios
      .get(endpoint)
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async function fetchData(id: any) {
    const endpoint = "http://localhost:8080/clicks";
    const requestBody = {
      product_id: id,
    };
    axios
      .post(endpoint, requestBody)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function calcNextPoint() {
    const convertedData = data.map(([date, value]) => [
      new Date(date).getTime(),
      value,
    ]);

    const xData = convertedData.map((point) => point[0]);
    const yData = convertedData.map((point) => point[1]);

    const sumX = xData.reduce((sum, x) => sum + x, 0);
    const sumY = yData.reduce((sum, y) => sum + Math.log(y), 0);
    const sumXX = xData.reduce((sum, x) => sum + x * x, 0);
    const sumXY = xData.reduce((sum, x, i) => sum + x * Math.log(yData[i]), 0);

    const n = xData.length;
    const denominator = n * sumXX - sumX * sumX;
    const b = (n * sumXY - sumX * sumY) / denominator;
    const a = Math.exp((sumY - b * sumX) / n);

    // Predict the next 3 points
    const nPoints: [Date, number][] = [];
    for (let i = 1; i <= 3; i++) {
      const nextX = xData[xData.length - 1] + i * (xData[1] - xData[0]);
      const nextY = a * Math.exp(b * nextX);
      nPoints.push([new Date(nextX), nextY]);
    }

    setNextPoints(nPoints);
  }
  // fetchData();
  // calcNextPoint();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <CssBaseline />
        <Overlay>
          <LeftHalf>
            <BlackBox>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Search</InputLabel>
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
                  {products.map((product) => (
                    <MenuItem key={product.name} value={product.name}>
                      {product.name}
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
