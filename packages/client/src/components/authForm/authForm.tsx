import React, { ChangeEvent, useEffect, useState } from 'react';
import style from './authForm.module.scss';
import classNames from 'classnames';
import { Button, ButtonVariation } from '../button/button';
import { Link } from 'react-router-dom';
import { getInputName } from '../../utils/helpers';
import validate from '../../service/validate/validate';

export interface IAuthFormProps {
  submitBtnName: string;
  children: JSX.Element | JSX.Element[];
  title: string;
  isDarkTheme?: boolean;
  linkTitle?: string;
  linkName?: string;
  linkPath?: string;
  errorTitle?: string;
  validation?: boolean;
  linkAction: React.MouseEventHandler<HTMLAnchorElement>;
  formAction: React.FormEventHandler<HTMLFormElement>;
  formFocus?: React.FormEventHandler<HTMLFormElement>;
}

type InputsState = Record<string, { value: string; errorText?: string }>;

export const AuthForm = (props: IAuthFormProps) => {
  const {
    isDarkTheme,
    submitBtnName,
    title,
    formAction,
    formFocus,
    children,
    linkPath,
    linkTitle,
    linkName,
    errorTitle,
    validation
  } = props;
  const [inputValues, setInputValues] = useState({} as InputsState);
  const [error, setError] = useState<boolean>(false);
  const { password, confirmPassword } = inputValues;

  useEffect(() => {
    let isValid = true;
    Object.entries(inputValues).forEach(([key]) => {
      if (inputValues[key].errorText) {
        isValid = false;
      }
    });
    if (isValid) {
      setError(false);
    } else {
      setError(true);
    }
  }, [inputValues]);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    let errorText: string | undefined;
    if (validation && !validate.isValidField(event.target)) {
      errorText = validate.getErrorMessage(name);
    }
    setInputValues(prevState => {
      return { ...prevState, [name]: { value, errorText } };
    });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;
    const inputs = Object.values(event.target).filter(
      element => element instanceof HTMLInputElement
    ) as HTMLInputElement[];
    const newInputsState: InputsState = {};
    inputs.forEach(input => {
      newInputsState[input.name] = { value: input.value, errorText: undefined };
      let errorText: string | undefined;
      if (validation && !validate.isValidField(input)) {
        errorText = validate.getErrorMessage(input.name);
        if (errorText) {
          newInputsState[input.name].errorText = errorText;
          isValid = false;
        }
      }
    });
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      newInputsState.confirmPassword.errorText = 'Пароли не совпадают';
      isValid = false;
    }
    setInputValues(newInputsState);
    if (isValid) {
      formAction(event);
    }
  };

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      const name = getInputName(child);
      const value = name ? inputValues[name]?.value : '';
      const errorText = name && inputValues[name]?.errorText;
      return React.cloneElement(child as React.ReactElement, {
        className: style.input,
        isDarkTheme,
        onChange: inputChangeHandler,
        value: value ? value : '',
        errorText,
      });
    }
    return child;
  });

  const errorText = errorTitle
    ? errorTitle
    : error
    ? 'Ошибка. Проверьте правильность заполнения полей.'
    : undefined;

  return (
    <div className={classNames(style.container, isDarkTheme && style.dark)}>
      <h2 className={classNames(style.title, isDarkTheme && style.dark)}>
        {title}
      </h2>
      {errorText && <p className={style.error}>{errorText}</p>}
      <form className={style.form} onSubmit={submitHandler} onFocus={formFocus}>
        {childrenWithProps}
        <Button
          type="submit"
          variation={ButtonVariation.PRIMARY}
          disabled={errorText ? true : false}
          className={style.button}>
          {submitBtnName}
        </Button>
      </form>
      {linkPath && (
        <>
          <p className={style.linkTitle}>{linkTitle}</p>
          <Link
            to={linkPath}
            className={classNames(style.link, isDarkTheme && style.dark)}>
            {linkName}
          </Link>
        </>
      )}
    </div>
  );
};
