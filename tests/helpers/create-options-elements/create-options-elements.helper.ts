import { ElementName } from '~/common/enums';
import { createElement } from '../create-element/create-element.helper';

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

export { createOptionsElements };
