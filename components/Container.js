import { Flex, useColorMode } from "@chakra-ui/react";

export const Container = (props) => {
	const { colorMode } = useColorMode();

	const bgColor = {
		light: "lightPalette.50",
		dark: "darkPalette.900",
	};

	const color = { light: "lightPalette.900", dark: "darkPalette.50" };
	return (
		<Flex
			direction="column"
			alignItems="center"
			justifyContent="center"
			minHeight="100vh"
			marginTop={0}
			padding={0}
			bg={bgColor[colorMode]}
			color={color[colorMode]}
			{...props}
		/>
	);
};
