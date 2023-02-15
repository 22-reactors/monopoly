import { useEffect, useRef } from 'react';
import { GameEngine } from './game-engine/gameEngine';


export const GamePage = () => {
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

  const visibilityState =  "visible"

  return (
    <>
      <canvas
        ref={canvasEl}
        width={1000}
        height={1000}
        style={{
          marginLeft: 50,
          marginTop: 100,
        }}
      />
      <button onClick={reloadPage} style={{visibility: visibilityState}}>Начать сначало</button>
    </>
  );
};
