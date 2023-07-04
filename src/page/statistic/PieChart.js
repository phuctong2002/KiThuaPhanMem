import { Pie } from "react-chartjs-2";

function PieChart({ chartData }) {
  return (
    <div  className="chart-container h-[300px] w-[400px]">
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Thống kê số lượng nam nữ trong phường"
            }
          }
        }}
      />
    </div>
  );
}
export default PieChart;
