import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useTextField } from "react-aria";
import { useController, UseControllerProps } from "react-hook-form";

// TODO add better typing For FormValues
// type FormValues = {
//   FirstName: string;
// };

interface InputProps extends UseControllerProps<any> {
  label: string;
  placeholder?: string | undefined;
  disabled?: boolean;
  required?: boolean;
  defaultValue?: string;
  type: "number" | "text" | "search" | "tel" | "url" | "email" | "password";
  hasLabel?: boolean;
}

const InputStates = ["valid", "invalid", "disabled"] as const;

export default function TextInput({
  disabled = false,
  required = false,
  hasLabel = true,
  ...rest
}: InputProps) {
  const { field, fieldState } = useController(rest);
  let { labelProps, inputProps, errorMessageProps } = useTextField(
    rest,
    field.ref
  );

  let inputState = "valid" as typeof InputStates[number];
  if (fieldState.error) inputState = "invalid";
  if (disabled) inputState = "disabled";

  return (
    <div className="">
      <label className={clsx(!hasLabel && "sr-only")} {...labelProps}>
        {rest.label}
        {required && <span className="pl-1 text-red-400">*</span>}
      </label>
      <div className={clsx("relative", hasLabel && "pt-1")}>
        <input
          {...inputProps}
          {...field}
          type={rest.type}
          defaultValue={rest.defaultValue}
          disabled={inputState === "disabled"}
          className={clsx(
            "block w-full p-2 text-sm rounded-md outline-none",
            inputState === "valid" &&
              "text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 focus:border-violet-500 focus:ring-violet-500 dark:focus:border-violet-500 dark:focus:ring-violet-500 dark:border-gray-600 border",
            inputState === "invalid" &&
              "text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-red-400 border focus:border-red-400 focus:ring-red-400 dark:focus:border-red-400 dark:focus:ring-red-400 focus:ring-1",
            inputState === "disabled" &&
              "cursor-not-allowed border bg-slate-200/60 text-slate-300 dark:bg-slate-700 dark:text-slate-50"
          )}
          placeholder={rest.placeholder}
        />
        {inputState === "invalid" && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ExclamationCircleIcon className="w-6 h-6 text-red-400" />
          </div>
        )}
      </div>

      {inputState === "invalid" && (
        <p {...errorMessageProps} className="text-sm text-red-400 pt-0.5">
          {fieldState?.error?.message}
        </p>
      )}
    </div>
  );
}
