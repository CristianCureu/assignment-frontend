import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import PrivateRoute from "@routes/PrivateRoute";
import ProcessesPage from "./ProcessesPage";
import { getUserProcesses } from "@services/userService";
import { useCreateProcessMutation } from "@hooks/mutations/useCreateProcessMutation";

const mockProcesses = [
  {
    id: "1",
    name: "Process Name",
    color: "#000",
    private: true,
  },
];

const mockResponse = {
  ok: true,
  json: () => Promise.resolve(mockProcesses),
} as Response;

jest.mock("@services/userService", () => ({
  getUserProcesses: jest.fn(() => Promise.resolve(mockResponse)),
}));

const mockCreateCard = jest.fn();

jest.mock("@hooks/mutations/useCreateProcessMutation", () => ({
  useCreateProcessMutation: () => ({
    mutateAsync: mockCreateCard,
  }),
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
      pathname: "/processes",
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
    <MemoryRouter initialEntries={["/processes"]}>
      <Routes>
        <Route path="/processes" element={<PrivateRoute element={<ProcessesPage />} />} />
      </Routes>
    </MemoryRouter>
  </QueryClientProvider>
);

describe("Processes", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render loading and display error", async () => {
    (getUserProcesses as jest.Mock).mockRejectedValue(new Error("Error"));
    const { getByText } = render(<TestWrapper />);

    expect(getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => expect(getByText(/Error: /i)).toBeInTheDocument());
  });

  it("should render loading and display processes", async () => {
    (getUserProcesses as jest.Mock).mockResolvedValue(mockProcesses);
    const { getByText } = render(<TestWrapper />);

    expect(getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => expect(getByText("Process Name")).toBeInTheDocument());
  });

  it("should open modal and create a new process", async () => {
    (getUserProcesses as jest.Mock).mockResolvedValue(mockProcesses);

    const { getByText, getByLabelText } = render(<TestWrapper />);

    await waitFor(() => expect(getByText("Process Name")).toBeInTheDocument());

    const addButton = getByText(/Create Process/i);
    userEvent.click(addButton);

    await waitFor(() => expect(getByText("Create")).toBeInTheDocument());

    const nameInput = getByLabelText("Name");
    const colorInput = getByLabelText("Color");
    const submitButton = getByText("Create");

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "Process Name" } });
      fireEvent.change(colorInput, { target: { value: "#000" } });
      fireEvent.click(submitButton);
    });

    await waitFor(() =>
      expect(mockCreateCard).toHaveBeenCalledWith({
        name: "Process Name",
        color: "#000",
      })
    );

    await waitFor(() =>
      expect(getByText(/Process created successfully!/i)).toBeInTheDocument()
    );
  });
});
