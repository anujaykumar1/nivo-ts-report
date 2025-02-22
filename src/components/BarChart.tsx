import { ResponsiveBar } from '@nivo/bar';

interface BarChartData {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarChartData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <div className="chart-container">
      <ResponsiveBar
        data={data}
        keys={['value']}
        indexBy="label"
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Category',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Value',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
      />
    </div>
  );
};

export default BarChart;
