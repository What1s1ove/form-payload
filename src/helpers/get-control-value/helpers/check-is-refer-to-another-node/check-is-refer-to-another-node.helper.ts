const checkIsReferToAnotherNode = (
  currentNode: HTMLInputElement,
  ...checkNodes: Element[]
): boolean => {
  return checkNodes.some((checkNode) => {
    return Boolean(
      (<HTMLFieldSetElement>checkNode).elements?.namedItem(
        (<HTMLInputElement>currentNode).name,
      ),
    );
  });
};

export { checkIsReferToAnotherNode };
