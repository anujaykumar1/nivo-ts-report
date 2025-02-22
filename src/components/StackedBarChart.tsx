import { ResponsiveBar } from '@nivo/bar';

interface ChartData {
  label: string;
  A: number;
  B: number;
  C: number;
}

interface StackedBarChartProps {
  data: ChartData[];
  baseline:number;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({ data ,baseline}) => {
  return (
    <div className="chart-container">
      <ResponsiveBar
        data={data}
        layout="horizontal"
        keys={['A', 'B', 'C']}
        indexBy="label"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 120,
            itemWidth: 100,
            itemHeight: 20,
          },
        ]}
        markers={[
          {
            axis: 'x',
            value: baseline,
            lineStyle: { stroke: 'black', strokeWidth: 2, 
              strokeDasharray: "6 4"  },
            legend: `Base Line text ${baseline}`,
            legendPosition: 'top-left',
            textStyle: { fontSize: 12, fill: 'black' },
          },
        ]}
      />
    </div>
  );
};

export default StackedBarChart;
