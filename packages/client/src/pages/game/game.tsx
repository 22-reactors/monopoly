import { useEffect, useRef } from 'react';
import { Button, ButtonVariation } from '../../components/button/button';
import { GameEngine } from '../../game-engine/gameEngine';
import { unAuthorizedOfflineRedirect } from '../../utils/helpers';
import style from './game.module.scss';
import { useNavigate } from 'react-router-dom';
import { links } from '../../utils/const';

export const gameLoader = unAuthorizedOfflineRedirect;

export const Game = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  let gameEngine: GameEngine | null = null;

  useEffect(() => {
    window.document.documentElement.requestFullscreen();
    initCanvas();
  }, []);

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
      <div className={style.btnWrapper}>
        <Button
          className={style.reloadPageBtnClass}
          variation={ButtonVariation.PRIMARY}
          onClick={() => {
            window.document.exitFullscreen();
            navigate(links.setup.path);
          }}>
          Настройки
        </Button>
        <Button
          className={style.reloadPageBtnClass}
          variation={ButtonVariation.PRIMARY}
          onClick={() => {
            window.document.exitFullscreen();
            reloadGame();
          }}>
          Начать сначала
        </Button>
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
