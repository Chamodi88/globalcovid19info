import { Pie } from "react-chartjs-2";

const PieChart = ({ chartData, chartLabels, chartColors }) => {
	return (
		<Pie
			type="pie"
			data={{
				labels: chartLabels,
				datasets: [
					{
						data: chartData,
						backgroundColor: chartColors,
						borderWidth: 0,
						hoverOffset: 4,
					},
				],
			}}
			options={{
				responsive: true,
				layout: {
					padding: 5,
				},
				maintainAspectRatio: false,
				plugins: {
					legend: {
						position: "bottom",
						labels: {
							font: {
								size: 8,
							},
						},
					},
				},
			}}
		/>
	);
};

export default PieChart;
