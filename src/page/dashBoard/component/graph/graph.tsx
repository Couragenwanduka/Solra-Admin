import { BarChart } from '@mui/x-charts/BarChart';
import { legendClasses } from '@mui/x-charts/ChartsLegend';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

export default function SimpleBarChart() {
  return (
    <BarChart
      skipAnimation
      width={630}
      height={330}
      series={[
        {
          data: uData,
          label: 'User Visits',
          color: '#ffac9d',
        },
      ]}
      xAxis={[
        {
          scaleType: 'band',
          data: xLabels,
        },
      ]}
      sx={{
        background: 'linear-gradient(to bottom, #191919, #141414)',
        borderRadius: '8px',
        padding: '1rem',
        [`& .${legendClasses.root}`]: {
          display: 'none',
        },
        [`& .${axisClasses.root}`]: {
          [`.${axisClasses.tick}, .${axisClasses.line}`]: {
            stroke: '#98989a', // White axis lines and ticks
            strokeWidth: 2,    // Thickness of axis lines and ticks
          },
          [`.${axisClasses.tickLabel}`]: {
            fill: '#98989a',   // White tick labels
            fontSize: '12px',  // Optional: Adjust font size for labels
          },
        },
      }}
    />
  );
}
