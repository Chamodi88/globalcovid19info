import React from "react";
import { Line } from "react-chartjs-2";

export const LineChart = ({ countryMonth }) => {
	return (
		<>
			<Line
				data={{
					labels: countryMonth.map((month) => {
						return month.Date.split("T")[0];
					}),
					datasets: [
						{
							label: "Daily Cases",
							data: countryMonth.map((month) => {
								return month.Cases;
							}),
							fill: true,
							backgroundColor: "rgba(255,99, 132, 0.2)",
							borderColor: "black",
							pointBackgroundColor: "black",
						},
					],
				}}
				height={400}
				width={600}
				options={{
					maintainAspectRatio: false,
					scales: {
						y: {
							beginAtZero: true,
							suggestedMax:
								Math.max(
									...countryMonth.map((month) => {
										return month.Cases;
									})
								) * 2,
						},
					},
				}}
			/>
		</>
	);
};
