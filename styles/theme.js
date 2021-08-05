import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { mode } from "@chakra-ui/theme-tools";

const fonts = {
	body: `'Work Sans', sans-serif;`,
	heading: `'Fira Sans', sans-serif;`,
};

const breakpoints = createBreakpoints({
	sm: "40em",
	md: "52em",
	lg: "64em",
	xl: "80em",
});

const theme = extendTheme({
	colors: {
		darkPalette: {
			50: "#FFFFFF",
			100: "#F3F3F3",
			200: "#CFCFCF",
			300: "#8F8F8F",
			700: "#323232",
			800: "#272727",
			900: "#121212",
		},
		lightPalette: {
			50: "#FFFFFF",
			100: "#F9F9F9",
			200: "#E9E9E9",
			300: "#C4C4C4",
			600: "#737373",
			700: "#565656",
			800: "#454545",
			900: "#00000",
		},
	},
	fonts,
	breakpoints,
	components: {
		Heading: {
			baseStyle: (props) => ({
				color: mode("lightPalette.800", "darkPalette.100")(props),
			}),
		},
		Text: {
			baseStyle: (props) => ({
				color: mode("lightPalette.700", "darkPalette.200")(props),
				fontSize: ["x-small", "sm"],
			}),
		},
		Divider: {
			baseStyle: (props) => ({
				borderColor: mode("lightPalette.200", "darkPalette.700")(props),
			}),
		},
		Switch: {
			baseStyle: {
				track: {
					_focus: {
						boxShadow: "none",
					},
				},
			},
		},
	},
});

export default theme;
