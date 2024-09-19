import { User } from "./userTypes";

export type Task = {
  _id: string;
  title: string;
  description: string;
  priority: "urgent" | "high" | "medium" | "low";
  label: string;
  status: "to-do" | "in-progress" | "review" | "completed";
  person: User;
};

export type Tasks = {
  [key: string]: Task[];
};
