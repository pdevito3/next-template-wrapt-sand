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

  let inputState = "valid" as typeof FormControlState[number];
  if (rest.error) inputState = "invalid";
  if (rest.disabled) inputState = "disabled";

  return (
    <MantineTextInput
      {...rest}
      size="md"
      error={rest.error}
      classNames={{
        input: cx(
          clsx(
            "input",
            rest.icon && "pl-10",
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
    />
  );
}

export default TextInput;
