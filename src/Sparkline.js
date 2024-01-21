import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

export const SparklineChart = ({coinDetails}) => {
  const chartRef = useRef(null);
  const data = coinDetails?.market_data?.sparkline_7d.price
  const fillColor = coinDetails?.market_data?.price_change_percentage_7d_in_currency.usd >= 0 ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)';
  const lineColor = coinDetails?.market_data?.price_change_percentage_7d_in_currency.usd >= 0 ? 'rgb(0, 255, 0)' : 'rgb(255, 0, 0)';
  const titleData=coinDetails?.name + ' 7D Price Change - USD'


  useEffect(() => {
    const chartCanvas = chartRef.current.getContext('2d');
    const chart = new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: data?.map((_, index) => index), // Or another labeling scheme
        datasets: [{
          data: data,
          borderColor: lineColor, // Example line color
          borderWidth: 1,
          fill: true,
          backgroundColor: fillColor

        }],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Index', // Replace with your x-axis label
            },
          },
          y: {
            title: {
              display: true,
              text: 'USD Value*', // Replace with your x-axis label
            },
          },
        },
        elements: {
          point: {
            radius: 0, // Hide the points
          },
          line: {
            tension: 0.4, // Makes the line smooth
          },
        },
        plugins: {
          legend: {
            display: false, // No legend for sparkline
          },
          title : {
            display: true,
            text: titleData,
            position: 'top',
          },
        },
        maintainAspectRatio: false,
      },
    });

    return () => chart.destroy(); // Clean up  the chart instance on unmount
  }, [data]);

  return <div className='sparkline-container'><canvas ref={chartRef}></canvas></div>;
};