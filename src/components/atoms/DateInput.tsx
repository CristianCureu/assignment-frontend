import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

import { InputProps } from "@components/molecules/Input";

const DateInput = ({ field, control }: InputProps) => {
  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={null}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={field.label}
            value={value ? dayjs(value) : null} // Convert value to Dayjs object
            onChange={(date: Dayjs | null) => onChange(date?.toISOString() || null)} // Convert Dayjs back to ISO string on change
            slotProps={{
              textField: {
                error: !!error,
                helperText: error?.message,
                fullWidth: true,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default DateInput;
