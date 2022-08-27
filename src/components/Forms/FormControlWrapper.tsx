import { FormControlState } from "@/components/types";
import { DOMAttributes } from "@react-types/shared";
import clsx from "clsx";

interface FormControlWrapperProps {
  label: string;
  required?: boolean;
  labelIsVisible?: boolean;
  controlState: typeof FormControlState[number];
  children: React.ReactNode;
  labelProps: DOMAttributes;
  errorMessageProps: DOMAttributes;
  errorMessage: string | undefined;
}

export default function FormControlWrapper({
  label,
  required,
  labelIsVisible,
  controlState,
  labelProps,
  errorMessageProps,
  errorMessage,
  children,
}: FormControlWrapperProps) {
  return (
    <div className="">
      <label className={clsx(!labelIsVisible && "sr-only")} {...labelProps}>
        {label}
        {required && <span className="pl-1 text-red-400">*</span>}
      </label>
      {children}
      {controlState === "invalid" && (
        <p {...errorMessageProps} className="text-sm text-red-400 pt-0.5">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
