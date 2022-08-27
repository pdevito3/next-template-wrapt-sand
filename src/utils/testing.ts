function formatTestSelectorString(string: string) {
  return string
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

export function getTestSelector(field?: string, prefix: string = "") {
  return field
    ? formatTestSelectorString(`${prefix ? `${prefix}-` : ""}${field}`)
    : "";
}
