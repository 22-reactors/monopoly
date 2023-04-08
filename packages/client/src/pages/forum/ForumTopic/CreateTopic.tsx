//Создание новой темы на форуме

import { useState, FC, ChangeEvent, useEffect } from 'react';
import style from '../forum.module.scss';
import { type ForumSectionProps } from '../ForumSection/typings';
import {
  Button,
  ButtonVariation,
  ButtonSizes,
} from '../../../components/button/button';
import { links } from '../../../utils/const';
import Textarea from '../../../components/textarea/textarea';
import { useNavigate, useParams } from 'react-router-dom';
import ForumController from '../../../controllers/forum';
import { useAppSelector } from '../../../reduxstore/hooks';
import { userSelector } from '../../../reduxstore/user/user.selector';

interface IInputProps {
  value: string;
  errorText?: string;
}

const defaultInputProps = {
  value: '',
  errorText: '',
};

export const CreateTopic: FC<ForumSectionProps> = () => {
  const [topic, setTopic] = useState<IInputProps>(defaultInputProps);
  const [message, setMessage] = useState<IInputProps>(defaultInputProps);
  const user = useAppSelector(userSelector);
  const { sectionId } = useParams();
  const navigate = useNavigate();

  const changeTopicName = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTopic({ value: event.target.value });
  };

  const changeTopicMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage({ value: event.target.value });
  };

  const createTopic = () => {
    if (!topic.value) {
      setTopic(prevState => ({
        ...prevState,
        errorText: 'Название темы не должно быть пустым',
      }));
    } else {
      ForumController.addTopic({
        userLogin: user?.login ?? 'unknown',
        title: topic.value,
        description: message.value,
        sectionId: Number(sectionId),
      });
      navigate(-1);
    }
  };

  return (
    <>
      <section className={style.pageContainer}>
        {/* <h1 className={style.title}>Форум</h1> */}
        <div className={style.topic__container}>
          <div className={style.newmessage}>
            <form>
              <Textarea
                value={topic?.value ?? ''}
                onChange={changeTopicName}
                label="Введите название темы"
                errorText={topic.errorText}
              />
            </form>
          </div>
          <div className={style.newmessage}>
            <form>
              <Textarea
                value={message?.value ?? ''}
                onChange={changeTopicMessage}
                label="Введите описание"
                errorText={message.errorText}
              />
            </form>
          </div>
          <div>
            <Button
              variation={ButtonVariation.PRIMARY}
              size={ButtonSizes.MEDIUM}
              type="submit"
              onClick={createTopic}
              rounded>
              {links.createTopic.title}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};
