import { FormControlState } from "@/components/types";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import {
  Autocomplete as MantineAutocomplete,
  AutocompleteProps as MantineAutocompleteProps,
  createStyles,
} from "@mantine/core";
import clsx from "clsx";
import { useTailwindColors } from "../../hooks/useTailwindConfig";
import { useSetting } from "../ThemeToggle";

interface AutocompleteProps extends MantineAutocompleteProps {
  testSelector?: string;
}

function Autocomplete({
  // testSelector = getTestSelector(labelProps.),
  ...rest
}: AutocompleteProps) {
  const themeSetting = useSetting((state) => state.setting);
  const twColors = useTailwindColors();
  const useStyles = createStyles({
    item: {
      color:
        themeSetting === "dark"
          ? twColors?.slate["400"]
          : twColors?.slate["700"],
      "&[data-hovered]": {
        color:
          themeSetting === "dark"
            ? twColors?.slate["100"]
            : twColors?.slate["600"],
        backgroundColor:
          themeSetting === "dark"
            ? twColors?.slate["600"]
            : twColors?.slate["200"],
      },
    },
  });
  const { classes, cx } = useStyles();

  let inputState = "valid" as typeof FormControlState[number];
  if (rest.error) inputState = "invalid";
  if (rest.disabled) inputState = "disabled";
  return (
    <MantineAutocomplete
      {...rest}
      size="md"
      transition="pop"
      transitionDuration={80}
      transitionTimingFunction="ease"
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
        dropdown: cx(
          "bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-r-lg border-l-slate-100 dark:border-l-slate-700 border-l-2 focus:ring-violet-500 focus:border-violet-500 block w-full py-1 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
        ),
        itemsWrapper: cx(
          "p-0 text-sm text-slate-700 dark:text-slate-200 w-full"
        ),
        item: cx(
          clsx(
            classes.item,
            "py-2 w-full text-sm transition-colors duration-100"
          )
        ),
        rightSection: cx(clsx("pointer-events-none")),
        label: cx("text-slate-900 dark:text-white pb-1 font-sans"),
        required: cx("text-red-400"),
      }}
      rightSection={
        <>
          {inputState === "invalid" && (
            <ExclamationCircleIcon className="w-6 h-6 text-red-400" />
          )}
        </>
      }
    />
  );
}

export default Autocomplete;
