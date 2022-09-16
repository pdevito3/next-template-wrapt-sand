import { FormControlState } from "@/components/types";
import { getTestSelector } from "@/utils/testing";
import {
  Autocomplete as MantineAutocomplete,
  AutocompleteProps as MantineAutocompleteProps,
  createStyles,
} from "@mantine/core";
import clsx from "clsx";
import { IconAlertCircle } from "tabler-icons";
import { useTailwindColors } from "../../hooks/useTailwindConfig";
import { useSetting } from "../ThemeToggle";

interface AutocompleteProps extends MantineAutocompleteProps {
  testSelector: string;
}

function Autocomplete({ testSelector, ...rest }: AutocompleteProps) {
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

      "&[data-selected]": {
        color:
          themeSetting === "dark"
            ? twColors?.violet["100"]
            : twColors?.violet["600"],
        backgroundColor:
          themeSetting === "dark"
            ? twColors?.violet["600"]
            : twColors?.violet["200"],
      },

      "&[data-selected]&:hover": {
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
  const { error, disabled } = rest;

  let inputState = "valid" as typeof FormControlState[number];
  if (error) inputState = "invalid";
  if (disabled) inputState = "disabled";

  return (
    <MantineAutocomplete
      {...rest}
      size="md"
      transition="pop"
      transitionDuration={80}
      transitionTimingFunction="ease"
      cy-data={getTestSelector(testSelector)}
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
        dropdown: cx("input-dropdown"),
        itemsWrapper: cx("input-items-wrapper"),
        item: cx(clsx(classes.item, "input-item")),
        rightSection: cx(clsx("pointer-events-none")),
      }}
      rightSection={
        <>
          {inputState === "invalid" && (
            <IconAlertCircle className="w-6 h-6 text-red-400" />
          )}
        </>
      }
    />
  );
}

Autocomplete.displayName = "Autocomplete";
export { Autocomplete };
