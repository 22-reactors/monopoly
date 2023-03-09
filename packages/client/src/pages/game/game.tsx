import { useEffect, useMemo, useRef } from 'react';
import { Button, ButtonVariation } from '../../components/button/button';
import { GameEngine } from '../../game-engine/gameEngine';
import { unAuthorizedRedirect } from '../../utils/helpers'
import style from './game.module.scss'

export const gameLoader = unAuthorizedRedirect

export const Game = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  useEffect(() => { initCanvas() }, []);
  let gameEngine: GameEngine | null  = null;

  async function initCanvas() {
    if (canvasEl.current) {
      gameEngine = await GameEngine.init(canvasEl.current);
    }
  }

  async function reloadGame() {
      await gameEngine?.board?.reload();
  }

  return (
    <div className={style.gamePageWrapClass}>
      <Button
        className={style.reloadPageBtnClass}
        variation={ButtonVariation.PRIMARY}
        onClick={reloadGame}>
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
