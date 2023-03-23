import { useEffect, useRef, useState } from 'react';
import { Button, ButtonVariation } from '../../components/button/button';
import { GameEngine } from '../../game-engine/gameEngine';
import { unAuthorizedRedirect } from '../../utils/helpers';
import style from './game.module.scss';
import { useNavigate } from 'react-router-dom';
import { links } from '../../utils/const';
import { useAppSelector } from '../../reduxstore/hooks';
import { buyingCardInfoSelector } from '../../reduxstore/game/buyingCardInfo.selector';
import { MonopolyConfig } from '../../game-engine/config/monopolyConfig';
import { GameModal } from '../../components/modal/game/gameModal';

export const gameLoader = unAuthorizedRedirect;

export const Game = () => {
  const buyingCardInfo = useAppSelector(buyingCardInfoSelector);
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.document.documentElement.requestFullscreen();
    initCanvas();
  }, []);

  async function initCanvas() {
    if (canvasEl.current) {
      const gameEngine = await GameEngine.init(canvasEl.current);
      setGameEngine(gameEngine);
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
      <GameModal
        show={buyingCardInfo.showModal}
        title={`Вы встали на "${buyingCardInfo.cardName}"`}>
        <Button
          variation={ButtonVariation.PRIMARY}
          onClick={() => { gameEngine?.buyCard(buyingCardInfo) }}>
          Купить ({buyingCardInfo.cardPrice} {MonopolyConfig.currency})
        </Button>
        <Button
          variation={ButtonVariation.PRIMARY}
          onClick={() => { gameEngine?.resetStateAndSetNextPlayer() }}>
          Отказаться
        </Button>
      </GameModal>
    </div>
  );
};
