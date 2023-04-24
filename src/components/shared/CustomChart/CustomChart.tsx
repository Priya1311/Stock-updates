/*
 * File: CustomChart.tsx
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 11:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:01:53 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import CircularLoader from '../Loader/CircularLoader';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  data: {
    prices: number[];
    times: Date[];
  };
}

const CustomChart = (props: Props): JSX.Element => {
  const data1 = {
    labels: props?.data?.times.map((i) => moment(i).format('HH:mm:ss')),
    datasets: [
      {
        borderWidth: 2,
        pointBorderWidth: 0,
        pointRadius: 0,
        label: '',
        data: props?.data?.prices.map((i) => i.toFixed(3)),
        borderColor: '#6666ff',
        backgroundColor: '#6666ff',
      },
    ],
  };

  return data1 ? <Line data={data1} options={chartConfig} /> : <CircularLoader />;
};

export default CustomChart;
export const chartConfig = {
  responsive: true,

  scales: {
    x: {
      ticks: { display: false },
      border: { display: false },
      grid: { display: false },
    },
    y: {
      ticks: { display: false },
      border: { display: false },
      grid: { display: false },
    },
  },
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
};
