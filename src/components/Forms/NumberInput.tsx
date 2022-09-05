import { FormControlState } from "@/components/types";
import { getTestSelector } from "@/utils/testing";
import {
  createStyles,
  NumberInput as MantineNumberInput,
  NumberInputHandlers,
  NumberInputProps as MantineNumberInputProps,
} from "@mantine/core";
import clsx from "clsx";
import { forwardRef, useRef } from "react";
import { IconAlertCircle, IconMinus, IconPlus } from "tabler-icons";

interface NumberInputProps extends MantineNumberInputProps {
  testSelector: string;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ testSelector, ...rest }, ref) => {
    const useStyles = createStyles({});
    const { cx } = useStyles();
    const handlers = useRef<NumberInputHandlers>();
    const { error, disabled, value, min, max } = rest;

    let inputState = "valid" as typeof FormControlState[number];
    if (error) inputState = "invalid";
    if (disabled) inputState = "disabled";

    return (
      <MantineNumberInput
        ref={ref}
        handlersRef={handlers}
        size="md"
        cy-data={getTestSelector(testSelector)}
        formNoValidate={true}
        classNames={{
          root: cx("input-root"),
          input: cx(
            clsx(
              "input",
              inputState === "valid" && "input-valid",
              inputState === "invalid" && "input-invalid"
            )
          ),
          disabled: cx("input-disabled"),
          error: cx("form-error text-error"),
          label: cx("form-label"),
          required: cx("text-error"),
        }}
        rightSection={
          <>
            <div className="pr-1">
              {inputState === "invalid" && (
                <IconAlertCircle className="w-6 h-6 text-red-400 pointer-events-none" />
              )}
            </div>
            <button
              className={clsx(
                "flex items-center justify-center w-8 h-8 sm:w-7 sm:h-7 p-1 border rounded-l-md transition-colors",
                inputState === "invalid" && "text-red-400 border-red-400",
                value == min
                  ? "cursor-not-allowed bg-slate-200/60 text-slate-400 dark:bg-slate-900/75 dark:text-slate-40 border-slate-300 dark:border-slate-500"
                  : "border-slate-300 dark:border-slate-500 hover:bg-slate-200 hover:dark:bg-slate-800 hover:text-slate-800 hover:dark:text-white"
              )}
              type="button"
              disabled={value == min}
              aria-disabled={value == min}
              onClick={() => handlers.current?.decrement()}
            >
              <IconMinus />
            </button>
            <button
              className={clsx(
                "flex items-center justify-center w-8 h-8 sm:w-7 sm:h-7 p-1 border rounded-r-md transition-colors -ml-[1px]",
                inputState === "invalid" && "text-red-400 border-red-400",
                value === max
                  ? "cursor-not-allowed bg-slate-200/60 text-slate-400 dark:bg-slate-900/75 dark:text-slate-40 border-slate-300 dark:border-slate-500"
                  : "border-slate-300 dark:border-slate-500 hover:bg-slate-200 hover:dark:bg-slate-800 hover:text-slate-800 hover:dark:text-white"
              )}
              type="button"
              disabled={value === max}
              aria-disabled={value === max}
              onClick={() => handlers.current?.increment()}
            >
              <IconPlus />
            </button>
          </>
        }
        rightSectionWidth={inputState === "invalid" ? 100 : 80}
        {...rest}
      />
    );
  }
);

export default NumberInput;
