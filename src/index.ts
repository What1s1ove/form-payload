import { getElementsValues, getControlValue } from '~/helpers';
import { FormPayloadError } from '~/exceptions';
import { ControlType, CustomExceptionName, ErrorMessage } from '~/common/enums';
import { CustomRecord } from '~/common/types';

const getFormValues = <T = CustomRecord>(formNode: HTMLFormElement): T => {
  return <T>getElementsValues(Array.from(formNode.elements));
};

export {
  ControlType,
  CustomExceptionName,
  ErrorMessage,
  FormPayloadError,
  getControlValue,
  getFormValues,
};
