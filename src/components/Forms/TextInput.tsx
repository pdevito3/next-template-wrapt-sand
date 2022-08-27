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

export default function TextInput(props: InputProps) {
  const { field, fieldState } = useController(props);
  let { labelProps, inputProps, errorMessageProps } = useTextField(
    props,
    field.ref
  );

  return (
    <div className="">
      <label {...labelProps}>{props.label}</label>
      <div className="relative pt-1">
        <input
          {...inputProps}
          {...field}
          className={clsx(
            "block w-full p-2 text-sm text-gray-900 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 outline-none",
            fieldState.error === undefined
              ? "border-gray-300 focus:border-violet-500 focus:ring-violet-500 dark:focus:border-violet-500 dark:focus:ring-violet-500 dark:border-gray-600 border"
              : "border-red-400 border focus:border-red-400 focus:ring-red-400 dark:focus:border-red-400 dark:focus:ring-red-400 focus:ring-1"
          )}
          placeholder={props.placeholder}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ExclamationCircleIcon className="w-6 h-6 text-red-400" />
        </div>
      </div>

      {fieldState.error && (
        <p {...errorMessageProps} className="text-sm text-red-400 pt-0.5">
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
}
