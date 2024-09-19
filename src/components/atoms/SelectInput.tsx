import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

import { InputProps } from "@components/molecules/Input";

const SelectInput = ({ field, control }: InputProps) => {
  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth>
          <InputLabel>{field.label}</InputLabel>
          <Select
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            error={!!error}
            label={field.label}
          >
            {field.options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && (
            <Typography sx={{ padding: 0, margin: 0 }} variant="caption" color="error">
              {error.message}
            </Typography>
          )}
        </FormControl>
      )}
    />
  );
};

export default SelectInput;
