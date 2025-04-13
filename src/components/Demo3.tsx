import React from 'react';
import LineChart from './LineChart';

const Demo3: React.FC = () => {
  // Static JSON data with weekly granularity for the last few months
  const chartData = [
    {
      id: 'Revenue',
      data: [
        // Last 6 months of 2023
        { date: '2023-07-01', value: 130 },
        { date: '2023-07-08', value: 135 },
        { date: '2023-07-15', value: 140 },
        { date: '2023-07-22', value: 145 },
        { date: '2023-07-29', value: 150 },
        { date: '2023-08-01', value: 160 },
        { date: '2023-08-08', value: 165 },
        { date: '2023-08-15', value: 170 },
        { date: '2023-08-22', value: 175 },
        { date: '2023-08-29', value: 180 },
        { date: '2023-09-01', value: 170 },
        { date: '2023-09-08', value: 175 },
        { date: '2023-09-15', value: 180 },
        { date: '2023-09-22', value: 185 },
        { date: '2023-09-29', value: 190 },
        { date: '2023-10-01', value: 180 },
        { date: '2023-10-08', value: 185 },
        { date: '2023-10-15', value: 190 },
        { date: '2023-10-22', value: 195 },
        { date: '2023-10-29', value: 200 },
        { date: '2023-11-01', value: 140 },
        { date: '2023-11-08', value: 145 },
        { date: '2023-11-15', value: 150 },
        { date: '2023-11-22', value: 155 },
        { date: '2023-11-29', value: 160 },
        { date: '2023-12-01', value: 150 },
        { date: '2023-12-08', value: 155 },
        { date: '2023-12-15', value: 160 },
        { date: '2023-12-22', value: 165 },
        { date: '2023-12-29', value: 170 }
      ]
    }
  ];

  return (
    <div>
      <h2>Demo 3: Recent Revenue Data (Last 6 Months)</h2>
      <div style={{ height: '500px' }}>
        <LineChart 
          data={chartData} 
          baseline={145} 
        />
      </div>
    </div>
  );
};

export default Demo3; 