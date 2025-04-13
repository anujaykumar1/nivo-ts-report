# Vite with Chart

A React application built with Vite that demonstrates interactive chart visualizations using Nivo charts.

## Features

- Interactive line charts with time-series data
- Dynamic x-axis formatting based on data range:
  - Shows months when data spans less than 52 weeks
  - Shows years when data spans 52 weeks or more
- Baseline visualization with dotted line
- Responsive design
- Tooltips with detailed information
- Weekly data granularity

## Components

### LineChart
A reusable line chart component that:
- Accepts time-series data
- Supports baseline visualization
- Automatically formats x-axis based on data range
- Provides interactive tooltips
- Is fully responsive

### Demo3
The main demonstration component that:
- Shows weekly revenue data for the last 6 months
- Includes a baseline at 145
- Demonstrates the month-based x-axis formatting

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vite-with-chart
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── LineChart.tsx    # Reusable chart component
│   └── Demo3.tsx        # Main demonstration component
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── App.css              # Global styles
```

## Technologies Used

- React
- Vite
- TypeScript
- Nivo Charts
- CSS

## Customization

### Modifying the Chart

To modify the chart appearance or behavior, edit the `LineChart` component in `src/components/LineChart.tsx`. Key customization options include:

- Chart margins
- Axis formatting
- Point styling
- Tooltip content
- Baseline appearance

### Changing the Data

To update the data shown in the chart, modify the `chartData` array in `src/components/Demo3.tsx`. The data format should be:

```typescript
{
  id: string,
  data: Array<{
    date: string,  // Format: 'YYYY-MM-DD'
    value: number
  }>
}
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
