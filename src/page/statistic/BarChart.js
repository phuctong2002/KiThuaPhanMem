import { Bar } from "react-chartjs-2";
export const BarChart = ({ chartData }) => {
  return (
    <div className="chart-container h-[400px] w-[400px] flex items-center">
      <Bar
        style={{
            // height: '100%',
        }}
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Thống kê nhân khẩu theo lứa tuổi"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};