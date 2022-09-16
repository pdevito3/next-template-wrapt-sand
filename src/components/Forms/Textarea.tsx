import { FormControlState } from "@/components/types";
import { getTestSelector } from "@/utils/testing";
import {
  createStyles,
  Textarea as MantineTextarea,
  TextareaProps as MantineTextareaProps,
} from "@mantine/core";
import clsx from "clsx";
import { forwardRef } from "react";
import { IconAlertCircle } from "tabler-icons";

interface TextareaProps extends MantineTextareaProps {
  testSelector: string;
  resize?: "none" | "y" | "x" | "both";
  asInputHeight?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ resize = "none", testSelector, asInputHeight = false, ...rest }, ref) => {
    const useStyles = createStyles({});
    const { cx } = useStyles();
    const { error, disabled, maxRows, minRows } = rest;

    let inputState = "valid" as typeof FormControlState[number];
    if (error) inputState = "invalid";
    if (disabled) inputState = "disabled";

    var resizeClass = "resize-none";
    if (resize === "x") resizeClass = "resize-x";
    if (resize === "y") resizeClass = "resize-y";
    if (resize === "both") resizeClass = "resize";

    return (
      <MantineTextarea
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
              asInputHeight ? "none" : resizeClass,
              inputState === "valid" && "input-valid",
              inputState === "invalid" && "input-invalid",
              asInputHeight && "h-6"
            )
          ),
          disabled: cx("input-disabled"),
          error: cx("form-error text-error"),
          label: cx("form-label"),
          required: cx("text-error"),
          rightSection: cx(clsx("pointer-events-none")),
        }}
        rightSection={
          inputState === "invalid" && (
            <IconAlertCircle className="w-6 h-6 text-red-400" />
          )
        }
        maxRows={asInputHeight ? 1 : maxRows}
        minRows={asInputHeight ? 1 : minRows}
      />
    );
  }
);

Textarea.displayName = "Textarea";
export { Textarea };
