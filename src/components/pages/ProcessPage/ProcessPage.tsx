import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Grid2 as Grid,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import WidthNormalIcon from "@mui/icons-material/WidthNormal";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";

import ToastNotification, {
  ToastNotificationProps,
} from "@components/molecules/ToastNotification";
import { useCreateCardMutation } from "@hooks/mutations/useCreateCardMutation";
import CreateCardModal from "@components/organisms/CreateCardModal";
import SettingsModal from "@components/organisms/SettingsModal";
import { getProcessCards } from "@services/processService";
import { calculateInitialRows } from "@utils/processUtils";
import CardTable from "@components/organisms/CardTable";
import CardModal from "@components/organisms/CardModal";
import Navbar from "@components/molecules/Navbar";
import { useUser } from "@contexts/UserProvider";
import { Card } from "@src/types/apiTypes";

const ProcessPage = () => {
  const [cardModalOpen, setCardModalOpen] = useState<boolean>(false);
  const [createCardModalOpen, setCreateCardModalOpen] = useState<boolean>(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [infiniteScrolling, setInfiniteScrolling] = useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [snackbar, setSnackbar] = useState<ToastNotificationProps>({
    open: false,
    message: "",
    severity: "success",
  });

  const rowsPerScreen = calculateInitialRows();

  const { state: process } = useLocation();
  const { user } = useUser();
  const processId = process?.id;

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const {
    data: paginatedData,
    isLoading: paginatedLoading,
    isError: paginatedError,
    error: paginatedErrorMessage,
    isFetching: paginatedIsFetching,
  } = useQuery({
    queryKey: ["processCards", processId, page, rowsPerPage],
    queryFn: ({ signal }) =>
      getProcessCards(processId, page * rowsPerPage, rowsPerPage, signal),
    enabled: !infiniteScrolling && !!processId,
  });

  const {
    data: infiniteData,
    isLoading: infiniteLoading,
    isError: infiniteError,
    error: infiniteErrorMessage,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching: infiniteIsFetching,
  } = useInfiniteQuery({
    queryKey: ["processCards"],
    queryFn: ({ pageParam }) => getProcessCards(processId, pageParam, rowsPerScreen),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const morePagesAvailable = lastPage.cards.length === rowsPerScreen;
      return morePagesAvailable ? allPages.length * rowsPerScreen : undefined;
    },
    enabled: infiniteScrolling && !!processId,
  });

  const isLoading = infiniteScrolling ? infiniteLoading : paginatedLoading;
  const isError = infiniteScrolling ? infiniteError : paginatedError;
  const error = infiniteScrolling ? infiniteErrorMessage : paginatedErrorMessage;
  const isFetching = infiniteScrolling ? infiniteIsFetching : paginatedIsFetching;

  const cards = infiniteScrolling
    ? infiniteData?.pages.flatMap((page) => page.cards) || []
    : paginatedData?.cards || [];

  const totalCards = paginatedData?.totalCards || 0;

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && infiniteScrolling) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const createCardMutation = useCreateCardMutation();

  const handleCreateCard = async (card: Card) => {
    try {
      await createCardMutation.mutateAsync(card);
      setSnackbar({
        open: true,
        message: "Card created successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Error: ${error.message}`,
        severity: "error",
      });
    }
  };

  const handleRowClick = (card: Card) => {
    setSelectedCard(card);
    setCardModalOpen(true);
  };

  const handleCloseModal = () => {
    setCardModalOpen(false);
    setSelectedCard(null);
  };

  const handleToastClose = () => {
    setSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  const handlePageChange = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  if (isLoading)
    return (
      <Navbar>
        <Typography>Loading...</Typography>
      </Navbar>
    );
  if (isError)
    return (
      <Navbar>
        <Typography>Error: {error.message}</Typography>
      </Navbar>
    );

  return (
    <Navbar>
      <Grid
        container
        alignItems="center"
        justifyContent="flex-end"
        sx={{ borderBottom: "2px solid #e7e7e7", height: "8vh", bgcolor: "white", px: 3 }}
      >
        <IconButton
          onClick={() => setInfiniteScrolling(!infiniteScrolling)}
          sx={{ color: "gray" }}
        >
          {infiniteScrolling ? <WidthNormalIcon /> : <ViewSidebarIcon />}
        </IconButton>
        <IconButton
          onClick={() => setSettingsModalOpen(true)}
          sx={{ color: "gray", mr: 2 }}
        >
          <SettingsIcon />
        </IconButton>
        <Button
          color="error"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: "0.6rem" }}
          onClick={() => setCreateCardModalOpen(true)}
        >
          Add
        </Button>
      </Grid>
      <Container>
        {cards.length > 0 ? (
          <CardTable
            innerRef={ref}
            cards={cards}
            totalCards={totalCards}
            page={page}
            rowsPerPage={rowsPerPage}
            infiniteScrolling={infiniteScrolling}
            isFetching={isFetching}
            onRowClick={handleRowClick}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        ) : (
          <Typography>No cards available for this process</Typography>
        )}
        {isFetchingNextPage && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Container>
      {cardModalOpen && (
        <CardModal
          open={cardModalOpen}
          cards={cards}
          initialCard={selectedCard}
          onClose={handleCloseModal}
        />
      )}
      {createCardModalOpen && (
        <CreateCardModal
          open={createCardModalOpen}
          onClose={() => setCreateCardModalOpen(false)}
          onSubmit={(card: Card) => handleCreateCard(card)}
          processId={processId}
          userId={user._id}
        />
      )}
      {settingsModalOpen && (
        <SettingsModal
          open={settingsModalOpen}
          onClose={() => setSettingsModalOpen(false)}
          processId={processId}
        />
      )}
      {snackbar.open && (
        <ToastNotification
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          handleClose={handleToastClose}
        />
      )}
    </Navbar>
  );
};

export default ProcessPage;

const Container = styled(Box)({
  padding: 20,
  backgroundColor: "#F6F8FA",
  minHeight: "84vh",
});
