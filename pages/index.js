import { Flex, Text, Box, Grid, GridItem, Center } from "@chakra-ui/layout";
import Head from "next/head";
import { Heading } from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import { SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { Select } from "@chakra-ui/react";
import { useState } from "react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { getCountryCodeISO2 } from "../functions/functions";
import { Divider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { useBreakpointValue } from "@chakra-ui/react";

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
	const gridBackgroundColor = useColorModeValue(
		"lightPalette.100",
		"darkPalette.800"
	);
	const gridBorderColor = useColorModeValue(
		"lightPalette.200",
		"darkPalette.700"
	);

	const [selectedCountry, setSelectedCountry] = useState(countries);

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

	const slice = useBreakpointValue({ base: 9, sm: 15, md: 24 });

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
			<Layout
				title="Global Infection Data"
				statsData={worldStats}
				data={globalData}
				latestData={latestGlobalInfectionData}
				graphOptions={[
					{ value: "new_cases", label: "New Cases" },
					{ value: "new_deaths", label: "New Deaths" },
					{ value: "total_cases", label: "Total Cases" },
					{ value: "total_deaths", label: "Total Deaths" },
					{ value: "new_cases_per_million", label: "New Cases per Million" },
					{ value: "new_deaths_per_million", label: "	New Deaths per Million" },
					{
						value: "total_cases_per_million",
						label: "Total Cases per Million",
					},
					{
						value: "total_deaths_per_million",
						label: "Total Deaths per Million",
					},
				]}
				LatestMetrics={[
					{ value: "new_cases", label: "New Cases" },
					{ value: "new_deaths", label: "New Deaths" },
					{ value: "total_cases", label: "Total Cases" },
					{ value: "total_deaths", label: "Total Deaths" },
				]}
				pieChartMetrics={[{ value1: "total_cases", value2: "total_deaths" }]}
				pieChartLabels={[
					"% Total Cases",
					"% Total Deaths",
					"% Total Uninfected",
				]}
				pieChartColors={["#FFB0AD", "#AD5653", "#42AD67"]}
				demographicData={true}
				graphLineColor="#AD5653"
				graphBackgroundColor="#FA9692"
				initialState="total_cases"
			/>

			<Divider margin="1rem" />
			{/* vaccination data */}

			<Layout
				title="Global Vaccination Data"
				statsData={worldStats}
				data={globalData}
				latestData={latestGlobalVaccinationData}
				graphOptions={[
					{ value: "new_vaccinations", label: "New Vaccinations" },
					{ value: "people_vaccinated", label: "People Vaccinated" },
					{
						value: "people_fully_vaccinated",
						label: "People Fully Vaccinated",
					},
					{ value: "total_vaccinations", label: "Total Vaccinations" },
					{
						value: "people_vaccinated_per_hundred",
						label: "People Vaccinated per Hundred",
					},
					{
						value: "people_fully_vaccinated_per_hundred",
						label: "People Fully Vaccinated per Hundred",
					},
					{
						value: "total_vaccinations_per_hundred",
						label: "Total Vaccinated per Hundred",
					},
					{
						value: "total_deaths_per_million",
						label: "Total Deaths per Million",
					},
				]}
				LatestMetrics={[
					{
						value: "people_fully_vaccinated",
						label: "People Fully Vaccinated",
					},
					{ value: "people_vaccinated", label: "People Vaccinated" },
					{ value: "total_vaccinations", label: "Total Vaccinations" },
				]}
				pieChartMetrics={[
					{ value1: "people_vaccinated", value2: "people_fully_vaccinated" },
				]}
				pieChartLabels={[
					"% At least 1 dose",
					"% Fully Vaccinated",
					"% Unvaccinated",
				]}
				pieChartColors={["#91FAB5", "#42AD67", "#FA9692"]}
				demographicData={false}
				total_vaccines={total_vaccines}
				listVaccines={listVaccines}
				graphLineColor="#42AD67"
				graphBackgroundColor="#91FAB5"
				initialState="total_vaccinations"
			/>

			<Divider margin="1rem" />
			{/* country selection */}

			<Grid
				maxWidth="1300px"
				w="99%"
				h="400px"
				mt={["0.1rem", "0.5rem"]}
				mb={["0.1rem", "0.5rem"]}
				templateRows="repeat(8, 1fr)"
				templateColumns="repeat(7, 1fr)"
				gap={2}
			>
				<GridItem
					colSpan={[7, 5]}
					rowSpan={[1, 1]}
					borderWidth="1px"
					bg={gridBackgroundColor}
					borderColor={gridBorderColor}
				>
					<Center h="100%">
						<Heading as="h6" fontSize={["sm", "md", "xl"]}>
							Explore More Data by Country
						</Heading>
					</Center>
				</GridItem>
				<GridItem
					colSpan={[7, 2]}
					rowSpan={1}
					borderWidth="1px"
					bg={gridBackgroundColor}
					borderColor={gridBorderColor}
					p={["0.1rem", "0.5rem"]}
				>
					<Center>
						<Select
							size="sm"
							placeholder="Search for a country"
							onChange={selected}
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
						columns={[3, 5, 5, 8]}
						spacing={2}
						alignItems="center"
						mt={[2, 2, 3, 4]}
						ml={[2, 2, 3, 10]}
						mr={[2, 2, 3, 10]}
					>
						{selectedCountry.slice(0, slice).map((country) => {
							const countryCode = getCountryCodeISO2(country.iso_code) ?? "AA";

							return (
								<NextLink
									key={country.iso_code}
									href={"/country/" + country.iso_code}
								>
									<MotionBox
										justifyContent="center"
										alignItems="center"
										m="0.5rem"
										pt="0.3em"
										cursor="pointer"
										borderRadius="10px"
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
									>
										<Flex
											direction="column"
											justifyContent="center"
											alignItems="center"
										>
											<Image
												src={
													"https://flagcdn.com/" +
													countryCode.toLowerCase() +
													".svg"
												}
												alt={country.location}
												objectFit="cover"
												width="85px"
												height="50px"
											/>
											<Text fontSize="xs">{country.location}</Text>
										</Flex>
									</MotionBox>
								</NextLink>
							);
						})}
					</SimpleGrid>
				</GridItem>
			</Grid>
		</>
	);
}

export async function getStaticProps(context) {
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
		"https://spreadsheets.google.com/feeds/list/15qAym1D67E6ZDWP-suHn9YRxTEaiEnF90orxWUUZiBs/1/public/values?alt=json",
		{
			headers: {
				Accept: "application/atom+xml,application/json, text/plain, */*",
				"User-Agent": "*",
			},
		}
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
		revalidate: 1,
	};
}
