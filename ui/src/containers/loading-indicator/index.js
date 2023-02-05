import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";
const override = css`
  display: block;
  margin: auto;
  border-color: red;
`;

export const LoadingIndicator = () => {
  return <HashLoader css={override} color="#1976d2" />;
};
