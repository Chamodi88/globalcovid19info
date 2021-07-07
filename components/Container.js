import { Flex, useColorMode } from "@chakra-ui/react";

export const Container = (props) => {
	const { colorMode } = useColorMode();

	const bgColor = {
		light: "linear-gradient(to right, #de6262, #ffb88c)",
		dark: "black",
	};

	const color = { light: "black", dark: "white" };
	return (
		<Flex
			direction="column"
			alignItems="center"
			justifyContent="flex-start"
			bg={bgColor[colorMode]}
			color={color[colorMode]}
			{...props}
		/>
	);
};
