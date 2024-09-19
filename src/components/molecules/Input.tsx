import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

import { Field } from "@src/types/formTypes";
import SelectInput from "@components/atoms/SelectInput";
import CheckboxGroup from "@components/atoms/CheckboxGroup";
import DateInput from "@components/atoms/DateInput";
import CheckboxInput from "@components/atoms/Checkbox";
import FileInput from "@components/atoms/FileInput";

export type InputProps = {
  field: Field;
  control: any;
};

const Input = ({ field, control }: InputProps) => {
  switch (field.type) {
    case "checkboxGroup":
      return <CheckboxGroup field={field} control={control} />;
    case "checkbox":
      return <CheckboxInput field={field} control={control} />;
    case "select":
      return <SelectInput field={field} control={control} />;
    case "date":
      return <DateInput field={field} control={control} />;
    case "file":
      return <FileInput field={field} control={control} />;
    default:
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              name={field.name}
              label={field.label}
              type={field.type}
              error={!!error}
              helperText={error?.message}
              value={value || ""}
              onChange={onChange}
              disabled={field.disabled}
            />
          )}
        />
      );
  }
};

export default Input;
