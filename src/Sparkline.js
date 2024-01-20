import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

export const SparklineChart = ({ sparklineData, lineColor, fillColor, titleData}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartCanvas = chartRef.current.getContext('2d');
    const chart = new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: sparklineData.map((_, index) => index), // Or another labeling scheme
        datasets: [{
          data: sparklineData,
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
              text: 'USD Value', // Replace with your x-axis label
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

    return () => chart.destroy(); // Clean up the chart instance on unmount
  }, [sparklineData]);

  return <canvas ref={chartRef}></canvas>;
};