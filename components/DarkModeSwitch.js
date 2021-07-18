import { useColorMode, Switch } from "@chakra-ui/react";

export const DarkModeSwitch = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const isDark = colorMode === "dark";
	return (
		<Switch
			position="relative"
			mt="0.5rem"
			mr="1rem"
			colorScheme="red"
			size="sm"
			isChecked={isDark}
			onChange={toggleColorMode}
		/>
	);
};
