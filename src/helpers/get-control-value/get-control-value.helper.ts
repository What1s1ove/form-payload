import { ControlType, ErrorMessage } from '~/common/enums';
import {
  CustomObject,
  ControlElement,
  ControlCollection,
} from '~/common/types';
import { FormPayloadError } from '~/exceptions';
import {
  checkIsReferToAnotherNode,
  getAllowedElements,
  getMultiSelectValues,
  getInputFileValue,
} from './helpers';

const getElementsValues = (
  controlElements: ControlCollection,
): CustomObject => {
  const allowedElements = getAllowedElements(
    <ControlElement[]>Array.from(controlElements),
  );
  return allowedElements.reduce<CustomObject>((acc, element) => {
    const isReferToAnotherNode = checkIsReferToAnotherNode(
      element,
      ...allowedElements,
    );

    if (isReferToAnotherNode) {
      return acc;
    }

    return {
      ...acc,
      [element.name]: getControlValue(element),
    };
  }, {});
};

const getControlValue = (controlNode: ControlElement): unknown | never => {
  switch (controlNode.type) {
    case ControlType.BUTTON:
    case ControlType.IMAGE:
    case ControlType.RESET:
    case ControlType.SUBMIT: {
      throw new FormPayloadError({
        message: `${ErrorMessage.BANNED_TYPE}${controlNode.type}`,
      });
    }
    case ControlType.COLOR:
    case ControlType.EMAIL:
    case ControlType.HIDDEN:
    case ControlType.PASSWORD:
    case ControlType.RADIO:
    case ControlType.SEARCH:
    case ControlType.TEL:
    case ControlType.TEXT:
    case ControlType.URL:
    case ControlType.OUTPUT:
    case ControlType.TEXTAREA:
    case ControlType.SELECT_ONE: {
      return (<HTMLInputElement | HTMLSelectElement>controlNode).value;
    }
    case ControlType.DATE:
    case ControlType.DATETIME_LOCAL:
    case ControlType.MONTH:
    case ControlType.TIME:
    case ControlType.WEEK: {
      return (<HTMLInputElement>controlNode).valueAsDate;
    }
    case ControlType.NUMBER:
    case ControlType.RANGE: {
      return (<HTMLInputElement>controlNode).valueAsNumber;
    }
    case ControlType.CHECKBOX: {
      return (<HTMLInputElement>controlNode).checked;
    }
    case ControlType.SELECT_MULTIPLE: {
      return getMultiSelectValues(<HTMLSelectElement>controlNode);
    }
    case ControlType.FILE: {
      return getInputFileValue(<HTMLInputElement>controlNode);
    }
    case ControlType.FIELDSET: {
      return getElementsValues((<HTMLFieldSetElement>controlNode).elements);
    }
  }

  throw new FormPayloadError({
    message: ErrorMessage.UNKNOWN_CONTROL_TYPE,
  });
};

export { getElementsValues, getControlValue };
