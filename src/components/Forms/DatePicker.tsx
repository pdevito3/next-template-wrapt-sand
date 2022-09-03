import { FormControlState } from "@/components/types";
import { createStyles } from "@mantine/core";
import {
  DatePicker as MantineDatePicker,
  DatePickerProps as MantineDatePickerProps,
} from "@mantine/dates";
import clsx from "clsx";
import { forwardRef } from "react";
import { IconAlertCircle, IconCalendar } from "tabler-icons";
import { useTailwindColors } from "../../hooks/useTailwindConfig";
import { useSetting } from "../ThemeToggle";

interface DatePickerProps extends MantineDatePickerProps {
  testSelector?: string;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      // testSelector = getTestSelector(labelProps.),
      ...rest
    },
    ref
  ) => {
    const themeSetting = useSetting((state) => state.setting);
    const twColors = useTailwindColors();
    const useStyles = createStyles({
      // TODO abstract out
      item: {
        // color:
        //   themeSetting === "dark"
        //     ? twColors?.slate["400"]
        //     : twColors?.slate["700"],
        // "&[data-hovered]": {
        //   color:
        //     themeSetting === "dark"
        //       ? twColors?.slate["100"]
        //       : twColors?.slate["600"],
        //   backgroundColor:
        //     themeSetting === "dark"
        //       ? twColors?.slate["600"]
        //       : twColors?.slate["200"],
        // },
        // "&[data-selected]": {
        //   color:
        //     themeSetting === "dark"
        //       ? twColors?.violet["100"]
        //       : twColors?.violet["600"],
        //   backgroundColor:
        //     themeSetting === "dark"
        //       ? twColors?.violet["600"]
        //       : twColors?.violet["200"],
        // },
        // "&[data-selected]&:hover": {
        //   color:
        //     themeSetting === "dark"
        //       ? twColors?.slate["100"]
        //       : twColors?.slate["600"],
        //   backgroundColor:
        //     themeSetting === "dark"
        //       ? twColors?.slate["600"]
        //       : twColors?.slate["200"],
        // },
      },
      // outside: {
      //   opacity: 0,
      // },

      weekend: {
        color: `${twColors?.green["400"]} !important`,
      },

      selected: {
        color: `${twColors?.pink["400"]} !important`,
      },
    });
    const { classes, cx } = useStyles();
    const { error, disabled, value, clearable, icon } = rest;

    let inputState = "valid" as typeof FormControlState[number];
    if (error) inputState = "invalid";
    if (disabled) inputState = "disabled";

    const showClearable = clearable && value !== null && value !== undefined;

    return (
      <MantineDatePicker
        ref={ref}
        size="md"
        allowFreeInput
        dateParser={(dateString) => new Date(Date.parse(dateString))}
        // new Date(dayjs(dateString).format("yyyy/MM/dd"))
        transition="pop"
        transitionDuration={80}
        transitionTimingFunction="ease"
        firstDayOfWeek="sunday"
        icon={icon ?? <IconCalendar size={16} />}
        dayClassName={(date, modifiers) =>
          cx({
            // [classes.outside]: modifiers.outside,

            // TODO full selected style, make weekends the same as weekday, disabled state, level change styles?

            [classes.selected]: modifiers.selected,
            [classes.weekend]: modifiers.weekend,
          })
        }
        classNames={{
          root: cx("input-root"),
          input: cx(
            clsx(
              "input",
              "pl-10", // for icon
              inputState === "valid" && "input-valid",
              inputState === "invalid" && "input-invalid"
            )
          ),
          disabled: cx("input-disabled"),
          error: cx("form-error"),
          label: cx("form-label"),
          required: cx("text-red-400"),
          icon: cx(inputState === "invalid" && "text-red-400"),
          dropdown: cx(
            "bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-r-lg border-l-slate-100 dark:border-l-slate-700 border-l-2",
            "focus:ring-violet-500 focus:border-violet-500 block py-1 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400",
            "dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
          ),
          rightSection: cx(clsx(!showClearable && "pointer-events-none")),
        }}
        rightSection={
          !showClearable && (
            <div className="flex items-center justify-center space-x-2">
              {inputState === "invalid" && (
                <IconAlertCircle className="w-6 h-6 text-red-400" />
              )}
            </div>
          )
        }
        rightSectionWidth={40}
        {...rest}
      />
    );
  }
);

export default DatePicker;
