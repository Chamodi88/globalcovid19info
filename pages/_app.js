import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { Container } from "../components/Container";

import theme from "../styles/theme";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<ColorModeProvider
				options={{
					useSystemColorMode: false,
				}}
			>
				<Container>
					<Navbar />
					<Component {...pageProps} />
				</Container>
			</ColorModeProvider>
		</ChakraProvider>
	);
}

export default MyApp;
