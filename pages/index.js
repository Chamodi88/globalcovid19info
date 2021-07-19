import { Flex, Text, Box, Grid, GridItem, Center } from "@chakra-ui/layout";
import Head from "next/head";
import { Heading } from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import { SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { Select } from "@chakra-ui/react";
import { useState } from "react";
import LineGraph from "../components/LineGraph";
import PieChart from "../components/PieChart";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { getCountryCodeISO2 } from "../functions/functions";
import { Divider } from "@chakra-ui/react";

const MotionBox = motion(Box);

export default function Home({
	countries,
	countryList,
	worldStats,
	globalData,
	latestGlobalInfectionData,
	latestGlobalVaccinationData,
	vaccinesData,
}) {
	const subHeadingColor = useColorModeValue("#212121", "#ffff");
	const gridBackgroundColor = useColorModeValue("gray.50", "#272727");
	const gridBorderColor = useColorModeValue("gray.200", "gray.900");
	const chartLineColor = useColorModeValue("#E2E8F0", "#00000");
	const chartLabelColor = useColorModeValue("#00000", "#E2E8F0");

	const [infectionGraphOption, setInfectionGraphOption] =
		useState("total_cases");
	const [vaccinationGraphOption, setVaccinationGraphOption] =
		useState("new_vaccinations");
	const [selectedCountry, setSelectedCountry] = useState(countries);

	const onSelectInfectionGraphOption = (e) => {
		const selectedOption = e.target.value;
		setInfectionGraphOption(selectedOption);
	};

	const onSelectVaccinationGraphOption = (e) => {
		const selectedOption = e.target.value;
		setVaccinationGraphOption(selectedOption);
	};

	const selected = (e) => {
		const countryName = e.target.value;
		if (countryName != "") {
			const filteredCountry = countries.filter(function (c) {
				return c.location == countryName;
			});
			setSelectedCountry(filteredCountry);
		} else {
			setSelectedCountry(countries);
		}
	};

	var list = [];
	var vacCountries = vaccinesData.map((c) => c.location);
	let uniqueVacCountries = [...new Set(vacCountries)];
	for (var country in uniqueVacCountries) {
		const countryData = vaccinesData.filter(
			(c) => c.location == uniqueVacCountries[country]
		);

		const lastDate = countryData.map((d) => d.date)[countryData.length - 1];
		const lastUpdate = countryData.filter((c) => c.date == lastDate);
		list.push(lastUpdate);
	}

	let vaccines = list.flat().map((v) => v.vaccine);
	let listVaccines = [...new Set(vaccines)];
	let total_vaccines = [];
	for (var v in listVaccines) {
		const vaccineData = list
			.flat()
			.filter((i) => i.vaccine == listVaccines[v])
			.map((n) => parseInt(n.totalvaccinations))
			.reduce((a, b) => a + b);
		total_vaccines.push(vaccineData);
	}

	return (
		<>
			<Head>
				<title>Covid19Info</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			{/* infection data */}
			<Grid
				maxWidth="1300px"
				w="99%"
				h="500px"
				mt="0.5rem"
				mb="0.5rem"
				templateRows="repeat(8, 1fr)"
				templateColumns="repeat(7, 1fr)"
				gap={2}
			>
				<GridItem
					colSpan={1}
					rowSpan={1}
					borderWidth="1px"
					bg={gridBackgroundColor}
					borderColor={gridBorderColor}
				>
					<Text fontSize="xs">Latest update :</Text>
					<Text>{latestGlobalInfectionData.date}</Text>
				</GridItem>

				<GridItem
					colSpan={3}
					borderWidth="1px"
					bg={gridBackgroundColor}
					borderColor={gridBorderColor}
				>
					<Center h="100%">
						<Heading as="h6" fontSize="xl" color={subHeadingColor}>
							Global Infection Data
						</Heading>
					</Center>
				</GridItem>
				<GridItem
					colSpan={3}
					borderWidth="1px"
					bg={gridBackgroundColor}
					borderColor={gridBorderColor}
				>
					<Flex
						h="100%"
						p="1rem"
						flexDirection="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Text>Select a metric: </Text>

						<Flex width={["90%", "90%", "40%"]}>
							<Select
								size="xs"
								defaultValue="total_cases"
								onChange={onSelectInfectionGraphOption}
								borderColor="gray.800"
								bg={useColorModeValue("gray.200", "gray.900")}
								color={useColorModeValue("gray.800", "gray.400")}
							>
								<option value="new_cases">New Cases</option>
								<option value="new_deaths">New Deaths</option>
								<option value="total_cases">Total Cases</option>
								<option value="total_deaths">Total Deaths</option>
								<option value="new_cases_per_million">
									New Cases per Million
								</option>
								<option value="new_deaths_per_million">
									New Deaths per Million
								</option>
								<option value="total_cases_per_million">
									Total Cases per Million
								</option>
								<option value="total_deaths_per_million">
									Total Deaths per Million
								</option>
							</Select>
						</Flex>
					</Flex>
				</GridItem>

				<GridItem
					rowSpan={7}
					colSpan={1}
					bg={gridBackgroundColor}
					borderWidth="1px"
					borderColor={gridBorderColor}
					justifyContent="center"
					alignItems="center"
				>
					<Text> Latest Data </Text>
					<Grid w="100%" h="50%">
						<Center flexDirection="column">
							<Text>
								{parseInt(latestGlobalInfectionData.new_cases).toLocaleString()}
							</Text>
							<Text>New Cases</Text>
						</Center>
						<Center flexDirection="column">
							<Text>
								{parseInt(
									latestGlobalInfectionData.new_deaths
								).toLocaleString()}
							</Text>
							<Text>New Deaths </Text>
						</Center>
						<Center flexDirection="column">
							<Text>
								{parseInt(
									latestGlobalInfectionData.total_cases
								).toLocaleString()}
							</Text>
							<Text>Total Cases </Text>
						</Center>
						<Center flexDirection="column">
							<Text>
								{parseInt(
									latestGlobalInfectionData.total_deaths
								).toLocaleString()}
							</Text>
							<Text>Total Deaths </Text>
						</Center>
					</Grid>
					<Center w="95%" h="45%">
						<PieChart
							chartData={[
								(latestGlobalInfectionData.total_cases /
									worldStats.population) *
									100,
								(latestGlobalInfectionData.total_deaths /
									worldStats.population) *
									100,
								100 -
									(latestGlobalInfectionData.total_cases /
										worldStats.population) *
										100 -
									(latestGlobalInfectionData.total_deaths /
										worldStats.population) *
										100,
							]}
							chartLabels={[
								"% Total Cases",
								"% Total Deaths",
								"% Total Uninfected",
							]}
							chartColors={[
								"rgb(255, 99, 132)",
								"rgb(54, 162, 235)",
								"rgb(255, 205, 86)",
							]}
						/>
					</Center>
				</GridItem>
				<GridItem
					rowSpan={7}
					colSpan={5}
					borderWidth="1px"
					bg={gridBackgroundColor}
					borderColor={gridBorderColor}
				>
					<Box m="0.5rem" h="100%">
						<LineGraph
							graphData={globalData}
							selectedOption={infectionGraphOption}
							gridColor={chartLineColor}
							labelColor={chartLabelColor}
						/>
					</Box>
				</GridItem>
				<GridItem
					rowSpan={6}
					colSpan={1}
					borderWidth="1px"
					bg={gridBackgroundColor}
					borderColor={gridBorderColor}
				>
					<Text> Demographic Data </Text>
					<Grid w="100%" justifyContent="center" alignItems="center">
						<Center flexDirection="column">
							<Text fontSize="xs">Population : </Text>
							<Text fontSize="xs">
								{parseInt(worldStats.population).toLocaleString()}
							</Text>
						</Center>
						<Center flexDirection="column">
							<Text fontSize="xs">Population Density :</Text>
							<Text fontSize="xs">
								{parseFloat(worldStats.population_density).toLocaleString()}
							</Text>
						</Center>
						<Center flexDirection="column">
							<Text fontSize="xs">Median Age :</Text>
							<Text fontSize="xs">
								{parseFloat(worldStats.median_age).toLocaleString()}
							</Text>
						</Center>
						<Center flexDirection="column">
							<Text fontSize="xs">Life Expectancy :</Text>
							<Text fontSize="xs">
								{parseFloat(worldStats.life_expectancy).toLocaleString()}
							</Text>
						</Center>
						<Center flexDirection="column">
							<Text fontSize="xs">Cardiovasc Death Rate :</Text>
							<Text fontSize="xs">
								{parseFloat(worldStats.cardiovasc_death_rate).toLocaleString()}
							</Text>
						</Center>
						<Center flexDirection="column">
							<Text fontSize="xs">65 years and older : </Text>
							<Text fontSize="xs">
								{parseFloat(worldStats.aged_65_older).toLocaleString()} %
							</Text>
						</Center>
						<Center flexDirection="column">
							<Text fontSize="xs">70 years and older :</Text>
							<Text fontSize="xs">
								{parseFloat(worldStats.aged_70_older).toLocaleString()} %
							</Text>
						</Center>
						<Center flexDirection="column">
							<Text fontSize="xs">Female Smokers : </Text>
							<Text fontSize="xs">
								{parseFloat(worldStats.female_smokers).toLocaleString()} %
							</Text>
						</Center>
						<Center flexDirection="column">
							<Text fontSize="xs">Male Smokers : </Text>
							<Text fontSize="xs">
								{parseFloat(worldStats.male_smokers).toLocaleString()} %
							</Text>
						</Center>
					</Grid>
				</GridItem>
				<GridItem
					colSpan={1}
					rowSpan={1}
					borderWidth="1px"
					bg={gridBackgroundColor}
					borderColor={gridBorderColor}
				>
					<Text fontSize="xs">Source : </Text>
					<Text fontSize="xs">
						<NextLink href="https://ourworldindata.org/coronavirus" passHref>
							<a target="_blank" rel="noreferrer">
								ourworldindata.org
							</a>
						</NextLink>
					</Text>
				</GridItem>
			</Grid>

			<Divider margin="1rem" />
			{/* vaccination data */}
			<Grid
				maxWidth="1300px"
				w="99%"
				h="500px"
				mt="0.5rem"
				mb="0.5rem"
				templateRows="repeat(8, 1fr)"
				templateColumns="repeat(7, 1fr)"
				gap={2}
			>
				<GridItem
					colSpan={1}
					rowSpan={1}
					borderWidth="1px"
					bg={gridBackgroundColor}
					borderColor={gridBorderColor}
				>
					<Text fontSize="xs">Latest update :</Text>
					<Text>{latestGlobalVaccinationData.date}</Text>
				</GridItem>

				<GridItem
					colSpan={3}
					borderWidth="1px"
					bg={gridBackgroundColor}
					borderColor={gridBorderColor}
				>
					<Center h="100%">
						<Heading as="h6" fontSize="xl" color={subHeadingColor}>
							Global Vaccination Data
						</Heading>
					</Center>
				</GridItem>
				<GridItem
					colSpan={3}
					borderWidth="1px"
					bg={gridBackgroundColor}
					borderColor={gridBorderColor}
				>
					<Flex
						h="100%"
						p="1rem"
						flexDirection="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Text>Select a metric: </Text>

						<Flex width={["90%", "90%", "40%"]}>
							<Select
								size="xs"
								defaultValue="total_vaccinations"
								onChange={onSelectVaccinationGraphOption}
								borderColor="gray.800"
								bg={useColorModeValue("gray.200", "gray.900")}
								color={useColorModeValue("gray.800", "gray.400")}
							>
								<option value="new_vaccinations">New Vaccinations</option>
								<option value="people_vaccinated">People Vaccinated</option>
								<option value="people_fully_vaccinated">
									People Fully Vaccinated
								</option>
								<option value="total_vaccinations">Total Vaccinations</option>
								<option value="people_vaccinated_per_hundred">
									People Vaccinated per Hundred
								</option>
								<option value="people_fully_vaccinated_per_hundred">
									People Fully Vaccinated per Hundred
								</option>
								<option value="total_vaccinations_per_hundred">
									Total Vaccinated per Hundred
								</option>
							</Select>
						</Flex>
					</Flex>
				</GridItem>

				<GridItem
					rowSpan={7}
					colSpan={1}
					bg={gridBackgroundColor}
					borderWidth="1px"
					borderColor={gridBorderColor}
					justifyContent="center"
					alignItems="center"
				>
					<Text> Latest Data </Text>
					<Grid w="100%" h="50%">
						<Center flexDirection="column">
							<Text>
								{parseInt(
									latestGlobalVaccinationData.people_fully_vaccinated
								).toLocaleString()}
							</Text>
							<Text>People Fully Vaccinated</Text>
						</Center>
						<Center flexDirection="column">
							<Text>
								{parseInt(
									latestGlobalVaccinationData.people_vaccinated
								).toLocaleString()}
							</Text>
							<Text>People Vaccinated </Text>
						</Center>
						<Center flexDirection="column">
							<Text>
								{parseInt(
									latestGlobalVaccinationData.total_vaccinations
								).toLocaleString()}
							</Text>
							<Text>Total Vaccinations </Text>
						</Center>
					</Grid>
					<Center w="95%" h="45%">
						<PieChart
							chartData={[
								(latestGlobalVaccinationData.people_fully_vaccinated /
									worldStats.population) *
									100,
								(latestGlobalVaccinationData.people_vaccinated /
									worldStats.population) *
									100,
								100 -
									(latestGlobalVaccinationData.people_fully_vaccinated /
										worldStats.population) *
										100 -
									(latestGlobalVaccinationData.people_vaccinated /
										worldStats.population) *
										100,
							]}
							chartLabels={[
								"% Fully Vaccinated",
								"% At least 1 dose",
								"% Unvaccinated",
							]}
							chartColors={[
								"rgb(255, 99, 132)",
								"rgb(54, 162, 235)",
								"rgb(255, 205, 86)",
							]}
						/>
					</Center>
				</GridItem>
				<GridItem
					rowSpan={7}
					colSpan={5}
					borderWidth="1px"
					bg={gridBackgroundColor}
					borderColor={gridBorderColor}
				>
					<Box m="0.5rem" h="100%">
						<LineGraph
							graphData={globalData}
							selectedOption={vaccinationGraphOption}
							gridColor={chartLineColor}
							labelColor={chartLabelColor}
						/>
					</Box>
				</GridItem>
				<GridItem
					rowSpan={6}
					colSpan={1}
					borderWidth="1px"
					bg={gridBackgroundColor}
					borderColor={gridBorderColor}
				>
					<Text>Total Vaccinations by Manufacturer </Text>
					<Center w="95%" h="90%">
						<PieChart
							chartData={total_vaccines}
							chartLabels={listVaccines}
							chartColors={[
								"rgb(255, 99, 132)",
								"rgb(54, 162, 235)",
								"rgb(255, 205, 86)",
								"rgb(235, 205, 86)",
								"rgb(225, 205, 86)",
								"rgb(215, 205, 81)",
								"rgb(245, 205, 82)",
								"rgb(255, 205, 84)",
							]}
						/>
					</Center>
				</GridItem>
				<GridItem
					colSpan={1}
					rowSpan={1}
					borderWidth="1px"
					bg={gridBackgroundColor}
					borderColor={gridBorderColor}
				>
					<Text fontSize="xs">Source : </Text>
					<Text fontSize="xs">
						<NextLink href="https://ourworldindata.org/coronavirus" passHref>
							<a target="_blank" rel="noreferrer">
								ourworldindata.org
							</a>
						</NextLink>
					</Text>
				</GridItem>
			</Grid>

			{/* country selection */}

			<Grid
				maxWidth="1300px"
				w="99%"
				h="500px"
				mt="0.5rem"
				mb="0.5rem"
				templateRows="repeat(8, 1fr)"
				templateColumns="repeat(7, 1fr)"
				gap={2}
			>
				<GridItem
					colSpan={5}
					rowSpan={1}
					borderWidth="1px"
					bg={gridBackgroundColor}
					borderColor={gridBorderColor}
				>
					<Center h="100%">
						<Heading as="h6" fontSize="xl" color={subHeadingColor}>
							Explore More Data by Country
						</Heading>
					</Center>
				</GridItem>
				<GridItem
					colSpan={2}
					rowSpan={1}
					borderWidth="1px"
					bg={gridBackgroundColor}
					borderColor={gridBorderColor}
					p="0.5rem"
				>
					<Center>
						<Select
							placeholder="Select a country"
							onChange={selected}
							borderColor="gray.800"
							bg={useColorModeValue("gray.200", "gray.900")}
							color={useColorModeValue("gray.800", "gray.400")}
						>
							{countryList.map((country) => (
								<option key={country} value={country}>
									{country}
								</option>
							))}
						</Select>
					</Center>
				</GridItem>
				<GridItem
					colSpan={7}
					rowSpan={8}
					borderWidth="1px"
					bg={gridBackgroundColor}
					borderColor={gridBorderColor}
				>
					<SimpleGrid
						justifyContent="center"
						columns={[1, 2, 8]}
						spacing={5}
						ml={[5, 8, 10]}
						mr={[5, 8, 10]}
					>
						{selectedCountry.slice(0, 24).map((country) => {
							const countryCode = getCountryCodeISO2(country.iso_code) ?? "AA";

							return (
								<NextLink
									key={country.iso_code}
									href={"/country/" + country.iso_code}
								>
									<MotionBox
										justifyContent="center"
										alignItems="center"
										color="white"
										bg="black"
										m="0.8rem"
										p="0.5em"
										cursor="pointer"
										borderRadius="20px"
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
									>
										<Flex>
											<Image
												src={
													"https://flagcdn.com/" +
													countryCode.toLowerCase() +
													".svg"
												}
												alt={country.location}
												objectFit="cover"
												width="100%"
												height="100%"
											/>
										</Flex>
										<Text color="gray.500">{country.location}</Text>
									</MotionBox>
								</NextLink>
							);
						})}
					</SimpleGrid>
				</GridItem>
			</Grid>

			<Flex direction="column"></Flex>
		</>
	);
}

export async function getServerSideProps(context) {
	const res = await fetch(
		"https://covid.ourworldindata.org/data/owid-covid-data.json"
	);
	const data = await res.json();
	const worldStats = await data.OWID_WRL;
	const globalData = await data.OWID_WRL.data;
	const latestGlobalInfectionData = await globalData[globalData.length - 1];
	const latestGlobalVaccinationData = await globalData[globalData.length - 2];

	const countries = await Object.entries(data)
		.map((obj) => ({
			...obj[1],
			iso_code: obj[0],
		}))
		.filter((obj) => obj.continent != null);

	const countryList = await countries.map((country) => country.location);

	// get vaccinations-by-manufacturer data from spreadsheet
	const response = await fetch(
		"https://spreadsheets.google.com/feeds/list/15qAym1D67E6ZDWP-suHn9YRxTEaiEnF90orxWUUZiBs/1/public/values?alt=json"
	);
	const jsonData = await response.json();
	const vaccinesData = [];
	const rows = jsonData.feed.entry;

	for (const row of rows) {
		const formattedRow = {};

		for (const key in row) {
			if (key.startsWith("gsx$")) {
				formattedRow[key.replace("gsx$", "")] = row[key].$t;
			}
		}
		vaccinesData.push(formattedRow);
	}

	return {
		props: {
			latestGlobalInfectionData,
			latestGlobalVaccinationData,
			worldStats,
			globalData,
			countries,
			countryList,
			vaccinesData,
		},
	};
}
