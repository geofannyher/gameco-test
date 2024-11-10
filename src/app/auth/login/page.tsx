// pages/login.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormGenerator } from "@/components/form/FormGenerator";
import { useFormGen } from "@/components/form/useFormGen";
import { FormSchema } from "@/components/form/types";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Definisikan skema formulir login
  const schema: FormSchema = {
    name: "login-form",
    definitions: [
      {
        name: "email",
        type: "text",
        label: { text: "Email" },
        rules: [{ name: "required" }],
      },
      {
        name: "password",
        type: "password",
        label: { text: "Password" },
        rules: [{ name: "required" }],
      },
    ],
  };

  // Menginisialisasi useFormGen
  const { state, model, updateModelValue, handleSubmit } = useFormGen({
    schema,
    model: { email: "", password: "" },
  });

  // Fungsi untuk menangani submit form
  const handleLoginSubmit = async (model: any) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(model),
    });

    if (res.status === 200) {
      let returnUrl = searchParams.get("return");
      returnUrl = (returnUrl && decodeURIComponent(returnUrl)) ?? "/";
      router.push(returnUrl);
    }
  };

  return (
    <div className="flex h-[100dvh] justify-center items-center">
      <div className="w-full md:w-96 mx-auto p-4 border border-gray-200 rounded shadow-md">
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <FormGenerator
            schema={schema}
            state={state}
            model={model}
            updateModelValue={updateModelValue}
          />
          <div className="mt-4">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
