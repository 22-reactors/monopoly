import style from './avatar.module.scss';
import classNames from 'classnames';
import { ChangeEvent, FormEvent, useState } from 'react';
import noAva from '../../assets/no-ava.png';
import { Button, ButtonVariation } from '../button/button';

export interface IAvatar {
  className?: string;
  src?: string;
  onSubmit?(): void;
}

export function Avatar(props: IAvatar): JSX.Element {
  const [isEdit, setIsEdit] = useState(false);
  const [avatar, setAvatar] = useState('');

  const onChangeAvatar = (evt: ChangeEvent) => {
    const files = (evt.target as HTMLInputElement).files;

    if (files?.length && files[0]) {
      const image = URL.createObjectURL(files[0]);

      setAvatar(image);
      setIsEdit(true);
    }
  };

  const onSubmitForm = (evt: FormEvent) => {
    evt.preventDefault();
    props.onSubmit?.();

    setIsEdit(false);
    console.log('Save avatar');
  };

  return (
    <section className={classNames(props.className, style.wrapper)}>
      <form action="#" className={style.form} onSubmit={onSubmitForm}>
        <img
          className={style.preview}
          src={props.src || avatar || noAva}
          alt="Аватар игрока"
        />
        <fieldset className={style.field}>
          <input
            id={'avatar'}
            type="file"
            className={style.input}
            onChange={onChangeAvatar}
          />
          <label htmlFor="avatar" className={style.label}>
            Изменить
          </label>
          <Button
            type={'submit'}
            isHide={!isEdit}
            variation={ButtonVariation.VRUTUKS}
            text={'Сохранить'}
          />
        </fieldset>
      </form>
    </section>
  );
}
