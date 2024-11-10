"use client";
import { logout } from "@/actions/logout";
import { FormModel, FormSchema } from "@/components/form/types";
import { useFormGen } from "@/components/form/useFormGen";
import { FormGenerator } from "@/components/form/FormGenerator";
import { Button } from "@/components/ui/button";

export default function FormPage() {
  const schema = {
    name: "simple-form",
    definitions: [
      {
        name: "first_name",
        type: "text",
        label: { text: "First Name" },
        rules: [{ name: "required" }],
      },
      {
        name: "last_name",
        type: "text",
        label: { text: "Last Name" },
        rules: [{ name: "required" }],
      },
    ],
  } as FormSchema;

  const { state, model, updateModelValue, handleSubmit } = useFormGen({
    schema: schema,
    model: { first_name: "", last_name: "" },
  });

  const logSubmit = async (model: FormModel) => {
    console.log(model);
  };
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Form Page</h1>

      <form
        onSubmit={handleSubmit(logSubmit)}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <FormGenerator
          schema={schema}
          state={state}
          model={model}
          updateModelValue={updateModelValue}
        />

        <Button type="submit" className="w-full mt-4">
          Submit
        </Button>
      </form>

      <div className="flex justify-center mt-6">
        <hr className="w-1/4 border-gray-300" />
      </div>

      <form action={logout} className="mt-6 text-center">
        <Button type="submit" variant="default" size="default">
          Logout
        </Button>
      </form>
    </div>
  );
}
