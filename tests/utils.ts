import { ElementName } from '~/common/enums';
import { ChildElement } from '~/common/types';
import { createElement } from '~/helpers';

const createFormElement = (...children: HTMLElement[]): HTMLElement => {
  return createElement(
    ElementName.FORM,
    {
      name: '',
    },
    ...children,
  );
};

const createLabelElement = (...children: ChildElement[]): HTMLElement => {
  return createElement(ElementName.LABEL, {}, ...children);
};

const createOptionsElements = (
  options: string[],
  ...selectedOptions: string[]
): HTMLOptionElement[] => {
  return <HTMLOptionElement[]>options.map((opt) => {
    const isSelected = selectedOptions.includes(opt);

    return createElement(
      ElementName.OPTION,
      {
        value: opt,
        selected: isSelected,
      },
      opt,
    );
  });
};

const getInputFiles = (...files: File[]): File[] => files;

export {
  createLabelElement,
  createOptionsElements,
  createFormElement,
  getInputFiles,
};
