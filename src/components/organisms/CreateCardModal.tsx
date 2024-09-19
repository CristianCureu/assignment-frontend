import CustomModal from "@components/molecules/CustomModal";
import Form from "@components/molecules/Form";
import { createCardFields } from "@constants/cardFields";
import { Box, Button, Grid2, styled } from "@mui/material";
import { teal } from "@mui/material/colors";
import { createCardSchema } from "@schemas/cardSchema";
import { Card } from "@src/types/apiTypes";

type CreateCardModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (card: Card) => void;
  processId: string;
  userId: string;
};

const CreateCardModal = ({
  open,
  onClose,
  onSubmit,
  processId,
  userId,
}: CreateCardModalProps) => {
  const handleSubmitCard = (data) => {
    onSubmit({ ...data, process: processId, projectManager: userId });
  };

  return (
    <CustomModal open={open} onClose={onClose} orientation="fullscreen">
      <Container>
        <Form
          fields={createCardFields}
          schema={createCardSchema}
          onSubmit={handleSubmitCard}
          splitLayout={true}
        >
          <Grid2 alignSelf="flex-end" sx={{ position: "fixed", right: 10, bottom: 10 }}>
            <Button variant="outlined" onClick={onClose} sx={{ mx: 2 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: teal["A700"] }}
            >
              Save
            </Button>
          </Grid2>
        </Form>
      </Container>
    </CustomModal>
  );
};

export default CreateCardModal;

const Container = styled(Box)(({ theme }) => ({
  paddingRight: 16,
  width: "80vw",
  height: "80vh",
  overflowY: "auto",
  marginBottom: 40,
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
