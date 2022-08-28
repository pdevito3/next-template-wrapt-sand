import {
  Autocomplete as MantineAutocomplete,
  AutocompleteProps as MantineAutocompleteProps,
  createStyles,
} from "@mantine/core";

interface AutocompleteProps extends MantineAutocompleteProps {
  testSelector?: string;
}

function Autocomplete({
  // testSelector = getTestSelector(labelProps.),
  ...rest
}: AutocompleteProps) {
  const useStyles = createStyles({
    input: {},
    dropdown: {},
  });
  const { classes, cx } = useStyles();

  return (
    <MantineAutocomplete
      {...rest}
      classNames={{
        input: cx(
          classes.input,
          "block w-full p-2 text-sm rounded-md outline-none text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border-gray-300 focus:border-violet-500 focus:ring-violet-500 dark:focus:border-violet-500 dark:focus:ring-violet-500 dark:border-gray-600 border"
        ),
        dropdown: cx(classes.dropdown, "bg-blue-500"),
      }}
    />
  );
}

export default Autocomplete;
