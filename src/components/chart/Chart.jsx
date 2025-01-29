import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyBillingChart = () => {
  const [selectedYear, setSelectedYear] = useState("2020");
  const bills = useSelector((state) => state.bills);

  const years = useMemo(() => {
    return [...new Set(bills.map((bill) => bill.date.split("-")[2]))];
  }, []);

  const chartData = useMemo(() => {
    const monthlyExpenses = Array(12).fill(0);

    // Filter bills for the selected year and sum amounts per month
    bills.forEach(({ amount, date }) => {
      const [day, month, year] = date.split("-"); // Extract month & year
      if (year === selectedYear) {
        monthlyExpenses[parseInt(month) - 1] += parseInt(amount);
      }
    });

    return {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: `Expenses in ${selectedYear}`,
          data: monthlyExpenses,
          borderColor: "blue",
          backgroundColor: "rgba(0, 0, 255, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, [selectedYear]);

  return (
    <div style={{ width: "600px", margin: "20px auto", textAlign: "center" }}>
      <h2>Monthly Billing Chart</h2>

      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <Line data={chartData} />
    </div>
  );
};

export default MonthlyBillingChart;
