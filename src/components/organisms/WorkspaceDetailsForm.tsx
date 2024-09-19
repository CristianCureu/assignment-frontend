import { Button, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { workspaceDetailsFields } from "@constants/authFields";
import { workspaceDetailsSchema } from "@schemas/authSchema";
import { AuthBox, CyanButton } from "@styles/authStyles";
import { WorkspaceData } from "@src/types/formTypes";
import AuthTitle from "@components/atoms/AuthTitle";
import Form from "@components/molecules/Form";
import { teal } from "@mui/material/colors";

type WorkspaceFormProps = {
  onSubmit: (data: WorkspaceData) => void;
};

const WorkspaceDetailsForm = ({ onSubmit }: WorkspaceFormProps) => {
  return (
    <AuthBox>
      <AuthTitle
        title="Create your workspace"
        description="Coraly is the tool to manage your work processes form the same place"
      />
      <Form
        fields={workspaceDetailsFields}
        schema={workspaceDetailsSchema}
        onSubmit={onSubmit}
      >
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: teal["A700"],
            "&:hover": { backgroundColor: teal["A400"] },
          }}
        >
          Create now the account
        </Button>
        <Grid container alignItems="center" sx={{ marginTop: 2 }}>
          <Typography>Do you have an account?</Typography>
          <Link to="/login">
            <CyanButton>Sign in</CyanButton>
          </Link>
        </Grid>
      </Form>
    </AuthBox>
  );
};

export default WorkspaceDetailsForm;
