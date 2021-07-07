import { Flex, Text, Box, Grid } from "@chakra-ui/layout";
import Head from "next/head";
import { Heading } from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import { SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import NextLink from "next/link";

const MotionBox = motion(Box);

export default function Home({ data, countries }) {
	return (
		<>
			<Head>
				<title>Covid19Info</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Flex
				justifyContent="space-between"
				bg="black"
				width="100%"
				p={3}
				pr={20}
				color="white"
			>
				<Text>Latest update : {data.Date.split("T")[0]} </Text>

				<Text>
					Countries currently less than 5000 total confirmed cases :
					{countries.length}
				</Text>
			</Flex>
			<Heading>Countries with lowest confirmed Covid infections</Heading>
			<SimpleGrid
				justifyContent="center"
				columns={[1, 2, 3]}
				spacing={5}
				ml={[5, 8, 10]}
				mr={[5, 8, 10]}
			>
				{countries.map((country) => {
					return (
						<NextLink key={country.CountryCode} href={"/" + country.Slug}>
							<MotionBox
								justifyContent="center"
								alignItems="center"
								color="white"
								bg="black"
								m="0.8rem"
								p="1em"
								borderRadius="20px"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
							>
								<Image
									src={
										"https://flagcdn.com/" +
										country.CountryCode.toLowerCase() +
										".svg"
									}
									alt={country.Country}
									objectFit="cover"
									width="100%"
									height="10rem"
								/>
								<Heading as="h4" size="md" color="gray.500">
									{country.Country}({country.CountryCode})
								</Heading>
								<Grid templateColumns="repeat(3, 1fr)" gap={3}>
									<Box>
										<Text>Confirmed</Text>
										<Text>{country.TotalConfirmed}</Text>
									</Box>
									<Box>
										<Text>Deaths</Text>
										<Text>{country.TotalDeaths}</Text>
									</Box>
									<Box>
										<Text>Recovered</Text>
										<Text>{country.TotalRecovered}</Text>
									</Box>
								</Grid>
							</MotionBox>
						</NextLink>
					);
				})}
			</SimpleGrid>
		</>
	);
}

export async function getServerSideProps(context) {
	const res = await fetch("https://api.covid19api.com/summary");
	const data = await res.json();
	const countries = await data.Countries.filter(
		(country) => country.TotalConfirmed < 5000
	);
	countries.sort((a, b) => (a.TotalConfirmed > b.TotalConfirmed ? 1 : -1));
	return {
		props: { data, countries },
	};
}
