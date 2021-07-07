import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { mode } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
	sm: "40em",
	md: "52em",
	lg: "64em",
	xl: "80em",
});

const theme = extendTheme({
	colors: {
		black: "#16161D",
	},
	fonts,
	breakpoints,
	components: {
		Heading: {
			baseStyle: (props) => ({
				color: mode("red.800", "red.600")(props),
				margin: "2rem",
			}),
		},
	},
});

export default theme;
