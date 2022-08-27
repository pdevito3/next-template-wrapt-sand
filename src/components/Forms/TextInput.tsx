import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
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
}

const InputStates = ["valid", "invalid", "disabled"] as const;
// Then use as --> status: Status;

export default function TextInput(props: InputProps) {
  const { field, fieldState } = useController(props);
  let { labelProps, inputProps, errorMessageProps } = useTextField(
    props,
    field.ref
  );

  let inputState = "valid" as typeof InputStates[number];
  if (fieldState.error) inputState = "invalid";
  if (props.disabled) inputState = "disabled";

  return (
    <div className="">
      <label {...labelProps}>{props.label}</label>
      <div className="relative pt-1">
        <input
          {...inputProps}
          {...field}
          disabled={inputState === "disabled"}
          className={clsx(
            "block w-full p-2 text-sm rounded-lg outline-none",
            inputState === "valid" &&
              "text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 focus:border-violet-500 focus:ring-violet-500 dark:focus:border-violet-500 dark:focus:ring-violet-500 dark:border-gray-600 border",
            inputState === "invalid" &&
              "text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-red-400 border focus:border-red-400 focus:ring-red-400 dark:focus:border-red-400 dark:focus:ring-red-400 focus:ring-1",
            inputState === "disabled" &&
              "cursor-not-allowed border bg-slate-200/60 text-slate-300 dark:bg-slate-700 dark:text-slate-50"
          )}
          placeholder={props.placeholder}
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
