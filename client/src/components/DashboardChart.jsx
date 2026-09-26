import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function DashboardChart({ tasks }) {

  const { completed, pending } = useMemo(() => {
    const completed = tasks.filter((task) => task.status === "Completed")
      .length;
    const pending = tasks.filter((task) => task.status === "Pending").length;
    return { completed, pending };
  }, [tasks]);

  const data = {
    labels: ["Completed", "Pending"],

    datasets: [
      {
        data: [completed, pending],

        backgroundColor: [
          "#22c55e",
          "#f59e0b",
        ],

        borderColor: "#ffffff",

        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="chart-card">

      <h2>Task Status</h2>

      <div className="chart-box">

        <Pie
          data={data}
          options={options}
        />

      </div>

    </div>
  );
}

export default DashboardChart;
