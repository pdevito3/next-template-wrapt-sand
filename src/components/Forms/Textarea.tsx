import { FormControlState } from "@/components/types";
import {
  createStyles,
  Textarea as MantineTextarea,
  TextareaProps as MantineTextareaProps,
} from "@mantine/core";
import clsx from "clsx";
import { forwardRef } from "react";
import { IconAlertCircle } from "tabler-icons";

interface TextareaProps extends MantineTextareaProps {
  testSelector?: string;
  resize?: "none" | "y" | "x" | "both";
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      resize = "none",
      // testSelector = getTestSelector(labelProps.),
      ...rest
    },
    ref
  ) => {
    const useStyles = createStyles({});
    const { cx } = useStyles();
    const { error, disabled } = rest;

    let inputState = "valid" as typeof FormControlState[number];
    if (error) inputState = "invalid";
    if (disabled) inputState = "disabled";

    var resizeClass = "resize-none";
    if (resize === "x") resizeClass = "resize-x";
    if (resize === "y") resizeClass = "resize-y";
    if (resize === "both") resizeClass = "resize";

    return (
      <MantineTextarea
        ref={ref}
        size="md"
        error={error}
        classNames={{
          root: cx("input-root"),
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
        {...rest}
      />
    );
  }
);

export default Textarea;
