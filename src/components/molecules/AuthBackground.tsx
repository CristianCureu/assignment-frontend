import { Box, styled, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

import CustomSVG, { SVGProps } from "@components/atoms/CustomSVG";
import bgDots from "@assets/background/bgDots.svg";

type AuthBackground = {
  bgColor?: string;
  svgProps: SVGProps[];
};

const AuthBackground = ({ bgColor, svgProps }: AuthBackground) => {
  return (
    <Container bgColor={bgColor}>
      {svgProps.map((svg, index) => (
        <CustomSVG
          key={index}
          type={svg.type}
          color={svg.color}
          width={svg.width}
          height={svg.height}
          top={svg.top}
          left={svg.left}
          rotate={svg.rotate}
        />
      ))}
      <Typography variant="h3" sx={{ padding: 25, zIndex: 2 }}>
        Get started with Coraly now and improve your workflow
      </Typography>
      <Dots>
        <DotsImage src={bgDots} alt="bg" />
      </Dots>
    </Container>
  );
};

export default AuthBackground;

const Container = styled(Box)<{ bgColor?: string }>(({ bgColor }) => ({
  width: "60%",
  height: "100%",
  background: bgColor || grey[100],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
}));

const Dots = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -80%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "18rem",
});

const DotsImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});
