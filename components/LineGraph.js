import { Line } from "react-chartjs-2";

const LineGraph = ({ graphData, selectedOption, gridColor, labelColor }) => {
	const filteredData = graphData.map((record) => ({
		date: record.date,
		[selectedOption]: record[selectedOption],
	}));

	const label =
		selectedOption.split("_")[0] + " " + selectedOption.split("_")[1];

	return (
		<>
			<Line
				type="line"
				data={{
					labels: filteredData.map((d) => d.date),
					datasets: [
						{
							label: label,
							data: filteredData.map((x) => x[selectedOption]),
							fill: true,
							lineTension: 0.5,
							backgroundColor: "#db86b2",
							borderColor: "#B57295",
							borderCapStyle: "butt",
							borderDashOffset: 0.0,
							borderJoinStyle: "#B57295",
							pointBorderColor: "#B57295",
							pointBackgroundColor: "#fff",
							pointBorderWidth: 1,
							pointHoverRadius: 5,
							pointHoverBackgroundColor: "#B57295",
							pointHoverBorderColor: "#B57295",
							pointHoverBorderWidth: 2,
							pointRadius: 1,
							pointHitRadius: 10,
						},
					],
				}}
				options={{
					responsive: true,
					layout: {
						padding: 5,
					},
					maintainAspectRatio: false,
					scales: {
						y: {
							beginAtZero: true,
							title: { display: true, text: "# of cases", color: labelColor },
							grid: { color: gridColor },
						},
						x: {
							title: { display: true, text: "date", color: labelColor },
							grid: { color: gridColor },
						},
					},
					plugins: {
						legend: {
							display: false,
						},
					},
				}}
			/>
		</>
	);
};

export default LineGraph;
