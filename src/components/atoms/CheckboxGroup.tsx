import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

import { InputProps } from "@components/molecules/Input";

const CheckboxGroup = ({ field, control }: InputProps) => {
  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Grid container direction="column">
          <FormLabel>{field.label}</FormLabel>
          {field.options?.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  checked={value === option.value}
                  onChange={(e) => {
                    onChange(e.target.checked ? option.value : "");
                  }}
                />
              }
              label={<Typography variant="body2">{option.label}</Typography>}
            />
          ))}
          {error && (
            <Typography sx={{ padding: 0, margin: 0 }} variant="caption" color="error">
              {error.message}
            </Typography>
          )}
        </Grid>
      )}
    />
  );
};

export default CheckboxGroup;
