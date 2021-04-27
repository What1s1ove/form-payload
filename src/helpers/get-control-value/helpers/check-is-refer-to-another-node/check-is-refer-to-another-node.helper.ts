import { ControlElement } from '~/common/types';

const checkIsReferToAnotherNode = (
  currentNode: ControlElement,
  ...checkNodes: ControlElement[]
): boolean => {
  return checkNodes.some((checkNode) => {
    return Boolean(
      (<HTMLFieldSetElement>checkNode).elements?.namedItem(currentNode.name),
    );
  });
};

export { checkIsReferToAnotherNode };
