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
            "block w-full p-2 text-sm rounded-md outline-none font-sans",
            inputState === "valid" &&
              "text-slate-900 bg-slate-50 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 border-slate-300 focus:border-violet-500 focus:ring-violet-500 dark:focus:border-violet-500 dark:focus:ring-violet-500 dark:border-slate-500 border",
            inputState === "invalid" &&
              "text-slate-900 bg-slate-50 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 border-red-400 border focus:border-red-400 focus:ring-red-400 dark:focus:border-red-400 dark:focus:ring-red-400 focus:ring-1"
          )
        ),
        disabled: cx(
          "cursor-not-allowed border bg-slate-200/60 text-slate-300 dark:bg-slate-700 dark:text-slate-50"
        ),
        error: cx("text-sm text-red-400 -mt-1"),
        label: cx("text-slate-900 dark:text-white pb-1 font-sans"),
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
            onClick={() => handlers.current?.decrement()}
          >
            <MinusIcon />
          </button>
          <button
            className={clsx(
              "flex items-center justify-center w-8 h-8 sm:w-7 sm:h-7 p-1 border rounded-r-md border-slate-300 dark:border-slate-500 hover:bg-slate-200 hover:dark:bg-slate-800 hover:text-slate-800 hover:dark:text-white transition-colors -ml-[1px]",
              inputState === "invalid" && "text-red-400 border-red-400"
            )}
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
