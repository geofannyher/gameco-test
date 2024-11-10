// TODO: Challenge #3 - create a password field component
import React, { useEffect, useState } from "react";
import { TextFieldProps } from "@/components/form/types";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { PrimitiveValues } from "@/utils/types";

const PasswordField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ field, value, path, updateModelValue, ...props }, ref) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
      console.log(`PasswordField ${path} mounted`);
      return () => {
        console.log(`PasswordField ${path} unmounted`);
      };
    }, []);

    useEffect(() => {
      console.log(`PasswordField ${path} rerendered`);
    });

    const togglePasswordVisibility = () => {
      setPasswordVisible(!isPasswordVisible);
    };
    const getValueForInput = (
      val: PrimitiveValues
    ): string | number | readonly string[] | undefined => {
      if (typeof val === "string" || typeof val === "number") {
        return val;
      }
      return ""; // Jika nilainya bukan `string` atau `number`, berikan nilai default ""
    };
    return (
      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        <Input
          ref={ref}
          type={isPasswordVisible ? "text" : "password"}
          name={field.name}
          id={path}
          value={getValueForInput(value)}
          onChange={(e) => updateModelValue(path, field, e.target.value)}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            right: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Toggle password visibility"
        >
          {isPasswordVisible ? (
            <EyeOffIcon style={{ width: "1.5em", height: "1.5em" }} />
          ) : (
            <EyeIcon style={{ width: "1.5em", height: "1.5em" }} />
          )}
        </button>
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField";
export { PasswordField };
