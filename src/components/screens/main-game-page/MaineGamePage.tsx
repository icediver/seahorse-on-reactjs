import { useEffect, useRef } from "react";
import { Game } from "../../../game/Game";
export function MainGamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = 1500;
    canvas.height = 500;

    let lastTime = 0; // stores a value of timestamp from the previous animation loop
    const game = new Game(canvas.width, canvas.height);

    function animate(currentTime: number) {
      // В currentTime будет записан момент времени следующего вызова функции animate()
      if (canvas && ctx) {
        const deltaTime = currentTime - lastTime; // Разница, в миллисекундах, между итерациями анимационного цикла
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем игровое поле перед следующей анимацией
        game.draw(ctx);
        game.update(deltaTime); // Теперь обновление игры будет зависеть от частоты смены кадров
        lastTime = currentTime; // Переприсваивание временных позиций
        requestRef.current = requestAnimationFrame(animate);
      }
    }
    animate(0);

    return () => cancelAnimationFrame(requestRef.current as number);
  }, []);

  return (
    <div className="container">
      <canvas ref={canvasRef} />
    </div>
  );
}
