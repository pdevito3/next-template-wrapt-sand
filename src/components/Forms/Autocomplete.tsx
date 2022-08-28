import { FormControlState } from "@/components/types";
import {
  Autocomplete as MantineAutocomplete,
  AutocompleteProps as MantineAutocompleteProps,
  createStyles,
} from "@mantine/core";
import clsx from "clsx";

interface AutocompleteProps extends MantineAutocompleteProps {
  testSelector?: string;
}

function Autocomplete({
  // testSelector = getTestSelector(labelProps.),
  ...rest
}: AutocompleteProps) {
  const useStyles = createStyles({});
  const { cx } = useStyles();

  let inputState = "valid" as typeof FormControlState[number];
  if (rest.error) inputState = "invalid";
  if (rest.disabled) inputState = "disabled";
  return (
    <MantineAutocomplete
      {...rest}
      size="md"
      classNames={{
        input: cx(
          clsx(
            "block w-full p-2 text-sm rounded-md outline-none",
            inputState === "valid" &&
              "text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 focus:border-violet-500 focus:ring-violet-500 dark:focus:border-violet-500 dark:focus:ring-violet-500 dark:border-gray-600 border",
            inputState === "invalid" &&
              "text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-red-400 border focus:border-red-400 focus:ring-red-400 dark:focus:border-red-400 dark:focus:ring-red-400 focus:ring-1"
          )
        ),
        disabled: cx(
          "cursor-not-allowed border bg-slate-200/60 text-slate-300 dark:bg-slate-700 dark:text-slate-50"
        ),
        dropdown: cx(
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-violet-500 focus:border-violet-500 block w-full py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
        ),
        itemsWrapper: cx("p-0 text-sm text-gray-700 dark:text-gray-200 w-full"),
        item: cx(clsx("py-2 w-full text-sm text-gray-700 dark:text-gray-400")),
        hovered: cx(
          "text-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-600"
        ),
      }}
    />
  );
}

export default Autocomplete;