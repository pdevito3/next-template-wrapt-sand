import { FormControlState } from "@/components/types";
import {
  ChevronDownIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { createStyles, Select, SelectProps } from "@mantine/core";
import clsx from "clsx";
import { useTailwindColors } from "../../hooks/useTailwindConfig";
import { useSetting } from "../ThemeToggle";

interface ComboBoxProps extends SelectProps {
  testSelector?: string;
}

function ComboBox({
  // testSelector = getTestSelector(labelProps.),
  ...rest
}: ComboBoxProps) {
  const themeSetting = useSetting((state) => state.setting);
  const twColors = useTailwindColors();
  const useStyles = createStyles({
    // TODO abstract out
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

  let inputState = "valid" as typeof FormControlState[number];
  if (rest.error) inputState = "invalid";
  if (rest.disabled) inputState = "disabled";

  const showClearable =
    rest.clearable && rest.value !== null && rest.value !== undefined;

  return (
    <Select
      {...rest}
      size="md"
      transition="pop"
      transitionDuration={80}
      transitionTimingFunction="ease"
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
        dropdown: cx("input-dropdown"),
        itemsWrapper: cx("input-items-wrapper"),
        item: cx(clsx(classes.item, "input-item")),
        rightSection: cx(clsx(!showClearable && "pointer-events-none")),
      }}
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
