import { render, screen, fireEvent } from "@testing-library/react";
import PasswordResetPage from "./PasswordResetPage";
import { MemoryRouter } from "react-router-dom";

describe("PasswordResetPage", () => {
  test("renders the password reset form", () => {
    render(
      <MemoryRouter>
        <PasswordResetPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Do you forgot your password?")).toBeInTheDocument();
    expect(screen.getByText("Reset Password")).toBeInTheDocument();
  });

  test("navigates back to login", () => {
    render(
      <MemoryRouter>
        <PasswordResetPage />
      </MemoryRouter>
    );

    const loginLink = screen.getByText("Login");

    expect(loginLink).toBeInTheDocument();
  });
});
