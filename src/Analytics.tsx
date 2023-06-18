import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Chart } from "chart.js/auto";

const AnalyticsView = () => {
  const chartRef = useRef(null);
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([] as any[]);

  useEffect(() => {
    fetchProductList();
  }, []);

  useEffect(() => {
    if (age !== "") {
      const selectedProduct = products.find((product) => product.name === age);
      if (selectedProduct) {
        const selectedId = selectedProduct.id;
        fetchData(selectedId);
      }
    }
  }, [age, products]);

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

        // Clear the chart
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        // Create a new chart
        createChart(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function createChart(data) {
    const chartCanvas = chartRef.current.getContext("2d");
    new Chart(chartCanvas, {
      type: "line",
      data: {
        labels: data.map((point) => point.timestamp),
        datasets: [
          {
            label: "PV",
            data: data.map((point) => point.pv),
            borderColor: "#8884d8",
            fill: false,
          },
          {
            label: "UV",
            data: data.map((point) => point.uv),
            borderColor: "#82ca9d",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Date/Time",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Value",
            },
          },
        },
      },
    });
  }

  return (
    <div>
      <select value={age} onChange={(event) => setAge(event.target.value)}>
        <option value="">Select a tab</option>
        {products.map((product) => (
          <option key={product.id} value={product.name}>
            {product.name}
          </option>
        ))}
      </select>
      <canvas ref={chartRef} />
    </div>
  );
};

export default AnalyticsView;
