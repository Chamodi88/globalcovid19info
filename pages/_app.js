import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<ColorModeProvider
				options={{
					useSystemColorMode: true,
				}}
			>
				<Container minHeight="100vh">
					<DarkModeSwitch />
					<Component {...pageProps} />
				</Container>
			</ColorModeProvider>
		</ChakraProvider>
	);
}

export default MyApp;
