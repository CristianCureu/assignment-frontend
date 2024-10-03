import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react";
import * as yup from "yup";

import Form from "@components/molecules/Form";
import { loginFields } from "@constants/authFields";
import { loginSchema } from "@schemas/authSchema";

describe("Login", () => {
  it("should render without crashing", () => {
    render(
      <Form fields={[]} schema={yup.object({})} onSubmit={() => {}}>
        <button type="submit">Submit</button>
      </Form>
    );
  });
  describe("with valid inputs", () => {
    it("should call the onSubmit function", async () => {
      const mockOnSubmit = jest.fn();

      const { getByLabelText, getByText } = render(
        <Form
          fields={[
            { name: "email", label: "Email", type: "email" },
            { name: "password", label: "Password", type: "password" },
          ]}
          schema={yup.object({})}
          onSubmit={mockOnSubmit}
        >
          <button type="submit">Submit</button>
        </Form>
      );

      await act(async () => {
        const emailInput = getByLabelText("Email");
        const passwordInput = getByLabelText("Password");
        const submitButton = getByText("Submit");

        fireEvent.change(emailInput, {
          target: { value: "email@test.com" },
        });
        fireEvent.change(passwordInput, { target: { value: "Password1!" } });
        fireEvent.click(submitButton);
      });

      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  describe("with invalid password", () => {
    it("should display invalid password message", async () => {
      const mockOnSubmit = jest.fn();

      const { getByLabelText, getByText, findByText } = render(
        <Form fields={loginFields} schema={loginSchema} onSubmit={mockOnSubmit}>
          <button type="submit">Submit</button>
        </Form>
      );

      const passwordInput = getByLabelText("Password");
      const submitButton = getByText("Submit");

      await act(async () => {
        fireEvent.change(passwordInput, { target: { value: "Invalid password" } });
        fireEvent.click(submitButton);
      });

      expect(
        await findByText(/Password must contain at least one number/i)
      ).toBeInTheDocument();
    });
  });

  describe("with missing email", () => {
    it("should display required email message", async () => {
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByText, findByText } = render(
        <Form fields={loginFields} schema={loginSchema} onSubmit={mockOnSubmit}>
          <button type="submit">Submit</button>
        </Form>
      );

      await act(async () => {
        const passwordInput = getByLabelText("Password");
        const submitButton = getByText("Submit");

        fireEvent.change(passwordInput, { target: { value: "ValidPassword1!" } });
        fireEvent.click(submitButton);
      });

      expect(await findByText(/Email is required/i)).toBeInTheDocument();
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe("with missing password", () => {
    it("should display required password message", async () => {
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByText, findByText } = render(
        <Form fields={loginFields} schema={loginSchema} onSubmit={mockOnSubmit}>
          <button type="submit">Submit</button>
        </Form>
      );

      const emailInput = getByLabelText("Email");
      const submitButton = getByText("Submit");

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "email@test.com" } });
        fireEvent.click(submitButton);
      });

      expect(await findByText(/Password is required/i)).toBeInTheDocument();
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });
});
