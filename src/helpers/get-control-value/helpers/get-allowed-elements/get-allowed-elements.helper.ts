import { BANNED_CONTROL_TYPES } from '~/common/constants';
import { ControlElement } from '~/common/types';

const checkControlFnMap = <const>{
  checkHasControlName(element: ControlElement) {
    return Boolean(element.name);
  },
  checkIsAllowedControl(element: ControlElement): boolean {
    const isBannedType = BANNED_CONTROL_TYPES.some((type) => {
      return type === element.type;
    });

    return !isBannedType;
  },
};

const getAllowedElements = (elements: ControlElement[]): ControlElement[] => {
  return elements.filter((element) => {
    return Object.values(checkControlFnMap).every((checkFunction) => {
      return checkFunction(element);
    });
  });
};

export { getAllowedElements };
