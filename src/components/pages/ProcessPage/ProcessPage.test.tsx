import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import ProcessPage from "@components/pages/ProcessPage/ProcessPage";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { getProcessCards } from "@services/processService";
import userEvent from "@testing-library/user-event";
import PrivateRoute from "@routes/PrivateRoute";

const mockProcessCards = [
  {
    _id: 1,
    name: "Test Card",
    phoneNumber: "12345",
    phoneProvider: "Test Provider",
    contractNumber: "CN08231",
    projectManager: "Test manager",
    startDate: "10/10/2020",
  },
];

const mockResponse = {
  success: true,
  cards: mockProcessCards,
  totalCards: 1,
};

jest.mock("@services/processService", () => ({
  getProcessCards: jest.fn(),
}));

jest.mock("@contexts/UserProvider", () => ({
  useUser: () => ({
    user: { _id: "user123", email: "email@yahoo.com", name: "Name", surname: "Surname" },
    isAuthenticated: true,
  }),
}));

jest.mock("react-router-dom", () => {
  const actualReactRouterDom = jest.requireActual("react-router-dom");
  return {
    ...actualReactRouterDom,
    useNavigate: jest.fn(),
    useLocation: () => ({
      pathname: "/process/process123",
      state: { id: "process123" },
    }),
  };
});

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};

const queryClient = createTestQueryClient();
const TestWrapper = () => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter initialEntries={["/process/process123"]}>
      <Routes>
        <Route
          path="/process/:processId"
          element={<PrivateRoute element={<ProcessPage />} />}
        />
      </Routes>
    </MemoryRouter>
  </QueryClientProvider>
);

describe("Process", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should render loading and display error", async () => {
    (getProcessCards as jest.Mock).mockRejectedValue(new Error("Error"));
    const { getByText } = render(<TestWrapper />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => expect(getByText(/Error: /i)).toBeInTheDocument());
  });

  test("should render loading, fetch data, and display cards", async () => {
    (getProcessCards as jest.Mock).mockImplementation(
      (processId, offset, limit, signal) => {
        if (offset === 0 && limit === 10) {
          return Promise.resolve(mockResponse);
        }
        return Promise.resolve({
          success: true,
          cards: [],
          totalCards: 0,
        });
      }
    );

    const { getByText } = render(<TestWrapper />);

    const processId = "process123";
    const offset = 0;
    const limit = 10;

    expect(getProcessCards).toHaveBeenCalledWith(
      processId,
      offset,
      limit,
      expect.any(AbortSignal)
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => expect(getByText("Test Card")).toBeInTheDocument());
  });

  test("should open the modal", async () => {
    (getProcessCards as jest.Mock).mockResolvedValue(mockProcessCards);
    const { getByText } = render(<TestWrapper />);

    await waitFor(() => expect(getByText("Test Card")).toBeInTheDocument());

    const addButton = getByText("Add");
    userEvent.click(addButton);

    await waitFor(() => expect(getByText("Save")).toBeInTheDocument());
  });
});
