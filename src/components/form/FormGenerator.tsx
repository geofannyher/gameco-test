"use client";
import React, { ForwardedRef } from "react";
import { FormGeneratorProps } from "@/components/form/types";
import { FormGeneratorLoader } from "@/components/form/FormGeneratorLoader";
import { FormField } from "@/components/form/FormFields";

const FormGenerator = React.forwardRef<HTMLFormElement, FormGeneratorProps>(
  (
    { schema, state: formGenState, model, updateModelValue },
    ref: ForwardedRef<HTMLFormElement>
  ) => {
    if (formGenState.isLoading) {
      return <FormGeneratorLoader />;
    }

    return (
      <fieldset ref={ref as ForwardedRef<HTMLFieldSetElement>}>
        {schema.definitions.map((field) => (
          <FormField
            key={field.name}
            field={field}
            path={field.name}
            value={model?.[field.name]}
            errors={formGenState?.errors?.[field.name]}
            updateModelValue={updateModelValue}
          />
        ))}
      </fieldset>
    );
  }
);

FormGenerator.displayName = "FormGenerator";

export { FormGenerator };
