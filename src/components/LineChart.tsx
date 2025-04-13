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
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
      xScale={{ type: 'time', format: '%Y-%m-%d', useUTC: false }}
      xFormat="time:%Y-%m-%d"
      yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
      curve="monotoneX" // Smooth line like PowerBI
      enableArea={false} // Disabled area fill
      enableGridX={true}
      enableGridY={true}
      gridXValues={getTickValues()}
      gridYValues={5} // Show 5 grid lines
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 0,
        format: getXAxisFormat(),
        tickValues: getTickValues(),
        legend: isLessThan52Weeks() ? 'Month' : 'Year',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 0,
        legend: 'Value',
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      colors={['#0078d4']} // PowerBI blue
      lineWidth={2}
      pointSize={0} // Hide points by default
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      enablePoints={false} // Hide points by default
      useMesh={true}
      enableCrosshair={true} // Show crosshair on hover
      crosshairType="cross" // Show both vertical and horizontal lines
      theme={{
        axis: {
          ticks: {
            text: {
              fill: '#666666',
              fontSize: 12,
              fontFamily: 'Segoe UI, sans-serif'
            }
          },
          legend: {
            text: {
              fill: '#666666',
              fontSize: 14,
              fontFamily: 'Segoe UI, sans-serif'
            }
          }
        },
        grid: {
          line: {
            stroke: '#e0e0e0',
            strokeWidth: 1
          }
        },
        crosshair: {
          line: {
            stroke: '#666666',
            strokeWidth: 1,
            strokeDasharray: '4 4'
          }
        }
      }}
      tooltip={({ point }) => (
        <div
          style={{
            background: 'white',
            padding: '8px 12px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            fontSize: '12px',
            fontFamily: 'Segoe UI, sans-serif'
          }}
        >
          <div style={{ color: point.serieColor, fontWeight: 'bold' }}>
            {point.serieId}
          </div>
          <div style={{ color: '#666666' }}>
            {new Date(point.data.x).toLocaleDateString()}
          </div>
          <div style={{ color: '#666666' }}>
            Value: {point.data.y}
          </div>
        </div>
      )}
      markers={
        baseline
          ? [
              {
                axis: 'y',
                value: baseline,
                lineStyle: { 
                  stroke: '#666666', 
                  strokeWidth: 1,
                  strokeDasharray: '4 4' // Subtle dotted line
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
