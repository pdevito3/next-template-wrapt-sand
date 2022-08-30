import { FormControlState } from "@/components/types";
import {
  createStyles,
  Textarea as MantineTextarea,
  TextareaProps as MantineTextareaProps,
} from "@mantine/core";
import clsx from "clsx";
import { IconAlertCircle } from "tabler-icons";

interface TextareaProps extends MantineTextareaProps {
  testSelector?: string;
  resize?: "none" | "y" | "x" | "both";
}

function Textarea({
  // testSelector = getTestSelector(labelProps.),
  resize = "none",
  ...rest
}: TextareaProps) {
  const useStyles = createStyles({});
  const { cx } = useStyles();

  let inputState = "valid" as typeof FormControlState[number];
  if (rest.error) inputState = "invalid";
  if (rest.disabled) inputState = "disabled";

  var resizeClass = "resize-none";
  if (resize === "x") resizeClass = "resize-x";
  if (resize === "y") resizeClass = "resize-y";
  if (resize === "both") resizeClass = "resize";

  return (
    <MantineTextarea
      {...rest}
      size="md"
      error={rest.error}
      classNames={{
        input: cx(
          clsx(
            "input",
            resizeClass,
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

export default Textarea;
