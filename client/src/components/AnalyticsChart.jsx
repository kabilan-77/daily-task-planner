import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function AnalyticsChart({ tasks }) {
  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const high = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const medium = tasks.filter(
    (task) => task.priority === "Medium"
  ).length;

  const low = tasks.filter(
    (task) => task.priority === "Low"
  ).length;

  const pieData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: [
          "#4CAF50",
          "#F44336",
        ],
      },
    ],
  };

  const barData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        label: "Priority Tasks",
        data: [high, medium, low],
        backgroundColor: [
          "#F44336",
          "#FFC107",
          "#4CAF50",
        ],
      },
    ],
  };

  return (
    <div className="chart-card">

      <h2>📊 Analytics</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          marginTop: "20px",
        }}
      >

        <div>
          <Pie data={pieData} />
        </div>

        <div>
          <Bar data={barData} />
        </div>

      </div>

    </div>
  );
}

export default AnalyticsChart;