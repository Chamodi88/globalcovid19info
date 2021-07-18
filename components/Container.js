import { Flex, useColorMode } from "@chakra-ui/react";

export const Container = (props) => {
	const { colorMode } = useColorMode();

	const bgColor = {
		light: "white",
		dark: "#121212",
	};

	const color = { light: "black", dark: "white" };
	return (
		<Flex
			direction="column"
			alignItems="center"
			justifyContent="center"
			margin={0}
			padding={0}
			bg={bgColor[colorMode]}
			color={color[colorMode]}
			{...props}
		/>
	);
};
