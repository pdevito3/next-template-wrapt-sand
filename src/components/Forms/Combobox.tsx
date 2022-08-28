import { FormControlState } from "@/components/types";
import {
  ChevronDownIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
// import {
//   ChevronDownIcon,
//   ExclamationCircleIcon,
// } from "@heroicons/react/24/solid";
import { createStyles, Select, SelectProps } from "@mantine/core";
import clsx from "clsx";

interface ComboBoxProps extends SelectProps {
  testSelector?: string;
}

function ComboBox({
  // testSelector = getTestSelector(labelProps.),
  ...rest
}: ComboBoxProps) {
  const useStyles = createStyles({});
  const { cx } = useStyles();

  let inputState = "valid" as typeof FormControlState[number];
  if (rest.error) inputState = "invalid";
  if (rest.disabled) inputState = "disabled";

  const showClearable =
    rest.clearable && rest.value !== null && rest.value !== undefined;
  console.log(showClearable);

  return (
    <Select
      {...rest}
      size="md"
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
        dropdown: cx(
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-violet-500 focus:border-violet-500 block w-full py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
        ),
        itemsWrapper: cx("p-0 text-sm text-gray-700 dark:text-gray-200 w-full"),
        item: cx(clsx("py-2 w-full text-sm text-gray-700 dark:text-gray-400")),
        rightSection: cx(clsx(!showClearable && "pointer-events-none")),
        label: cx("text-slate-900 dark:text-white pb-1 font-sans"),
        required: cx("text-red-400"),
      }}
      transition="pop"
      transitionDuration={80}
      transitionTimingFunction="ease"
      rightSection={
        !showClearable && (
          <div className="flex items-center justify-center space-x-2">
            {inputState === "invalid" && (
              <ExclamationCircleIcon className="w-6 h-6 text-red-400" />
            )}
            <ChevronDownIcon
              className={clsx(
                "w-4 h-4",
                inputState === "invalid" && "text-red-400"
              )}
            />
          </div>
        )
      }
      rightSectionWidth={inputState === "invalid" ? 70 : 40}
    />
  );
}

export default ComboBox;
