import { FormControlState } from "@/components/types";
import {
  createStyles,
  TextInput as MantineTextInput,
  TextInputProps as MantineTextInputProps,
} from "@mantine/core";
import clsx from "clsx";
import { IconAlertCircle } from "tabler-icons";

interface TextInputProps extends MantineTextInputProps {
  testSelector?: string;
}

function TextInput({
  // testSelector = getTestSelector(labelProps.),
  ...rest
}: TextInputProps) {
  const useStyles = createStyles({});
  const { cx } = useStyles();
  const { error, icon, disabled } = rest;

  let inputState = "valid" as typeof FormControlState[number];
  if (error) inputState = "invalid";
  if (disabled) inputState = "disabled";

  return (
    <MantineTextInput
      size="md"
      error={error}
      classNames={{
        input: cx(
          clsx(
            "input",
            icon && "pl-10",
            inputState === "valid" && "input-valid",
            inputState === "invalid" && "input-invalid"
          )
        ),
        disabled: cx("input-disabled"),
        error: cx("form-error"),
        label: cx("form-label"),
        required: cx("text-red-400"),
        rightSection: cx(clsx("pointer-events-none")),
      }}
      rightSection={
        inputState === "invalid" && (
          <IconAlertCircle className="w-6 h-6 text-red-400" />
        )
      }
      {...rest}
    />
  );
}

export default TextInput;
