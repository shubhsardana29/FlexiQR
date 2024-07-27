import { Global, css } from '@emotion/react';

export const GlobalStyles = () => (
  <Global
    styles={css`
      body {
        transition: all 0.2s ease-in-out;
      }
      #root {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
    `}
  />
);