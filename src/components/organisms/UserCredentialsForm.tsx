import { Button } from "@mui/material";

import { userCredentialsFields } from "@constants/authFields";
import { useCredentialsSchema } from "@schemas/authSchema";
import AuthTitle from "@components/atoms/AuthTitle";
import { AuthBox } from "@styles/authStyles";
import Form from "@components/molecules/Form";
import { teal } from "@mui/material/colors";

type UserCredentialsData = {
  name: string;
  surname: string;
  password: string;
  confirmPassword: string;
};

type UserCredentialsFormProps = {
  onSubmit: (data: UserCredentialsData) => void;
};

const UserCredentialsForm = ({ onSubmit }: UserCredentialsFormProps) => {
  return (
    <AuthBox>
      <AuthTitle
        title="Complete your profile"
        description="Insert all your info to proceed with your workspace"
      />
      <Form
        fields={userCredentialsFields}
        schema={useCredentialsSchema}
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
          Complete now
        </Button>
      </Form>
    </AuthBox>
  );
};

export default UserCredentialsForm;
