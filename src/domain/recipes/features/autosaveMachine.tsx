import { createMachine } from "xstate";

function autosave() {
  // alert("autosaving!");
  throw "bad error";
}

export const autosaveMachine = createMachine(
  {
    predictableActionArguments: true,
    id: "Machine Name",
    initial: "unknown",
    states: {
      unknown: {
        on: {
          CHECK_FOR_CHANGES: [
            {
              cond: (context, event) => event.query === "isDirty",
              target: "Dirty Form",
            },
            {
              target: "Clean Form",
            },
          ],
        },
      },
      "Valid Form": {
        after: {
          "1500": {
            target: "Autosaving",
          },
        },
      },
      "Invalid Form": {
        always: {
          target: "unknown",
        },
      },
      Autosaving: {
        invoke: {
          id: "Autosave",
          src: "autosave",
          onError: {
            target: "Autosave Failed",
            // actions: 'assignErrorToContext',
          },
          onDone: {
            target: "Autosave successful",
          },
        },
        // on: {
        //   REJECT: {
        //     target: "Autosave Failed",
        //   },
        //   RESOLVE: {
        //     target: "Autosave successful",
        //   },
        // },
      },
      "Autosave Failed": {
        on: {
          RETRY: {
            target: "Autosaving",
          },
        },
      },
      "Autosave successful": {
        always: {
          target: "unknown",
        },
      },
      "Dirty Form": {
        on: {
          CHECK_IF_FORM_IS_VALID: [
            {
              cond: (context, event) => event.query === "Valid",
              target: "Valid Form",
            },
            {
              target: "Invalid Form",
            },
          ],
        },
      },
      "Clean Form": {
        always: {
          target: "unknown",
        },
      },
    },
  },
  {
    services: {
      autosave: () => alert("autosaving!"),
    },
  }
);
