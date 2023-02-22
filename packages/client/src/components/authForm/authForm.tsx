import React, { ChangeEvent } from 'react';
import style from './authForm.module.scss';
import classNames from 'classnames';
import { Button, ButtonVariation } from '../button/button';
import { Link } from 'react-router-dom';

export interface IAuthFormProps {
  submitBtnName: string;
  children: JSX.Element | JSX.Element[];
  title: string;
  isDarkTheme?: boolean;
  linkTitle?: string;
  linkName?: string;
  linkPath?: string;
  linkAction: React.MouseEventHandler<HTMLAnchorElement>;
  formAction: React.FormEventHandler<HTMLFormElement>;
}

export const AuthForm = (props: IAuthFormProps) => {
  const {
    isDarkTheme,
    submitBtnName,
    title,
    formAction,
    children,
    linkPath,
    linkName,
  } = props;

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value;
  };

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement, {
        isDarkTheme,
        onChange: inputChangeHandler,
      });
    }
    return child;
  });

  return (
    <div className={classNames(isDarkTheme && style.dark)}>
      <h2 className={style.title}>{title}</h2>
      <form className={style.form} onSubmit={formAction}>
        {childrenWithProps}
        <Button
          type="submit"
          variation={ButtonVariation.PRIMARY}
          className={style.button}>
          {submitBtnName}
        </Button>
      </form>
      {linkPath && (
        <>
          <span className={style.linkTitle}></span>
          <Link to={linkPath} className={style.link}>
            {linkName}
          </Link>
        </>
      )}
    </div>
  );
};
