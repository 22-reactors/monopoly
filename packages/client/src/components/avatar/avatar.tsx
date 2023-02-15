import classNames from 'classnames';
import { ChangeEvent, FormEvent, useRef } from 'react';
import { Button, ButtonSizes, ButtonVariation } from '../button/button';
import style from './avatar.module.scss';

function Avatar() {
  const avatarSize = {
    width: '100px',
    height: '100px',
  };

  const avatarContainerStyle = {
    ...avatarSize,
  };

  const onChangeAvatarFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const avatarFile = event.target.files[0];
    if (avatarFile) {
      // Запрос к API
    }
  };

  const fileInput = useRef<HTMLInputElement>(null);

  const openBrowserAvatarFile = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  return (
    <section className={style.container}>
      <div style={avatarContainerStyle} className={style.avatar}></div>
      <input
        className={style.avatarInput}
        onChange={onChangeAvatarFileHandler}
        type="file"
        ref={fileInput}
      />
      <Button
        variation={ButtonVariation.PRIMARY}
        size={ButtonSizes.SMALL}
        rounded
        onClick={openBrowserAvatarFile}
        className={style.button}>
        Обновить аватар
      </Button>
    </section>
  );
}

export default Avatar;
