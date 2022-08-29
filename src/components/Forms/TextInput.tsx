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
            "block w-full p-2 text-sm rounded-md outline-none font-sans",
            inputState === "valid" &&
              "text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 focus:border-violet-500 focus:ring-violet-500 dark:focus:border-violet-500 dark:focus:ring-violet-500 dark:border-gray-600 border",
            inputState === "invalid" &&
              "text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-red-400 border focus:border-red-400 focus:ring-red-400 dark:focus:border-red-400 dark:focus:ring-red-400 focus:ring-1"
          )
        ),
        disabled: cx(
          "cursor-not-allowed border bg-slate-200/60 text-slate-300 dark:bg-slate-700 dark:text-slate-50"
        ),
        error: cx("text-sm text-red-400 -mt-1"),
        label: cx("text-slate-900 dark:text-white pb-1 font-sans"),
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
