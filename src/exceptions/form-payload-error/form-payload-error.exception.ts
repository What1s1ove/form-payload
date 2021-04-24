import { CustomExceptionName } from '~/common/enums';

type Constructor = {
  message: string;
};

class FormPayloadError extends Error {
  constructor({ message }: Constructor) {
    super(message);
    this.message = message;
    this.name = CustomExceptionName.FORM_PAYLOAD_ERROR;
  }
}

export { FormPayloadError };
