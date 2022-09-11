import { FormControlState } from "@/components/types";
import { getTestSelector } from "@/utils/testing";
import {
  createStyles,
  TextInput as MantineTextInput,
  TextInputProps as MantineTextInputProps,
} from "@mantine/core";
import clsx from "clsx";
import { forwardRef } from "react";
import { IconAlertCircle } from "tabler-icons";

interface TextInputProps extends MantineTextInputProps {
  testSelector: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ testSelector, ...rest }, ref) => {
    const useStyles = createStyles({});
    const { cx } = useStyles();
    const { error, icon, disabled } = rest;

    let inputState = "valid" as typeof FormControlState[number];
    if (error) inputState = "invalid";
    if (disabled) inputState = "disabled";

    return (
      <MantineTextInput
        {...rest}
        ref={ref}
        size="md"
        cy-data={getTestSelector(testSelector)}
        error={error}
        classNames={{
          root: cx("input-root"),
          input: cx(
            clsx(
              "input",
              icon && "pl-10",
              inputState === "valid" && "input-valid",
              inputState === "invalid" && "input-invalid"
            )
          ),
          disabled: cx("input-disabled"),
          error: cx("form-error text-error"),
          label: cx("form-label"),
          required: cx("text-error"),
          icon: cx(inputState === "invalid" && "text-error"),
          rightSection: cx(clsx("pointer-events-none")),
        }}
        rightSection={
          inputState === "invalid" && (
            <IconAlertCircle className="w-6 h-6 text-error" />
          )
        }
      />
    );
  }
);

TextInput.displayName = "TextInput";
export default TextInput;
