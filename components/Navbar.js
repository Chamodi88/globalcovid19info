import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Flex, Heading } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import NextLink from "next/link";
import { FcHome } from "react-icons/fc";

const Navbar = () => {
	return (
		<Flex
			bg={useColorModeValue("lightPalette.100", "darkPalette.800")}
			border="1px"
			borderColor={useColorModeValue("lightPalette.200", "darkPalette.700")}
			width="100%"
			height={["3rem", "5rem"]}
			justifyContent="center"
		>
			<Flex
				width="100%"
				maxWidth="1500px"
				justifyContent="space-between"
				alignItems="center"
			>
				<Heading
					as="h3"
					fontSize={["xs", "lg", "2xl"]}
					m={2}
					color={useColorModeValue("lightPalette.900", "darkPalette.50")}
				>
					Global Covid-19 Infection and Vaccination Data
				</Heading>
				<Flex justifyContent="space-between" alignItems="center">
					<Flex marginRight={2}>
						<NextLink href="/">
							<a>
								<FcHome fontSize="1.5rem" />
							</a>
						</NextLink>
					</Flex>
					<DarkModeSwitch />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Navbar;
