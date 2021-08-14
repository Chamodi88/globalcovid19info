import Head from "next/head";
import { Heading, Center, Flex,Text } from "@chakra-ui/layout";
import { getCountryCodeISO2 } from "../../functions/functions";
import { Divider } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { getVaccinesData } from "../../lib/api";
import { useColorModeValue } from "@chakra-ui/color-mode";

export default function Slug({ country, countryVaccinesData }) {
	const latestCountryInfectionData = country.data[country.data.length - 1];
	const countryVaccinationData = country.data.filter(
		(c) => c.total_vaccinations > 0
	);
	const latestCountryVaccinationData =
		countryVaccinationData[countryVaccinationData.length - 1];

	const countryCode = getCountryCodeISO2(country.iso_code) ?? "AA";

	const lastDate = countryVaccinesData.map((d) => d.date)[
		countryVaccinesData.length - 1
	];
	const countryVaccines = countryVaccinesData.filter((c) => c.date == lastDate);
	const total_vaccines = countryVaccines.map((c) => c.total_vaccinations);
	const listVaccines = countryVaccines.map((c) => c.vaccine);

	const gridBackgroundColor = useColorModeValue(
		"lightPalette.100",
		"darkPalette.800"
	);
	const gridBorderColor = useColorModeValue(
		"lightPalette.200",
		"darkPalette.700"
	);

	return (
		<>
			<Head>
				<title>{country.location}</title>
			</Head>

			<Flex
				width="100%"
				height="25vh"
				backgroundImage={
					"https://flagcdn.com/" + countryCode.toLowerCase() + ".svg"
				}
				alt={country.location}
				backgroundSize="100% 100%"
			>
				<Flex
					width="100%"
					height="100%"
					justifyContent="center"
					alignItems="center"
					bg="rgba(0, 0, 0, 0.5)"
				>
					<Center>
						<Heading as="h5" size="lg" color="darkPalette.100">
							{country.location}
						</Heading>
					</Center>
				</Flex>
			</Flex>

			<Flex
				direction="column"
				alignItems="center"
				justifyContent="center"
				marginTop={0}
				padding={0}
				minHeight="75vh"
			>
				{/* infection data */}
				<Layout
					title="Infection Data"
					statsData={country}
					data={country.data}
					latestData={latestCountryInfectionData}
					graphOptions={[
						{ value: "new_cases", label: "New Cases" },
						{ value: "new_deaths", label: "New Deaths" },
						{ value: "total_cases", label: "Total Cases" },
						{ value: "total_deaths", label: "Total Deaths" },
						{ value: "new_cases_per_million", label: "New Cases per Million" },
						{
							value: "new_deaths_per_million",
							label: "	New Deaths per Million",
						},
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
				{countryVaccinationData.length === 0 ? (
					<Flex width="99%" bg={gridBackgroundColor}
					borderColor={gridBorderColor}
					borderWidth={1}
					padding={["0.1rem", "0.5rem"]}
					margin={2}
					alignItems="center"
					justifyContent="center"><Text>Vaccination data unavailable</Text></Flex>
				) : (
					<Layout
						title="Vaccination Data"
						statsData={country}
						data={country.data}
						latestData={latestCountryVaccinationData}
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
							{
								value1: "people_vaccinated",
								value2: "people_fully_vaccinated",
							},
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
				)}
			</Flex>
		</>
	);
}

export async function getStaticPaths() {
	const res = await fetch(
		"https://covid.ourworldindata.org/data/owid-covid-data.json"
	);
	const data = await res.json();

	const countries = await Object.entries(data)
		.map((obj) => ({
			...obj[1],
			iso_code: obj[0],
		}))
		.filter((obj) => obj.continent != null);

	const paths = countries.map((c) => ({
		params: {
			slug: c.iso_code,
		},
	}));
	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	const res = await fetch(
		"https://covid.ourworldindata.org/data/owid-covid-data.json"
	);
	const data = await res.json();

	const countries = await Object.entries(data)
		.map((obj) => ({
			...obj[1],
			iso_code: obj[0],
		}))
		.filter((obj) => obj.continent != null);

	const country = await countries.filter(
		(country) => country.iso_code == params.slug
	);

	// get vaccinations-by-manufacturer data from spreadsheet
	const vaccinesData = await getVaccinesData();

	const countryVaccinesData = vaccinesData.filter(
		(v) => v.location == country[0].location
	);

	return {
		props: { country: country[0], countryVaccinesData },
		revalidate: 60,
	};
}
