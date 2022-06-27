import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IinitialProps } from '../store';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const BarCharts = () => {
  const currentCard = useSelector((state: IinitialProps) => state.currentCard);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Today',
        data: currentCard?.today,
        fill: true,
        borderColor: 'rgba(75,192,192,0.1)',
        backgroundColor: 'rgba(55, 81, 255, 0.1)',
      },
      {
        label: 'Yesterday',
        data: currentCard?.yesterday,
        fill: true,
        borderColor: '#DFE0EB',
      },
    ],
  };
  return <Bar options={options} data={data} />;
};
