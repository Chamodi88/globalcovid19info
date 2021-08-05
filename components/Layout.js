import { Flex, Text, Box, Grid, GridItem, Center } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { Select } from "@chakra-ui/react";
import { useState } from "react";
import LineGraph from "./LineGraph";
import PieChart from "./PieChart";
import { useColorModeValue } from "@chakra-ui/color-mode";

const Layout = ({
	title,
	statsData,
	data,
	latestData,
	graphOptions,
	LatestMetrics,
	pieChartMetrics,
	pieChartLabels,
	pieChartColors,
	demographicData,
	total_vaccines,
	listVaccines,
	graphLineColor,
	graphBackgroundColor,
	initialState,
}) => {
	const subHeadingColor = useColorModeValue(
		"lightPalette.600",
		"darkPalette.300"
	);
	const gridBackgroundColor = useColorModeValue(
		"lightPalette.100",
		"darkPalette.800"
	);
	const gridBorderColor = useColorModeValue(
		"lightPalette.200",
		"darkPalette.700"
	);
	const chartLineColor = useColorModeValue("#E2E8F0", "darkPalette.900");
	const chartLabelColor = useColorModeValue("#F9F9F9", "darkPalette.300");

	const [graphOption, setGraphOption] = useState(initialState);

	const onSelectGraphOption = (e) => {
		const selectedOption = e.target.value;
		setGraphOption(selectedOption);
	};

	return (
		<Grid
			maxWidth="1300px"
			w="99%"
			h={["140vh", "500px"]}
			mt="0.5rem"
			mb="0.5rem"
			templateRows={["repeat(16, 1fr)", "repeat(8, 1fr)"]}
			templateColumns="repeat(7, 1fr)"
			gap={2}
		>
			<GridItem
				colSpan={[2, 1]}
				rowSpan={1}
				borderWidth="1px"
				bg={gridBackgroundColor}
				borderColor={gridBorderColor}
				padding={["0.1rem", "0.5rem"]}
				alignItems="center"
			>
				<Text fontSize={["xx-small", "xs"]} color={subHeadingColor}>
					Latest update :
				</Text>
				<Text>{latestData.date}</Text>
			</GridItem>

			<GridItem
				colSpan={[5, 3]}
				rowSpan={1}
				borderWidth="1px"
				bg={gridBackgroundColor}
				borderColor={gridBorderColor}
			>
				<Center h="100%">
					<Heading as="h6" fontSize={["xs", "md", "xl"]}>
						{title}
					</Heading>
				</Center>
			</GridItem>

			<GridItem
				colSpan={[7, 2]}
				rowSpan={1}
				borderWidth="1px"
				bg={gridBackgroundColor}
				borderColor={gridBorderColor}
			>
				<Flex
					h="100%"
					p="0.5rem"
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Text color={subHeadingColor} fontSize={["xx-small", "xs"]}>
						Select a metric :
					</Text>

					<Flex width={["70%", "90%", "60%"]}>
						<Select
							size="xs"
							fontSize={["x-small", "xs"]}
							defaultValue={graphOption}
							onChange={onSelectGraphOption}
							borderColor={useColorModeValue(
								"lightPalette.300",
								"darkPalette.700"
							)}
							bg={useColorModeValue("lightPalette.200", "darkPalette.900")}
							color={useColorModeValue("lightPalette.700", "darkPalette.200")}
							focusBorderColor={useColorModeValue(
								"lightPalette.800",
								"darkPalette.300"
							)}
						>
							{graphOptions.map((item) => (
								<option key={item.value} value={item.value}>
									{item.label}
								</option>
							))}
						</Select>
					</Flex>
				</Flex>
			</GridItem>

			<GridItem
				rowSpan={[7, 7]}
				colSpan={[4, 1]}
				borderWidth="1px"
				bg={gridBackgroundColor}
				borderColor={gridBorderColor}
				padding="0.5rem"
			>
				{demographicData == true ? (
					<>
						<Text color={subHeadingColor} fontSize={["xx-small", "xs"]}>
							Demographic Data
						</Text>
						<Grid w="100%" padding="0.8rem">
							<Center flexDirection="column">
								<Text fontSize={["x-small", "x-small", "xs"]}>
									Population :
								</Text>
								<Text>{parseInt(statsData.population).toLocaleString()}</Text>
							</Center>
							<Center flexDirection="column">
								<Text fontSize={["x-small", "x-small", "xs"]}>
									Population Density :
								</Text>
								<Text>
									{parseFloat(statsData.population_density).toLocaleString()}
								</Text>
							</Center>
							<Center flexDirection="column">
								<Text fontSize={["x-small", "x-small", "xs"]}>
									Median Age :
								</Text>
								<Text>{parseFloat(statsData.median_age).toLocaleString()}</Text>
							</Center>
							<Center flexDirection="column">
								<Text fontSize="xs">Life Expectancy :</Text>
								<Text>
									{parseFloat(statsData.life_expectancy).toLocaleString()}
								</Text>
							</Center>
							<Center flexDirection="column">
								<Text fontSize={["x-small", "x-small", "xs"]}>
									Cardiovasc Death Rate:
								</Text>
								<Text>
									{parseFloat(statsData.cardiovasc_death_rate).toLocaleString()}
								</Text>
							</Center>
							<Center flexDirection="column">
								<Text fontSize={["x-small", "x-small", "xs"]}>
									65 years and older :{" "}
								</Text>
								<Text>
									{parseFloat(statsData.aged_65_older).toLocaleString()} %
								</Text>
							</Center>
							<Center flexDirection="column">
								<Text fontSize={["x-small", "x-small", "xs"]}>
									70 years and older :
								</Text>
								<Text>
									{parseFloat(statsData.aged_70_older).toLocaleString()} %
								</Text>
							</Center>
							<Center flexDirection="column">
								<Text fontSize={["x-small", "x-small", "xs"]}>
									Female Smokers :{" "}
								</Text>
								<Text>
									{parseFloat(statsData.female_smokers).toLocaleString()} %
								</Text>
							</Center>
							<Center flexDirection="column">
								<Text fontSize={["x-small", "x-small", "xs"]}>
									Male Smokers :{" "}
								</Text>
								<Text>
									{parseFloat(statsData.male_smokers).toLocaleString()} %
								</Text>
							</Center>
						</Grid>
					</>
				) : (
					<>
						<Text color={subHeadingColor} fontSize={["xx-small", "xs"]}>
							Total Vaccinations by Manufacturer
						</Text>
						<Center w="95%" h="90%">
							{total_vaccines.length > 0 ? (
								<PieChart
									chartData={total_vaccines}
									chartLabels={listVaccines}
									chartColors={[
										"#F58B83",
										"#FAD182",
										"#BB7AFF",
										"#DE976A",
										"#8CB0FA",
										"#F2FF85",
										"#73D3DE",
										"#82DE73",
										"#9FBDF8",
										"#8CF5C1",
									]}
								/>
							) : (
								<Text>No data</Text>
							)}
						</Center>
					</>
				)}
			</GridItem>

			<GridItem
				rowSpan={[7, 7]}
				colSpan={[3, 1]}
				bg={gridBackgroundColor}
				borderWidth="1px"
				borderColor={gridBorderColor}
				justifyContent="center"
				alignItems="center"
				padding="0.5rem"
			>
				<Text color={subHeadingColor} fontSize={["xx-small", "xs"]}>
					Latest Data
				</Text>
				<Grid w="100%" h="50%">
					{LatestMetrics.map((item) => (
						<Center key={item.value} flexDirection="column">
							<Text>{parseInt(latestData[item.value]).toLocaleString()}</Text>
							<Text>{item.label}</Text>
						</Center>
					))}
				</Grid>
				<Center w="95%" h="45%">
					{pieChartMetrics.map((item) => (
						<PieChart
							key={item.value1}
							chartData={[
								(latestData[item.value1] / statsData.population) * 100,
								(latestData[item.value2] / statsData.population) * 100,
								100 - (latestData[item.value1] / statsData.population) * 100,
							]}
							chartLabels={pieChartLabels}
							chartColors={pieChartColors}
						/>
					))}
				</Center>
			</GridItem>

			<GridItem
				rowSpan={[6, 7]}
				colSpan={[7, 5]}
				borderWidth="1px"
				bg={gridBackgroundColor}
				borderColor={gridBorderColor}
			>
				<Box m="0.5rem" h="100%">
					<LineGraph
						graphData={data}
						selectedOption={graphOption}
						gridColor={chartLineColor}
						labelColor={chartLabelColor}
						lineColor={graphLineColor}
						backgroundColor={graphBackgroundColor}
					/>
				</Box>
			</GridItem>

			<GridItem
				colSpan={[7, 1]}
				rowSpan={1}
				borderWidth="1px"
				bg={gridBackgroundColor}
				borderColor={gridBorderColor}
				padding="0.5rem"
			>
				<Text fontSize={["xx-small", "xs"]} color={subHeadingColor}>
					Source :
				</Text>
				<Text>
					<NextLink href="https://ourworldindata.org/coronavirus" passHref>
						<a target="_blank" rel="noreferrer">
							ourworldindata.org
						</a>
					</NextLink>
				</Text>
			</GridItem>
		</Grid>
	);
};

export default Layout;
