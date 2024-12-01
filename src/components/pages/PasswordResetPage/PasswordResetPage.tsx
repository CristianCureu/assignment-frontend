import { Button, Grid, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import { Link } from "react-router-dom";

import AuthBackground from "@components/molecules/AuthBackground";
import { passwordResetField } from "@constants/authFields";
import { AuthBox, CyanButton } from "@styles/authStyles";
import { passwordResetSVGs } from "@constants/svgProps";
import AuthLayout from "@components/atoms/AuthLayout";
import AuthTitle from "@components/atoms/AuthTitle";
import Form from "@components/molecules/Form";
import { passwordResetSchema } from "@schemas/authSchema";

const PasswordResetPage = () => {
  const handleLogin = async (formData) => {
    console.log(formData);
  };

  return (
    <AuthLayout>
      <AuthBox>
        <AuthTitle
          title="Do you forgot your password?"
          description="Insert your email and we will send you a link in your email box to reset your password."
        />
        <Form
          fields={passwordResetField}
          schema={passwordResetSchema}
          onSubmit={handleLogin}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            sx={{
              backgroundColor: pink[500],
              "&:hover": { backgroundColor: pink[500] },
            }}
          >
            Reset Password
          </Button>
        </Form>
        <Grid container alignItems="center" sx={{ marginTop: 2 }}>
          <Typography>Go back to</Typography>
          <Link to="/login">
            <CyanButton>Login</CyanButton>
          </Link>
        </Grid>
      </AuthBox>
      <AuthBackground bgColor="#F93E6C1A" svgProps={passwordResetSVGs} />
    </AuthLayout>
  );
};

export default PasswordResetPage;
