import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
import TokensWrapper from "carbon-react/lib/components/tokens-wrapper";
import GlobalStyle from "carbon-react/lib/style/global-style";
import sageTheme from "carbon-react/lib/style/themes/sage";
import "carbon-react/lib/style/fonts.css";

import App from "./App";

const container = document.getElementById("root");

if (!container) {
  throw new Error("The root container was not found.");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <TokensWrapper>
      <CarbonProvider theme={sageTheme}>
        <GlobalStyle />
        <App />
      </CarbonProvider>
    </TokensWrapper>
  </StrictMode>
);