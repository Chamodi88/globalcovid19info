import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { Container } from "../components/Container";
import firebase from "../lib/initFirebase";
import theme from "../styles/theme";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
	firebase();
	return (
		<ChakraProvider resetCSS theme={theme}>
			<ColorModeProvider
				options={{
					useSystemColorMode: false,
				}}
			>
				<Navbar />
				<Container>
					<Component {...pageProps} />
				</Container>
				<Footer />
			</ColorModeProvider>
		</ChakraProvider>
	);
}

export default MyApp;
