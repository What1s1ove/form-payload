import { ElementName } from '~/common/enums';
import { ChildElement } from '~/common/types';
import { createElement } from '../create-element/create-element.helper';

const createFormElement = (...children: ChildElement[]): HTMLElement => {
  return createElement(
    ElementName.FORM,
    {
      name: '',
    },
    ...children,
  );
};

export { createFormElement };
