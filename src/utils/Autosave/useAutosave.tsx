import { useMachine } from "@xstate/react";
import { useEffect } from "react";
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

  const [state, send] = useMachine(configuredAutosaveMachine);

  // const autosaveService = interpret(configuredAutosaveMachine)
  //   // .onTransition((state) => console.log(state.value))
  //   .start();

  useEffect(() => {
    if (isDirty)
      send({
        type: "CHECK_FOR_CHANGES",
        query: isDirty,
      });
  }, [isDirty]);

  useEffect(() => {
    let timeout = setTimeout(() => {});

    if (isValid)
      timeout = setTimeout(() => {
        send({
          type: "CHECK_IF_FORM_IS_VALID",
          query: isValid,
        });
      }, debounceDelayMs);

    return () => clearTimeout(timeout);
  }, [isValid, formFields]);
}
