import { useRef, useState } from 'react';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import StackedBarChart from './components/StackedBarChart';
import PieChart from './components/PieChart';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import Table from './components/Table';
import List from './components/List';
import './styles/global.css';
import officeImage from './assets/store.png';

// Sample data for each component
const listData = ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4'];

const stackedBarData = [
  { label: 'Category 1', A: 40, B: 60, C: 20 },
  { label: 'Category 2', A: 30, B: 80, C: 50 },
  { label: 'Category 3', A: 50, B: 20, C: 70 },
];

const pieChartData = [
  { id: 'A', label: 'A', value: 40, color: '#ff6384' },
  { id: 'B', label: 'B', value: 30, color: '#36a2eb' },
  { id: 'C', label: 'C', value: 30, color: '#ffce56' },
];

const lineChartData = [
  { id: 'Series 1', data: [{ x: 'Jan', y: 50 }, { x: 'Feb', y: 80 }, { x: 'Mar', y: 30 }] },
  { id: 'Series 2', data: [{ x: 'Jan', y: 20 }, { x: 'Feb', y: 60 }, { x: 'Mar', y: 90 }] },
];

const barChartData = [
  { label: 'Jan', value: 50 },
  { label: 'Feb', value: 80 },
  { label: 'Mar', value: 30 },
];

const tableData = [
  { Name: 'John', Age: 28, City: 'New York' },
  { Name: 'Jane', Age: 25, City: 'Los Angeles' },
  { Name: 'Mark', Age: 32, City: 'Chicago' },
];



const App: React.FC = () => {
  const [baseline] = useState(50);
 // Function to download PDF
 const contentRef = useRef<HTMLDivElement>(null);

 const downloadPDF = async () => {
  if (!contentRef.current) {
    console.error("contentRef is still null.");
    return;
  }

  try {
    const canvas = await html2canvas(contentRef.current, { scale: 2 });

    const imgWidth = 210; // A4 page width in mm
    const pageHeight = 297; // A4 page height in mm

    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Scale the image
    const pdf = new jsPDF("p", "mm", "a4");

    let heightLeft = imgHeight;
    let position = 0;

    while (heightLeft > 0) {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      if (heightLeft > 0) {
        pdf.addPage();
        position -= pageHeight;
      }
    }

    pdf.save("report.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

  return (
    <>
    <div className="container" ref={contentRef}>
      <h1>Data Visualization Dashboard</h1>
      <div className="list-image-container">

      {/* 1. List */}
      <h2>Technology List</h2>
      <List items={listData} />

      {/* 2. Image Placeholder */}
      <div className="image-container">
      <img src={officeImage} alt="Placeholder" />
      </div>
</div>
      {/* 3. Stacked Bar Chart */}
      <h2>Stacked Bar Chart</h2>
      <StackedBarChart data={stackedBarData} baseline={baseline}/>

      {/* 4. Pie Chart */}
      <h2>Pie Chart</h2>
      <PieChart data={pieChartData} />

      {/* 5. Line Chart with Baseline */}
      <h2>Line Chart (With Baseline)</h2>
      <LineChart data={lineChartData} baseline={baseline} />

      {/* 6. Others - Bar Chart & Table */}
      <h2>Bar Chart</h2>
      <BarChart data={barChartData} />

      <h2>Data Table</h2>
      <Table data={tableData} />

      </div>
      <div>
      <button className="download-btn" onClick={downloadPDF}>
        Download PDF
      </button>
      </div>
    </>
  );
};

export default App;
