import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { useUpdateUserMutation } from "@hooks/mutations/useUpdateUserMutation";
import SettingsPage from "./SettingsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("@contexts/UserProvider", () => ({
  useUser: () => ({
    user: { _id: "user123", email: "email@yahoo.com", name: "Name", surname: "Surname" },
    isAuthenticated: true,
  }),
}));

jest.mock("@hooks/mutations/useUpdateUserMutation", () => ({
  useUpdateUserMutation: () => ({
    mutateAsync: jest.fn().mockResolvedValue({}),
  }),
}));

const renderWithQueryClient = (ui) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
};

describe("SettingsPage", () => {
  test("renders profile settings form with default values", () => {
    renderWithQueryClient(<SettingsPage />);

    expect(screen.getByLabelText("Username")).toHaveValue("email");
    expect(screen.getByLabelText("Email")).toHaveValue("email@yahoo.com");
  });

  test("changes to security tab and renders the form", () => {
    renderWithQueryClient(<SettingsPage />);

    const securityTab = screen.getByText("Security");

    fireEvent.click(securityTab);

    expect(screen.getByText("Security Settings")).toBeInTheDocument();
  });
});
