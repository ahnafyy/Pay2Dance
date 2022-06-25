import { Global, css } from "@emotion/core";

/* A function that returns a component. */

const GlobalStyles = () => (
  <>
    <Global
      styles={css`
        *,
        *:before,
        *:after {
          box-sizing: border-box;
        }
      `}
    />
    <Global
      styles={css`
        input,
        button {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          outline: none;
          border-style: none;
        }
      `}
    />
    <Global
      styles={css`
        body,
        html {
          background: radial-gradient(circle, rgba(238,174,218,1) 0%, rgba(148,148,233,1) 100%);
          font-size: 18px;
          font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        }
      `}
    />
  </>
);

export default GlobalStyles;
