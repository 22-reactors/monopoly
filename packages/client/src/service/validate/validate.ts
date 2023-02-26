enum ErrorMessages {
  LOGIN = `Логин должен содержать от 3 до 20 символов,
  латиницей, может содержать цифры, но не состоять из них, 
  без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)`,
  PASSWORD = `Некорректный пароль. Пароль должен содержать от 8 до 40 символов, 
  обязательно хотя бы одна заглавная буква и цифра.`,
  EMAIL = 'Некорректный email. Допускаются латиница, спецсимволы и цифры.',
  FIRST_NAME = `Некорректное имя. Первая буква должна быть заглавной, 
  без пробелов, цифр и спецсимволов (допустим только дефис).`,
  SECOND_NAME = `Некорректная фамилия. Первая буква должна быть заглавной, 
  без пробелов, цифр и спецсимволов (допустим только дефис).`,
  PHONE = `Некорректный формат номера. Телефон должен содержать от 10 до 15 символов, 
  состоять из цифр, может начинается с плюса.`,
  MESSAGE = 'Сообщение не должно быть пустым',
  DISPLAY_NAME = 'Поле не должно быть пустым',
}

enum InputId {
  LOGIN = 'login',
  OLD_PASSWORD = 'oldPassword',
  NEW_PASSWORD = 'newPassword',
  NEW_PASSWORD_AGAIN = 'newPassword_again',
  PASSWORD = 'password',
  EMAIL = 'email',
  FIRST_NAME = 'first_name',
  SECOND_NAME = 'second_name',
  PHONE = 'phone',
  MESSAGE = 'message',
  DISPLAY_NAME = 'display_name',
}

class Validate {
  name (value: string): boolean {
    return this.isValid(
      /^([А-ЯA-Z]{1}[-а-яa-z]{1,20})$/,
      value
    );
  }

  login (value: string): boolean {
    return this.isValid(
      [/[0-9a-z-_]{3,20}/i, /[a-z-_]/i],
      value
    );
  }

  email (value: string): boolean {
    return this.isValid(
      /[0-9a-z-_.]+@[a-z0-9-]+.[a-z]{2,3}/i,
      value
    );
  }

  password (value: string): boolean {
    return this.isValid(
      [/[0-9a-z-_]{8,40}/i, /[A-Z]+/, /\d+/],
      value
    );
  }

  phone (value: string): boolean {
    return this.isValid(
      /^\+?(\d{10,15})$/,
      value
    );
  }

  message (value: string): boolean {
    return value !== '';
  }

  isValidField(target: HTMLInputElement): boolean {
    const { name, value } = target;

    switch (name) {
      case InputId.LOGIN:
        return this.login(value);
      case InputId.OLD_PASSWORD:
      case InputId.NEW_PASSWORD:
      case InputId.NEW_PASSWORD_AGAIN:
      case InputId.PASSWORD:
        return this.password(value);
      case InputId.EMAIL:
        return this.email(value);
      case InputId.FIRST_NAME:
      case InputId.SECOND_NAME:
        return this.name(value);
      case InputId.PHONE:
        return this.phone(value);
      case InputId.MESSAGE:
      case InputId.DISPLAY_NAME:
        return this.message(value);
      default:
        return false;
    }
  }

  getErrorMessage(name: string) {
    switch (name) {
      case InputId.EMAIL:
       return ErrorMessages.EMAIL;
      case InputId.LOGIN:
        return ErrorMessages.LOGIN;
      case InputId.FIRST_NAME:
        return ErrorMessages.FIRST_NAME;
      case InputId.SECOND_NAME:
        return ErrorMessages.SECOND_NAME;
      case InputId.PHONE:
        return ErrorMessages.PHONE;
      case InputId.PASSWORD:
        return ErrorMessages.PASSWORD;
      default:
        break;
    }
  }

  private isValid (regex: RegExp | RegExp[], value: string): boolean {
    if (Array.isArray(regex)) {
      return regex.every((rule) => rule.test(value));
    }

    return regex.test(value);
  }
}

const validate = new Validate();
export default validate;
