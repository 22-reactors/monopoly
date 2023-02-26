import { useEffect, useRef } from 'react';
import { Button, ButtonVariation } from '../../components/button/button';
import { GameEngine } from '../../game-engine/gameEngine';
import { unAuthorizedRedirect } from '../../utils/helpers'
import style from './game.module.scss'

export const gameLoader = unAuthorizedRedirect

export const Game = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);

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
      <Button
        className={style.reloadPageBtnClass}
        variation={ButtonVariation.PRIMARY}
        onClick={reloadPage}>
        Начать сначало
      </Button>
      <canvas
        ref={canvasEl}
        width={1000}
        height={1000}
        className={style.canvasClass}
      />
    </div>
  );
};
