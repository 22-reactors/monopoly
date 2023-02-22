import classNames from 'classnames';
import { ChangeEvent, useRef, useState } from 'react';
import { Button, ButtonSizes, ButtonVariation } from '../button/button';
import UserController from '../../controllers/user';
import style from './avatar.module.scss';
import { resourceURL } from '../../utils/const';

function Avatar() {
  const [avatarSrc, setAvatarSrc] = useState('');

  const onChangeAvatarFileHandler = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) {
      return;
    }
    const formData = new FormData();

    const avatarFile = event.target.files[0];
    if (avatarFile) {
      formData.append('avatar', avatarFile, avatarFile.name);
      const response = await UserController.changeAvatar(formData);
      if (response) {
        const url = `${resourceURL}${response.avatar}`;
        setAvatarSrc(url);
      }
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
      <div className={style.avatar}>
        <img src={avatarSrc} alt="аватар" />
      </div>
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
