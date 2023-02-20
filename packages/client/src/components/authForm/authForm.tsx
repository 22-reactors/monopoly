import style from './authForm.module.scss';

export const AuthForm = () => {
  return (
    <form className={style.form} onSubmit={props.formAction}>
      {childrenWithProps}
      <button className={btnClass}>{props.submitBtnName}</button>
    </form>
  );
};
