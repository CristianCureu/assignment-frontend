import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

import { InputProps } from "@components/molecules/Input";

const CheckboxInput = ({ field, control }: InputProps) => {
  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={false}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Grid container direction="column">
          <FormControlLabel
            control={
              <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />
            }
            label={<Typography variant="body2">{field.label}</Typography>}
          />
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

export default CheckboxInput;
