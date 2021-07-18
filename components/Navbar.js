import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";

const Navbar = () => {
	return (
		<Flex
			bg={useColorModeValue(
				"linear-gradient(to right, #de6262, #ffb88c)",
				"#272727"
			)}
			width="100%"
			height="5rem"
			color="black"
			justifyContent="center"
		>
			<Flex
				width="100%"
				maxWidth="1500px"
				justifyContent="space-between"
				alignItems="center"
			>
				<Heading as="h3" size="lg" m={2}>
					Global Covid-19 Pandemic and Vaccination Data
				</Heading>
				<DarkModeSwitch />
			</Flex>
		</Flex>
	);
};

export default Navbar;
