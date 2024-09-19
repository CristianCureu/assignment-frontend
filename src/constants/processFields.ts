import { Field } from "@src/types/formTypes";

export const createProcessFields: Field[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "color",
    label: "Color",
    type: "text",
  },
];

export const userEmail: Field[] = [
  {
    name: "email",
    label: "User Email",
    type: "email",
  },
];
