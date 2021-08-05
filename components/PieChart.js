import { useColorModeValue } from "@chakra-ui/react";
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
					padding: 3,
				},
				maintainAspectRatio: false,
				plugins: {
					legend: {
						position: "bottom",
						labels: {
							font: {
								size: 9,
								color: useColorModeValue("lightPalette.300", "darkPalette.200"),
							},
						},
					},
				},
			}}
		/>
	);
};

export default PieChart;
