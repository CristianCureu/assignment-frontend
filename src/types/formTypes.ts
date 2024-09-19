export type Field = {
  name: string;
  label: string;
  type:
    | "text"
    | "number"
    | "email"
    | "password"
    | "checkbox"
    | "select"
    | "checkboxGroup"
    | "date"
    | "file";
  value?: string;
  options?: Option[];
  disabled?: boolean;
};

type Option = {
  value: string;
  label: string;
};

export type WorkspaceData = {
  workspace: string;
  email: string;
  termsAndConditions: boolean;
  personalData: boolean;
};

export type UserCredentialsData = {
  name: string;
  surname: string;
  password: string;
  confirmPassword: string;
};

export type LoginData = {
  email: string;
  password: string;
};
