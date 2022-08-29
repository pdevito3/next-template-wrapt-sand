import { FormControlState } from "@/components/types";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import {
  createStyles,
  TextInput as MantineTextInput,
  TextInputProps as MantineTextInputProps,
} from "@mantine/core";
import clsx from "clsx";

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

  console.log(inputState);
  console.log(rest.error);

  return (
    <MantineTextInput
      {...rest}
      size="md"
      error={rest.error}
      classNames={{
        input: cx(
          clsx(
            "input",
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
          <ExclamationCircleIcon className="w-6 h-6 text-red-400" />
        )
      }
    />
  );
}

export default TextInput;
