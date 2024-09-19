import { DefaultValues, useForm } from "react-hook-form";
import { ReactNode, useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import * as yup from "yup";

import { Field } from "@src/types/formTypes";
import Input from "@components/molecules/Input";

type FormProps<T> = {
  children: ReactNode | ReactNode[];
  fields: Field[];
  schema: yup.ObjectSchema<any>;
  onSubmit: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  splitLayout?: boolean;
};

const Form = <T,>({
  children,
  fields,
  schema,
  onSubmit,
  defaultValues,
  splitLayout = false,
}: FormProps<T>) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit, control, reset } = methods;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const { leftFields, rightFields } = useMemo(() => {
    if (splitLayout) {
      const midPoint = Math.ceil(fields.length / 2 + 1);
      return {
        leftFields: fields.slice(0, midPoint),
        rightFields: fields.slice(midPoint),
      };
    }
    return { leftFields: [], rightFields: [] };
  }, [splitLayout, fields]);

  return (
    <StyledForm isMobile={isMobile} onSubmit={handleSubmit(onSubmit)}>
      {splitLayout ? (
        <GridContainer>
          <ColumnContainer>
            {leftFields.map((field) => (
              <Input key={field.name} field={field} control={control} />
            ))}
          </ColumnContainer>
          <ColumnContainer>
            {rightFields.map((field) => (
              <Input key={field.name} field={field} control={control} />
            ))}
          </ColumnContainer>
        </GridContainer>
      ) : (
        fields.map((field) => <Input key={field.name} field={field} control={control} />)
      )}
      {children}
    </StyledForm>
  );
};

export default Form;

const GridContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: 20,
  width: "100%",
});

const ColumnContainer = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

const StyledForm = styled("form")<{ isMobile: boolean }>(({ isMobile }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  width: isMobile ? "67%" : "auto"
}));
