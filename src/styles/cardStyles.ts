import { Box, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  height: "calc(84vh - 40px)",
  width: 400,
  overflowY: "scroll",
  paddingRight: 16,
  marginBottom: 40,
  paddingTop: 10,
  boxSizing: "content-box",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grey[400],
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.grey[100],
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.grey[300],
  },
}));
