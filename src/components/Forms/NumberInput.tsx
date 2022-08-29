import { FormControlState } from "@/components/types";
import {
  ExclamationCircleIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import {
  createStyles,
  NumberInput as MantineNumberInput,
  NumberInputHandlers,
  NumberInputProps as MantineNumberInputProps,
} from "@mantine/core";
import clsx from "clsx";
import { useRef } from "react";

interface NumberInputProps extends MantineNumberInputProps {
  testSelector?: string;
}

function NumberInput({
  // testSelector = getTestSelector(labelProps.),
  ...rest
}: NumberInputProps) {
  const useStyles = createStyles({});
  const { cx } = useStyles();
  const handlers = useRef<NumberInputHandlers>();

  let inputState = "valid" as typeof FormControlState[number];
  if (rest.error) inputState = "invalid";
  if (rest.disabled) inputState = "disabled";
  return (
    <MantineNumberInput
      {...rest}
      handlersRef={handlers}
      size="md"
      formNoValidate={true}
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
      }}
      rightSection={
        <>
          <div className="pr-1">
            {inputState === "invalid" && (
              <ExclamationCircleIcon className="w-6 h-6 text-red-400 pointer-events-none" />
            )}
          </div>
          <button
            className={clsx(
              "flex items-center justify-center w-8 h-8 sm:w-7 sm:h-7 p-1 border rounded-l-md border-slate-300 dark:border-slate-500 hover:bg-slate-200 hover:dark:bg-slate-800 hover:text-slate-800 hover:dark:text-white transition-colors",
              inputState === "invalid" && "text-red-400 border-red-400"
            )}
            type="button"
            onClick={() => handlers.current?.decrement()}
          >
            <MinusIcon />
          </button>
          <button
            className={clsx(
              "flex items-center justify-center w-8 h-8 sm:w-7 sm:h-7 p-1 border rounded-r-md border-slate-300 dark:border-slate-500 hover:bg-slate-200 hover:dark:bg-slate-800 hover:text-slate-800 hover:dark:text-white transition-colors -ml-[1px]",
              inputState === "invalid" && "text-red-400 border-red-400"
            )}
            type="button"
            onClick={() => handlers.current?.increment()}
          >
            <PlusIcon />
          </button>
        </>
      }
      rightSectionWidth={inputState === "invalid" ? 100 : 80}
    />
  );
}

export default NumberInput;
