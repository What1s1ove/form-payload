const getMultiSelectValues = (selectNode: HTMLSelectElement): string[] => {
  return Array.from(selectNode.selectedOptions, (opt) => opt.value);
};

export { getMultiSelectValues };
