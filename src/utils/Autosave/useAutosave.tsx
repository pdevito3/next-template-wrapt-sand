import { useEffect } from "react";
import { interpret } from "xstate";
import { autosaveMachine } from "./AutosaveMachine";

interface AutosaveProps {
  handleSubmission: any;
  isDirty: boolean;
  isValid?: boolean;
  formFields: any;
  debounceDelayMs?: number;
}

// TODO add proper typescript
// TODO build debounce into the machine
export default function useAutosave({
  handleSubmission,
  isDirty,
  isValid = true,
  formFields,
  debounceDelayMs = 1500,
}: AutosaveProps) {
  const configuredAutosaveMachine = autosaveMachine.withConfig({
    services: {
      autosave: () => handleSubmission,
    },
  });

  const autosaveService = interpret(configuredAutosaveMachine)
    // .onTransition((state) => console.log(state.value))
    .start();

  useEffect(() => {
    let timeout = setTimeout(() => {});

    if (isDirty)
      autosaveService.send({
        type: "CHECK_FOR_CHANGES",
        query: isDirty,
      });

    if (isValid)
      timeout = setTimeout(() => {
        autosaveService.send({
          type: "CHECK_IF_FORM_IS_VALID",
          query: isValid,
        });
      }, debounceDelayMs);

    return () => clearTimeout(timeout);
  }, [isDirty, isValid, formFields]);
}
