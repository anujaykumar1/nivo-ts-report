import { ResponsivePie } from '@nivo/pie';

interface PieChartData {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <div className="chart-container">
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ datum: 'data.color' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#ffffff"
      />
    </div>
  );
};

export default PieChart;
