import { ElementName } from '~/common/enums';
import { ChildElement } from '~/common/types';
import { createElement } from '../create-element/create-element.helper';

const createLabelElement = (...children: ChildElement[]): HTMLElement => {
  return createElement(ElementName.LABEL, {}, ...children);
};

export { createLabelElement };
