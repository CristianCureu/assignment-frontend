import { Box, Typography, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import logo from "@assets/logo.svg";

type AuthTitleProps = {
  title: string;
  description: string;
};

const AuthTitle = ({ title, description }: AuthTitleProps) => {
  return (
    <Container>
      <Logo src={logo} alt="logo" />
      <Box>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Box>
    </Container>
  );
};

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "25vh",
  marginBottom: 50,
});

const Logo = styled("img")({
  width: 50,
  height: 50,
});

const Title = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1.8rem",
  color: grey[800],
});

const Description = styled(Typography)({
  fontSize: "0.9rem",
  color: grey[700],
});

export default AuthTitle;
