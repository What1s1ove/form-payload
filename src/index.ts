import { getElementsValues, getControlValue } from '~/helpers';
import { FormPayloadError } from '~/exceptions';
import { ControlType, CustomExceptionName, ErrorMessage } from '~/common/enums';
import {
  CustomObject,
  ControlElement,
  ControlCollection,
} from '~/common/types';

const getFormValues = <T = CustomObject>(
  nodeWithElements: HTMLFormElement | HTMLFieldSetElement,
): T => {
  return <T>getElementsValues(nodeWithElements.elements);
};

export {
  ControlType,
  CustomExceptionName,
  ErrorMessage,
  FormPayloadError,
  getControlValue,
  getFormValues,
};

export type { ControlElement, ControlCollection };
