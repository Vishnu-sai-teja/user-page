import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TokensWrapper from 'carbon-react/lib/components/tokens-wrapper'
import CarbonProvider from 'carbon-react/lib/components/carbon-provider'
import GlobalStyle from 'carbon-react/lib/style/global-style'
import sageTheme from 'carbon-react/lib/style/themes/sage'
import 'carbon-react/lib/style/fonts.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TokensWrapper>
      <CarbonProvider theme={sageTheme}>
        <GlobalStyle />
        <App />
      </CarbonProvider>
    </TokensWrapper>
  </StrictMode>,
)
