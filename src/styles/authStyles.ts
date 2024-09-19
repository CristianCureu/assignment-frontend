import { Button, Box, styled } from "@mui/material";
import { cyan } from "@mui/material/colors";

export const FlexContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

export const AuthBox = styled(FlexContainer)({
  width: "40%",
  flexDirection: "column",
  paddingRight: 100,
  paddingLeft: 100,
});

export const CyanButton = styled(Button)({
  color: cyan[500],
});
