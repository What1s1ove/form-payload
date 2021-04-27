import { fireEvent, screen, waitFor } from '@testing-library/dom';
import { ControlType, ElementName, ErrorMessage } from '~/common/enums';
import { FormPayloadError, getControlValue } from '~/index';
import {
  createElement,
  createLabelElement,
  createOptionsElements,
} from './helpers';

describe('getFormValues should work correctly', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('should work correctly with texts inputs', () => {
    test.each`
      type                    | value
      ${ControlType.COLOR}    | ${'#999999'}
      ${ControlType.EMAIL}    | ${'test@mail.com'}
      ${ControlType.HIDDEN}   | ${'metrics'}
      ${ControlType.PASSWORD} | ${'top-secret'}
      ${ControlType.RADIO}    | ${'color-1'}
      ${ControlType.SEARCH}   | ${'apples'}
      ${ControlType.TEL}      | ${'10000000000'}
      ${ControlType.TEXT}     | ${'Name'}
      ${ControlType.URL}      | ${'form-payload.com'}
      ${ControlType.OUTPUT}   | ${'empty'}
    `('should get value from input type $type correctly', ({ type, value }) => {
      document.body.append(
        createElement(ElementName.INPUT, {
          name: type,
          type: type,
          value,
        }),
      );

      const control = <HTMLInputElement>screen.getByDisplayValue(value);
      const controlValue = getControlValue(control);

      expect(typeof controlValue).toBe('string');

      expect(controlValue).toBe(value);
    });
  });

  describe('should work correctly with file input', () => {
    const INPUT_FILE_LABEL = 'Upload';

    test('should get value from input type file correctly', async () => {
      const file = [new File(['test-file'], 'test-file')];

      document.body.append(
        createLabelElement(
          INPUT_FILE_LABEL,
          createElement(ElementName.INPUT, {
            type: ControlType.FILE,
          }),
        ),
      );

      const control = <HTMLInputElement>screen.getByLabelText(INPUT_FILE_LABEL);

      expect(getControlValue(control)).toBeNull();

      await waitFor(() =>
        fireEvent.change(control, {
          target: {
            files: file,
          },
        }),
      );

      expect(getControlValue(control)).toBeInstanceOf(File);
    });

    test('should get value from multiple input type file correctly', async () => {
      const files = [
        new File(['test-file-1'], 'test-file-1'),
        new File(['test-file-2'], 'test-file-2'),
      ];

      document.body.append(
        createLabelElement(
          INPUT_FILE_LABEL,
          createElement(ElementName.INPUT, {
            type: ControlType.FILE,
            multiple: true,
          }),
        ),
      );

      const control = <HTMLInputElement>screen.getByLabelText(INPUT_FILE_LABEL);

      expect(Array.isArray(getControlValue(control))).toBe(true);

      await waitFor(() =>
        fireEvent.change(control, {
          target: {
            files,
          },
        }),
      );

      const controlValue = <File[]>getControlValue(control);

      expect(controlValue.every((file) => file instanceof File)).toBe(true);

      expect(controlValue).toHaveLength(controlValue.length);
    });
  });

  describe('should work correctly with select', () => {
    const SELECT_LABEL = 'Colors';

    const Color = <const>{
      RED: 'red',
      BLUE: 'blue',
      YELLOW: 'yellow',
    };

    const options = Object.values(Color);

    test('should get value from select correctly', () => {
      const selectedValue = Color.RED;
      const selectOptions = createOptionsElements(options, selectedValue);

      document.body.append(
        createLabelElement(
          SELECT_LABEL,
          createElement(ElementName.SELECT, {}, ...selectOptions),
        ),
      );

      const controlValue = getControlValue(
        <HTMLSelectElement>screen.getByLabelText(SELECT_LABEL),
      );

      expect(typeof controlValue).toBe('string');

      expect(controlValue).toEqual(selectedValue);
    });

    test('should get values from multi-select correctly', () => {
      const selectedValues = [Color.RED, Color.BLUE];
      const selectOptions = createOptionsElements(options, ...selectedValues);

      document.body.append(
        createLabelElement(
          SELECT_LABEL,
          createElement(
            ElementName.SELECT,
            {
              multiple: true,
            },
            ...selectOptions,
          ),
        ),
      );

      const controlValue = getControlValue(
        <HTMLSelectElement>screen.getByLabelText(SELECT_LABEL),
      );

      expect(Array.isArray(controlValue)).toBe(true);

      expect(controlValue).toHaveLength(selectedValues.length);

      expect(controlValue).toEqual(selectedValues);
    });
  });

  describe('should work correctly with an unexpected control type', () => {
    const UNKNOWN_CONTROL_LABEL = 'Unknown';

    test.each`
      type
      ${ControlType.BUTTON}
      ${ControlType.IMAGE}
      ${ControlType.RESET}
      ${ControlType.SUBMIT}
    `(
      'should throw FormPayloadError exception for banned $type input type',
      ({ type }) => {
        document.body.append(
          createLabelElement(
            UNKNOWN_CONTROL_LABEL,
            createElement(ElementName.INPUT, {
              type,
            }),
          ),
        );

        const control = <HTMLInputElement>(
          screen.getByLabelText(UNKNOWN_CONTROL_LABEL)
        );

        expect(() => getControlValue(control)).toThrowError(FormPayloadError);

        expect(() => getControlValue(control)).toThrowError(
          `${ErrorMessage.BANNED_TYPE}${type}`,
        );
      },
    );

    test('should throw FormPayloadError with unknown input type', () => {
      const control = <HTMLInputElement>{
        type: 'unknown-type',
      };

      expect(() => getControlValue(control)).toThrowError(FormPayloadError);

      expect(() => getControlValue(control)).toThrowError(
        ErrorMessage.UNKNOWN_CONTROL_TYPE,
      );
    });
  });
});
