import { useEffect, useRef, useState } from 'react'
import { Button, ButtonVariation } from '../../components/button/button';
import { GameEngine } from '../../game-engine/gameEngine';
import { unAuthorizedRedirect } from '../../utils/helpers'
import style from './game.module.scss'
import { Link } from 'react-router-dom'
import { links } from '../../utils/const'
import classNames from 'classnames'

export const gameLoader = unAuthorizedRedirect

export const Game = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const [isShowMenu, setIsShowMenu] = useState(false);

  useEffect(() => { initCanvas() }, []);

  async function initCanvas() {
    if (canvasEl.current) {
      await GameEngine.init(canvasEl.current);
    }
  }

  const reloadPage = () => {
    window.location.reload();
  }

  return (
    <div className={style.gamePageWrapClass}>
      <div className={style.menuWrapper}>
        <Button
          className={style.btn}
          variation={ButtonVariation.PRIMARY}
          onClick={reloadPage}>
          Начать сначала
        </Button>
        <Button
          className={style.btn}
          variation={ButtonVariation.PRIMARY}
          onClick={() => {
            setIsShowMenu((prevState) => !prevState);
          }}>
          {isShowMenu ? 'Закрыть меню' : 'Меню'}
        </Button>
        <Menu className={isShowMenu ? style.menu_show : style.menu_hide}/>
      </div>
      <canvas
        ref={canvasEl}
        width={1000}
        height={1000}
        className={style.canvasClass}
      />
    </div>
  );
};

const MENU_ITEM = [
  {
    title: links.profile.title,
    to: links.profile.path
  },
  {
    title: links.leaderboard.title,
    to: links.leaderboard.path
  },
  {
    title: links.forum.title,
    to: links.forum.path
  },
];

function Menu(props: { className: string }) {
  return (
    <ul className={classNames(style.menu, props.className)}>
      {MENU_ITEM.map((item, idx) => (
        <li className={style.menuItem} key={idx}>
          <Link to={item.to}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
}
