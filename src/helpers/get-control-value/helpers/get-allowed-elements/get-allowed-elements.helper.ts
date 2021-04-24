import { BANNED_CONTROL_TYPES } from '~/common/constants';

const checkControlFnMap = {
  checkHasControlName(element: HTMLInputElement) {
    return Boolean(element.name);
  },
  checkIsAllowedControl(element: HTMLInputElement): boolean {
    const isBannedType = BANNED_CONTROL_TYPES.some((type) => {
      return type === element.type;
    });

    return !isBannedType;
  },
} as const;

const getAllowedElements = (elements: Element[]): Element[] => {
  return elements.filter((element) => {
    return Object.values(checkControlFnMap).every((checkFunction) => {
      return checkFunction(<HTMLInputElement>element);
    });
  });
};

export { getAllowedElements };
