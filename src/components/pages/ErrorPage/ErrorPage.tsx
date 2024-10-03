import { Box, Button, Grid, ImageListItem, styled, Typography } from "@mui/material";

import Four from "@assets/4.svg";
import Zero from "@assets/0.svg";

const ErrorPage = () => {
  return (
    <Container>
      <Grid container justifyContent="center" gap={2}>
        <ImageListItem>
          <img src={Four} loading="lazy" />
        </ImageListItem>
        <ImageListItem sx={{ top: "2rem" }}>
          <img src={Zero} loading="lazy" />
        </ImageListItem>
        <ImageListItem>
          <img src={Four} loading="lazy" />
        </ImageListItem>
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="center"
        gap={2}
        sx={{ marginTop: "4rem" }}
      >
        <Typography variant="h4">Page not found</Typography>
        <Typography textAlign="center">
          The page you are trying to reach is not available. It may have been deleted or
          its URL was misspelled.
        </Typography>
        <Button variant="contained">Go back</Button>
      </Grid>
    </Container>
  );
};

export default ErrorPage;

const Container = styled(Box)({
  width: "100%",
  height: "100vh",
  paddingRight: "25rem",
  paddingLeft: "25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});
