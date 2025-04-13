import React from 'react';
import { ResponsiveLine } from '@nivo/line';

interface DataPoint {
  date: string;
  value: number;
}

interface ChartData {
  id: string;
  data: DataPoint[];
}

interface LineChartProps {
  data: ChartData[];
  baseline?: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, baseline }) => {
  // Transform data to the format expected by nivo
  const transformedData = data.map(series => ({
    ...series,
    data: series.data.map(point => ({
      x: new Date(point.date),
      y: point.value
    }))
  }));

  // Check if data spans less than 52 weeks
  const isLessThan52Weeks = () => {
    if (data.length === 0 || data[0].data.length === 0) return false;
    const firstDate = new Date(data[0].data[0].date);
    const lastDate = new Date(data[0].data[data[0].data.length - 1].date);
    const weeksDiff = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24 * 7);
    return weeksDiff < 52;
  };

  // Get unique years or months based on data span
  const getTickValues = () => {
    if (data.length === 0 || data[0].data.length === 0) return [];
    
    if (isLessThan52Weeks()) {
      // For less than 52 weeks, show months
      const months = new Set(data[0].data.map(point => {
        const date = new Date(point.date);
        return new Date(date.getFullYear(), date.getMonth(), 1);
      }));
      return Array.from(months);
    } else {
      // For 52 weeks or more, show years
      const years = new Set(data[0].data.map(point => new Date(point.date).getFullYear()));
      return Array.from(years).map(year => new Date(year, 6, 1)); // Use July 1st of each year
    }
  };

  // Get format for x-axis based on data span
  const getXAxisFormat = () => {
    return isLessThan52Weeks() ? '%b %Y' : '%Y';
  };

  return (
    <ResponsiveLine
      data={transformedData}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'time', format: '%Y-%m-%d', useUTC: false }}
      xFormat="time:%Y-%m-%d"
      yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: getXAxisFormat(),
        tickValues: getTickValues(),
        legend: isLessThan52Weeks() ? 'Month' : 'Year',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Value',
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
      tooltip={({ point }) => (
        <div
          style={{
            background: 'white',
            padding: '9px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ color: point.serieColor }}>
            <strong>{point.serieId}</strong>
          </div>
          <div>Date: {new Date(point.data.x).toLocaleDateString()}</div>
          <div>Value: {point.data.y}</div>
        </div>
      )}
      markers={
        baseline
          ? [
              {
                axis: 'y',
                value: baseline,
                lineStyle: { 
                  stroke: '#ff0000', 
                  strokeWidth: 2,
                  strokeDasharray: '5,5' // This creates the dotted line effect
                },
                legend: 'Baseline',
                legendOrientation: 'horizontal',
                legendPosition: 'right'
              }
            ]
          : undefined
      }
    />
  );
};

export default LineChart;
