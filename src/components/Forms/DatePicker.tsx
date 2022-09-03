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

      // is date outside given month
      outside: {
        color:
          themeSetting === "dark"
            ? `${twColors?.slate["400"]}60 !important`
            : `${twColors?.slate["500"]}60 !important`,
      },

      weekend: {
        color:
          themeSetting === "dark"
            ? `${twColors?.slate["400"]} !important`
            : `${twColors?.slate["500"]} !important`,
      },

      selected: {
        color: `${twColors?.white} !important`,
        backgroundColor: `${twColors?.violet["500"]} !important`,
      },

      disabled: {
        backgroundColor:
          themeSetting === "dark"
            ? `${twColors?.slate["800"]}20 !important`
            : `${twColors?.slate["300"]}20 !important`,

        // TODO not working
        // cursor: "not-allowed",
        // "&:hover": {
        //   cursor: "not-allowed",
        // },
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
        excludeDate={(date) => date.getDay() === 0 || date.getDay() === 6}
        dayClassName={(date, modifiers) =>
          cx({
            [classes.outside]: modifiers.outside,
            [classes.selected]: modifiers.selected,
            [classes.weekend]:
              modifiers.weekend && !modifiers.outside && !modifiers.selected,
            [classes.disabled]: modifiers.disabled,
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
          error: cx("form-error text-error"),
          label: cx("form-label"),
          required: cx("text-error"),
          icon: cx(inputState === "invalid" && "text-error"),
          dropdown: cx(
            "bg-slate-50 border border-slate-300 text-slate-500 text-sm rounded-r-lg border-l-slate-100 dark:border-l-slate-700 border-l-2",
            "focus:ring-violet-500 focus:border-violet-500 block py-1 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400",
            "dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
          ),
          day: cx(
            "text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700",
            "hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-600 dark:hover:text-white"
          ),
          weekday: cx("text-slate-300 dark:text-slate-900"),
          calendarHeaderLevel: cx(
            "text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700",
            "hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-600 dark:hover:text-white"
          ),
          calendarHeaderControl: cx(
            "text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700",
            "hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-600 dark:hover:text-white"
          ),
          monthPickerControl: cx(
            "text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700",
            "hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-600 dark:hover:text-white"
          ),
          yearPickerControl: cx(
            "text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700",
            "hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-600 dark:hover:text-white"
          ),
          // broken...
          monthPickerControlActive: cx("text-white bg-violet-500"),
          yearPickerControlActive: cx("bg-violet-500 text-white"),
          // ...broken
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
