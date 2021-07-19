import Head from "next/head";
import {
	Heading,
	Box,
	Center,
	Text,
	Flex,
	SimpleGrid,
} from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { IoCaretBack } from "react-icons/io5";
import NextLink from "next/link";
// import dynamic from "next/dynamic";
import { getCountryCodeISO2 } from "../../functions/functions";

// const Map = dynamic(() => import("../../components/Map"), {
// 	loading: () => <p>A map is loading</p>,
// 	ssr: false,
// });

export default function Slug({ country }) {
	const countryCode = getCountryCodeISO2(country.iso_code) ?? "AA";
	return (
		<>
			<Head>
				<title>{country.Country}</title>
			</Head>
			<Flex width="100%" height="20vh" justifyContent="center">
				<Image
					src={"https://flagcdn.com/" + countryCode.toLowerCase() + ".svg"}
					alt={country.location}
					objectFit="cover"
					height="30vh"
					width="100%"
				/>
			</Flex>
			<Box bg="black" width="100%">
				<Center>
					<NextLink href="/">
						<a>
							<IoCaretBack color="white" fontSize="1.5rem" />
						</a>
					</NextLink>
					<Heading as="h5" size="md" color="gray.500">
						{country.location}
					</Heading>
				</Center>
			</Box>
			{/* <SimpleGrid justifyContent="center" columns={[1, 2]} spacing={5}>
				<Box margin={5} bg="white" width="100%">
					<Box>
						<Map countryMonth={countryMonth[0]} />
					</Box>
					<Center margin={2}>
						<Text>Country Code : {country.CountryCode}</Text>
					</Center>
					<Flex flexDirection={{ base: "column", md: "row" }}>
						<Box marginRight={5}>
							<Text>New Confirmed : {country.NewConfirmed}</Text>
							<Text>New Deaths : {country.NewDeaths}</Text>
							<Text>New Recovered : {country.NewRecovered}</Text>
						</Box>
						<Box>
							<Text>Total Confirmed : {country.TotalRecovered}</Text>
							<Text>Total Deaths : {country.TotalDeaths}</Text>
							<Text>Total Recovered : {country.TotalRecovered}</Text>
						</Box>
					</Flex>
				</Box>
				<Box margin={5} bg="white" width="100%">
					<LineChart countryMonth={countryMonth} />
				</Box>
			</SimpleGrid> */}
		</>
	);
}

export async function getServerSideProps({ params }) {
	// const res = await fetch("https://api.covid19api.com/summary");
	// const data = await res.json();
	// const country = await data.Countries.filter(
	// 	(country) => country.Slug == params.slug
	// );
	// let previousMonth = new Date(data.Date.split("T")[0]);
	// previousMonth.setMonth(previousMonth.getMonth() - 1);
	// previousMonth = JSON.stringify(previousMonth).split("T")[0].replace('"', "");
	// const res1 = await fetch(
	// 	`https://api.covid19api.com/country/${
	// 		params.slug
	// 	}/status/confirmed?from=${previousMonth}T00:00:00Z&to=${
	// 		data.Date.split("T")[0]
	// 	}T00:00:00Z`
	// );
	// const countryMonth = await res1.json();

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

	return {
		props: { country: country[0] },
	};
}
