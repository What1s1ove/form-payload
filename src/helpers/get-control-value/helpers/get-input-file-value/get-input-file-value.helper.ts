const DEFAULT_FILE_IDX = 0;

const getInputFileValue = (
  inputNode: HTMLInputElement,
): File[] | File | null => {
  return inputNode.multiple
    ? Array.from(inputNode.files ?? [])
    : inputNode.files?.[DEFAULT_FILE_IDX] ?? null;
};

export { getInputFileValue };
