import { ResponsiveLine } from '@nivo/line';

interface LineChartData {
  id: string;
  data: { x: string | number; y: number }[];
}

interface LineChartProps {
  data: LineChartData[];
  baseline: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, baseline }) => {
  return (
    <div className="chart-container">
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'X Axis',
          legendPosition: 'middle',
          legendOffset: 30,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Y Axis',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        markers={[
          {
            axis: 'y',
            value: baseline,
            lineStyle: { stroke: 'red', strokeWidth: 2 },
            legend: 'Base Line',
            legendPosition: 'top-left',
            textStyle: { fontSize: 12, fill: 'red' },
          },
        ]}
      />
    </div>
  );
};

export default LineChart;
