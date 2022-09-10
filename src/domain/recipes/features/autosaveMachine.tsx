import { actions, createMachine, send } from "xstate";

export const autosaveMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QEECuAXA9rAhgNzADpUA7AaxMwHcSBiAYQAkBRegaQH0AxAeQCUOTZADkA4swDKiUAAdsAS3TzMJaSAAeiAIwBmAOx7CABgCsADnNa9+s1oAsdgDQgAnoju7CANjtm7AJjMvHVNgrz0AXwjnNCxcAkIANRwAG3kIAAIuTAAnAFtaCWRE5jU5WEVlVSQNRB0TO0IDHS8TI38ATjb-LSM9ZzcEOyMjbx1Ajv8dHUm-fzsomIxsfCJktMzs-NoAEWYAIR4AVWF6Zg4ikrKFJRU1TQQdX0IzJ70urT9JrS0BxHMTC89CYOqCTFpgvZFiBYisEgBJEh4VLpLK5ArXCq3aqgB4-Ow6QhdHQ-IL+EwmHSvP5Dd5EqbvLx+Lz+axmaGw+JETn4eQkKC0CAqIh8vCYMjc5ZczGVO41B4GQENCGQvSBIx+GkeLRE+rgvReLT+Ux2YEcqWrQg8vB8gVgHI5XKEGQpHDoABm6KtFoIMux90QisIyq8qvVmtcdXBhB+Wg+5nqVI6C2iMJ9kriqyyOHkKUgtD4zAAKnwAJp+qoBhBmIwdGMNLojDpMrpOSMIck6g0hTrgjx9SKp60ZuFgDKwVAAY0ncFg7tQKVoFbluO09kJxNJLIpVJ0Wp+uopVkNxoaZqH6cIO3kOXQLjR2yYrE48K43H4AFkOPCJBxEsgABl4R2ZccVqBBdAMYwAVsaw9FsBwaTMOsOjMMxWUmJ4eg6dpzUzBJ6DzHASAfDEanKWUwLxQIdR8CwVRBIwvCMPd2y8DpDHmZMplQuwTDgqJU0oCA4DUYdiHISgaFAqsjXMF5-E6DVbHCT4vC1diY0UqlOiCPQRnZC98LWFFNnRGT5XcfwaXBFCqXeWxk2Ygw8NHQhEWRDZSIs1cEFQrxvA44Y-CY5jPhpT5DA+Gt4K0SkCQ6HRXK5b18NtHzwNNMxCGGFkqVaDpPhadT23qRpk2ZMw9CNH4fGSy1h2zXNIAyvFdDrCEQjQlpG0UmlplGNTJkmAIwS0eqEkaidp1necUlaxBkMBNVGQpGssN+dtwVon5UL0XwjF8PwJqIa9b3vLY8gWiDgn8YNUOTew2hBCkNJ1LoDXY+Daw4rwTsIQiwGI7zyJuStLIg8EAsCfj6l2z55iQlimmNUwenY41dBO67wvbKwiVBB6oYhZM+kEiIgA */
  createMachine(
    {
      predictableActionArguments: true,
      id: "Autosave",
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
          entry: "saveAfterDelay",
          exit: "cancelDelay",
          on: {
            SAVE: {
              target: "Autosaving",
            },
            DEBOUNCE_SAVE: {
              actions: "cancelSave",
              target: "unknown",
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
            src: "autosave",
            id: "Autosave",
            onDone: [
              {
                target: "Autosave successful",
              },
            ],
            onError: [
              {
                target: "Autosave Failed",
              },
            ],
          },
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
      actions: {
        cancelDelay: actions.cancel("saveDelay"),
        saveAfterDelay: send({ type: "SAVE" }, { delay: 0, id: "saveDelay" }),
      },
    }
  );
