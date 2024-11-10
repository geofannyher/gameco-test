import React from "react";
import { FormFieldProps } from "@/components/form/types";
import { TextField } from "@/components/form/fields/TextField";
import { FormLabel } from "@/components/form/FormLabel";
import { PrimitiveValues } from "@/utils/types";
import { PasswordField } from "./fields/PasswordField";

const FormField = React.memo(
  React.forwardRef<HTMLDivElement, FormFieldProps>(
    ({ field, path, value, errors, updateModelValue, ...props }, ref) => {
      const getPrimitiveValue = (val: any): PrimitiveValues => {
        if (
          typeof val === "string" ||
          typeof val === "number" ||
          typeof val === "boolean" ||
          val === null ||
          val === undefined
        ) {
          return val;
        }
        return ""; // Nilai default jika `value` bukan `PrimitiveValues`
      };

      const generateField = () => {
        let Component = null;

        switch (field.type) {
          case "text":
            Component = TextField;
            break;
          case "password":
            Component = PasswordField;
            break;
          default:
            return <></>;
        }

        return (
          <FormLabel label={field.label} errors={errors} path={path}>
            <Component
              field={field}
              value={getPrimitiveValue(value)}
              path={path}
              updateModelValue={updateModelValue}
              {...props}
            />
          </FormLabel>
        );
      };

      return generateField();
    }
  ),
  (prevProps, nextProps) => {
    // Hanya rerender jika `value` atau `errors` berubah
    return (
      prevProps.value === nextProps.value &&
      prevProps.errors === nextProps.errors
    );
  }
);

FormField.displayName = "FormField";
export { FormField };
