import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#f5f5f5",
  fontColor: "#000",
};

export const darkTheme = {
  body: "#505050",
  fontColor: "#fff",
};

export const GlobalStyles = createGlobalStyle`

	body {

		background-color: ${(props) => props.theme.body};

	}

`;