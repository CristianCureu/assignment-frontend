import { useEffect, useState } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Box,
  Button,
  Grid2,
  IconButton,
  TextField,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDeleteCardMutation } from "@hooks/mutations/useDeleteCardMutation";
import { useUpdateCardMutation } from "@hooks/mutations/useUpdateCardMutation";
import CustomModal from "@components/molecules/CustomModal";
import { cardFields } from "@constants/cardFields";
import { Card, Cards } from "@src/types/apiTypes";
import { cardSchema } from "@schemas/cardSchema";
import Form from "@components/molecules/Form";
import { teal } from "@mui/material/colors";
import ToastNotification, {
  ToastNotificationProps,
} from "@components/molecules/ToastNotification";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCardById } from "@services/processService";

type CardModalProps = {
  open: boolean;
  onClose: () => void;
  cards: Cards;
  initialCard: Card | null;
};

const CardModal = ({ open, onClose, cards, initialCard }: CardModalProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [snackbar, setSnackbar] = useState<ToastNotificationProps>({
    open: false,
    message: "",
    severity: "success",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const queryClient = useQueryClient();
  const {
    data: card,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["card", cards[currentIndex]._id],
    queryFn: ({ signal }) => testPooling(cards[currentIndex]._id, signal),
    enabled: !!cards[currentIndex]._id,
  });

  useEffect(() => {
    if (initialCard) {
      setCurrentIndex(cards.findIndex((c) => c._id === initialCard._id));
    }
  }, [initialCard, cards]);

  const testPooling = async (cardId: string, signal: AbortSignal) => {
    const requestPromises = Array.from({ length: 6 }, () => getCardById(cardId, signal));

    const results = await Promise.all(requestPromises);
    const allResultsEqual = results.every((result) => result === results[0]);
    console.assert(allResultsEqual, "All results should be identical");

    return results[0];
  };

  const deleteCardMutation = useDeleteCardMutation();
  const updateCardMutation = useUpdateCardMutation();

  const handleUpdateCard = async (formData: Card) => {
    try {
      await updateCardMutation.mutateAsync({
        cardId: formData._id,
        updatedCard: formData,
      });

      setSnackbar({
        open: true,
        message: `Card updated successfully!`,
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error deleting card!",
        severity: "error",
      });
    }
  };

  const handleCardDelete = async (cardId: string) => {
    try {
      await deleteCardMutation.mutateAsync(cardId);
      setSnackbar({
        open: true,
        message: `Card deleted successfully!`,
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error deleting card!",
        severity: "error",
      });
    }
    onClose();
  };

  const handleNextCard = () => {
    if (currentIndex < cards.length - 1) {
      queryClient.cancelQueries({ queryKey: ["card", cards[currentIndex]._id] });
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousCard = () => {
    if (currentIndex > 0) {
      queryClient.cancelQueries({ queryKey: ["card", cards[currentIndex]._id] });
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleToastClose = () => {
    setSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  if (isLoading)
    return (
      <CustomModal open={open} onClose={onClose}>
        <Container>
          <Typography>Loading...</Typography>
        </Container>
      </CustomModal>
    );
  if (isError)
    return (
      <CustomModal open={open} onClose={onClose}>
        <Container>
          <Typography>Error: {error.message}</Typography>
        </Container>
      </CustomModal>
    );

  return (
    <CustomModal open={open} onClose={onClose}>
      <Container>
        <Grid2 container>
          <Grid2 size={isMobile ? 8 : 12}>
            <TextField
              label="Process Name"
              value={card.process?.name || ""}
              fullWidth
              disabled
              margin="normal"
            />
          </Grid2>
          <Grid2 size={isMobile ? 8 : 12}>
            <TextField
              label="Project Manager Email"
              value={card.projectManager?.email || ""}
              fullWidth
              disabled
              margin="normal"
              sx={{ mb: 2 }}
            />
          </Grid2>
        </Grid2>
        <Form
          fields={cardFields}
          schema={cardSchema}
          onSubmit={handleUpdateCard}
          defaultValues={card}
        >
          <Grid2 alignSelf="flex-start" sx={{ position: "fixed", left: 10, bottom: 10 }}>
            <IconButton onClick={handlePreviousCard} disabled={currentIndex === 0}>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={handleNextCard}
              disabled={currentIndex === cards.length - 1}
            >
              <ChevronRightIcon />
            </IconButton>
          </Grid2>
          <Grid2 alignSelf="flex-end" sx={{ position: "fixed", right: 10, bottom: 10 }}>
            <IconButton onClick={() => handleCardDelete(card._id)}>
              <DeleteIcon />
            </IconButton>
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
      {snackbar.open && (
        <ToastNotification
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          handleClose={handleToastClose}
        />
      )}
    </CustomModal>
  );
};

export default CardModal;

const Container = styled(Box)(({ theme }) => ({
  paddingRight: 16,
  width: 400,
  height: "calc(91vh - 40px)",
  overflowY: "auto",
  marginBottom: 40,
  boxSizing: "content-box",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grey[400] || "#b0b0b0",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.grey[100] || "#e0e0e0",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.grey[300] || "#c0c0c0",
  },
}));
