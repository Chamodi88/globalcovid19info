import React from "react";
import {
	Box,
	chakra,
	Container,
	Stack,
	Text,
	useColorModeValue,
	VisuallyHidden,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const SocialButton = ({ children, label, href }) => {
	return (
		<chakra.button
			bg={useColorModeValue("lightPalette.100", "darkPalette.100")}
			rounded="full"
			w={8}
			h={8}
			cursor="pointer"
			as="a"
			href={href}
			display="inline-flex"
			alignItems="center"
			justifyContent="center"
			transition="background 0.3s ease"
			target="_blank"
			_hover={{
				bg: useColorModeValue("lightPalette.300", "darkPalette.200"),
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};

const Footer = () => {
	var currentYear = new Date().getFullYear();
	return (
		<Box
			bg={useColorModeValue("lightPalette.200", "darkPalette.900")}
			color={useColorModeValue("lightPalette.600", "darkPalette.300")}
		>
			<Container
				as={Stack}
				maxW="7xl"
				py={4}
				spacing={4}
				justify="center"
				align={{ base: "center", md: "center" }}
			>
				<Text>&copy; {currentYear} Chamodi Boyagoda. All rights reserved</Text>
				<Stack direction="row" spacing={6}>
					<SocialButton
						label="LinkedIn"
						href="https://www.linkedin.com/feed/"
						rel="noreferrer"
					>
						<FaLinkedinIn />
					</SocialButton>
					<SocialButton
						label="GitHub"
						href="https://github.com/Chamodi88"
						rel="noreferrer"
					>
						<FaGithub />
					</SocialButton>
					<SocialButton
						label="GitHub"
						href="mailto:chamodib88@gmail.com"
						rel="noreferrer"
					>
						<MdEmail />
					</SocialButton>
				</Stack>
			</Container>
		</Box>
	);
};

export default Footer;
