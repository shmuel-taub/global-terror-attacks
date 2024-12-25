import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { IBar } from "../../Types";



interface PropsType {
  bars: IBar[];
  height: number;
  // barSize: number
}

export default function DisplayGraph({ bars, height }: PropsType) {
  const renderCustomBarLabel = ({
    x,
    y,
    width,
    value,
  }: {
    x: number;
    y: number;
    width: number;
    value: number;
  }) => {
    return (
      <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>
        {value}
      </text>
    );
  };
  return (
    <div>
      <BarChart width={1000} height={height} barGap={10} data={bars}>
        <XAxis dataKey="value" />
        <YAxis />
        <Bar
          dataKey="attacksNum"
          // barSize={barSize}
          fill="#8884d8"
          label={renderCustomBarLabel}
        />
      </BarChart>
    </div>
  );
}
