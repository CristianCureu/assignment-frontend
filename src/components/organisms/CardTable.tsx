import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  useTheme,
  useMediaQuery,
  Typography,
  styled,
} from "@mui/material";
import TablePaginationActions from "@components/molecules/TablePaginationActions";

import { Card, Cards } from "@src/types/apiTypes";

type CardTableProps = {
  innerRef: React.Ref<HTMLTableRowElement>;
  cards: Cards;
  totalCards: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onRowClick: (card: Card) => void;
  infiniteScrolling: boolean;
  isFetching: boolean;
};

const CardTable = ({
  innerRef,
  cards,
  totalCards,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onRowClick,
  infiniteScrolling,
  isFetching,
}: CardTableProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TableContainer
      component={Paper}
      sx={{
        animation: isFetching
          ? "fadeSlideDown 0.5s ease-in-out"
          : "fadeSlideUp 0.5s ease-in-out",
        "@keyframes fadeSlideUp": {
          "0%": {
            opacity: 0,
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "@keyframes fadeSlideDown": {
          "0%": {
            opacity: 1,
            transform: "translateY(0)",
          },
          "100%": {
            opacity: 0,
            transform: "translateY(20px)",
          },
        },
      }}
    >
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {cards.map((card, index) => (
            <ResponsiveTableRow
              ref={index === cards.length - 1 ? innerRef : null}
              key={card.name}
              hover
              onClick={() => onRowClick(card)}
              isMobile={isMobile}
              isFetching={isFetching}
            >
              {!isMobile && (
                <>
                  <TableCell sx={{ flex: 1 }}>{card.phoneNumber}</TableCell>
                  <TableCell sx={{ flex: 1 }}>{card.phoneProvider}</TableCell>
                  <TableCell sx={{ flex: 1 }}>{card.contractNumber}</TableCell>
                  {typeof card.projectManager !== "string" && (
                    <TableCell sx={{ flex: 1 }}>
                      {card.projectManager.name} {card.projectManager.surname}
                    </TableCell>
                  )}
                  <TableCell sx={{ flex: 1 }}>
                    {card.startDate.toString().slice(0, 10)}
                  </TableCell>
                </>
              )}
              {isMobile && (
                <>
                  <TableCell sx={{ flex: 1 }}>
                    <Typography variant="body2">
                      <strong>Phone:</strong> {card.phoneNumber}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Provider:</strong> {card.phoneProvider}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Contract:</strong> {card.contractNumber}
                    </Typography>
                    {typeof card.projectManager !== "string" && (
                      <Typography variant="body2">
                        <strong>Manager:</strong> {card.projectManager.name}{" "}
                        {card.projectManager.surname}
                      </Typography>
                    )}
                    <Typography variant="body2">
                      <strong>Start Date:</strong>{" "}
                      {card.startDate.toString().slice(0, 10)}
                    </Typography>
                  </TableCell>
                </>
              )}
            </ResponsiveTableRow>
          ))}
        </TableBody>
        {!infiniteScrolling && (
          <TableFooter
            sx={{
              opacity: isFetching ? 0 : 1,
              transition: "opacity 1s ease-in-out",
            }}
          >
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[1, 5, 10, 25]}
                colSpan={3}
                count={totalCards}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
};

export default CardTable;

const ResponsiveTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "isMobile" && prop !== "isFetching",
})<{ isMobile: boolean; isFetching: boolean }>(({ isMobile, isFetching }) => ({
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  opacity: isFetching ? 0 : 1,
  transition: "opacity 0.3s ease",
}));
