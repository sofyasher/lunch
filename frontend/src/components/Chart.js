import React from 'react';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ data }) => {
  let optData = new Map();
  let parsedData = {
    labels: [],
    datasets: [
      {
        label: 'Votes',
        borderWidth: 1,
        data: [],
        backgroundColor: [],
        borderColor: [],
      },
    ],
  };

  data?.forEach((d) => {
    let sum = optData.get(d.restaurantName);
    if (sum) {
      optData.set(d.restaurantName, sum + 1);
    } else {
      optData.set(d.restaurantName, 1);
    }
  });
  optData?.forEach((value, key) => {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    parsedData.labels.push(key);
    parsedData.datasets[0].data.push(value);
    parsedData.datasets[0].backgroundColor.push(color);
    parsedData.datasets[0].borderColor.push(color);
  });
  return (
    <div style={{ width: 250 + 'px' }}>
      <Pie data={parsedData} />
    </div>
  );
};

export default Chart;
