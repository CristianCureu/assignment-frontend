import { User } from "./userTypes";

export type APIResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export type Process = {
  id: string;
  name: string;
  color: string;
  private: boolean;
};

export type Processes = Process[];

type CompanyData = {
  companyName: string;
  surname: string;
  type: "person" | "company";
};

export type Card = {
  _id: string;
  process: Process;
  projectManager: User;
  name: string;
  email: string;
  phoneNumber: string;
  phoneProvider: string;
  description: string;
  companyData: CompanyData;
  gender: "male" | "female" | "none";
  contractNumber: string;
  contractType: "1 month" | "6 months" | "1 year";
  startDate: Date;
  newContractDate?: Date;
};

export type Cards = Card[];
