import styled from 'styled-components'

/** Uppercase overline label used at the top of each page section */
export const PageOverline = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: var(--colorsUtilityYin055, #737373);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 12px 0;
  display: block;
`

/** Two-column grid that stacks at narrow widths */
export const TwoColumnGrid = styled.div<{ firstFraction?: string }>`
  display: grid;
  grid-template-columns: ${({ firstFraction = '2fr' }) => `${firstFraction} 1fr`};
  gap: 48px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

/** Responsive auto-fill card grid */
export const AutoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;

  @media (max-width: 360px) {
    grid-template-columns: 1fr;
  }
`
