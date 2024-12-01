import { findByLabelText, fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react";
import * as yup from "yup";

import Form from "@components/molecules/Form";
import { workspaceDetailsFields, userCredentialsFields } from "@constants/authFields";
import { workspaceDetailsSchema, useCredentialsSchema } from "@schemas/authSchema";
import RegisterPage from "./RegisterPage";
import { MemoryRouter } from "react-router-dom";

describe("RegisterPage", () => {
  it("should render the first step (WorkspaceDetailsForm) without crashing", () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("WorkSpace Name")).toBeInTheDocument();
  });

  it("should proceed to the second step (UserCredentialsForm) after submitting valid workspace details", async () => {
    const { getByLabelText, getByText, findByText } = render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    const emailInput = getByLabelText("Email");
    const workspaceInput = getByLabelText("WorkSpace Name");
    const termsAndConditions = getByLabelText("Agree with Terms and Conditions");
    const personalData = getByLabelText("I authorize Coraly to process my personal data");
    const submitButton = getByText("Create now the account");

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "email@test.com" } });
      fireEvent.change(workspaceInput, { target: { value: "Test Workspace" } });
      fireEvent.click(termsAndConditions);
      fireEvent.click(personalData);

      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(getByLabelText("Name")).toBeInTheDocument();
      expect(getByLabelText("Surname")).toBeInTheDocument();
      expect(getByLabelText("Password")).toBeInTheDocument();
      expect(getByLabelText("Repeat Password")).toBeInTheDocument();
    });
  });

  it("should call the onSubmit function with valid inputs in both steps", async () => {
    const { getByLabelText, getByText, findByText } = render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    const emailInput = getByLabelText("Email");
    const workspaceInput = getByLabelText("WorkSpace Name");
    const termsAndConditions = getByLabelText("Agree with Terms and Conditions");
    const personalData = getByLabelText("I authorize Coraly to process my personal data");
    const submitButton = getByText("Create now the account");

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "email@test.com" } });
      fireEvent.change(workspaceInput, { target: { value: "Test Workspace" } });
      fireEvent.click(termsAndConditions);
      fireEvent.click(personalData);

      fireEvent.click(submitButton);
    });

    const nameInput = getByLabelText("Name");
    const surnameInput = getByLabelText("Surname");
    const passwordInput = getByLabelText("Password");
    const confirmPasswordInput = getByLabelText("Repeat Password");
    const secondSubmitButton = getByText("Complete now");

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "Name" } });
      fireEvent.change(surnameInput, { target: { value: "Surname" } });
      fireEvent.change(passwordInput, { target: { value: "Password1!" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "Password1!" } });

      fireEvent.click(secondSubmitButton);
    });

    expect(await findByText(/Registration failed!/i)).toBeInTheDocument();
  });

  it("should display validation errors if workspace details are missing", async () => {
    const { getByText, findByText } = render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    const submitButton = getByText("Create now the account");

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(await findByText(/WorkSpace is required/i)).toBeInTheDocument();
    expect(await findByText(/Email is required/i)).toBeInTheDocument();
  });
});
