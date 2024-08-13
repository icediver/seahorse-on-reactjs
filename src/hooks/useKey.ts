import { useEffect } from "react";
import { Game } from "../game/Game";

export const useKey = (game: Game) => {
  useEffect(() => {
    function keyDownHandler({ key }: KeyboardEvent) {
      if (
        (key === "ArrowUp" || key === "ArrowDown") &&
        game.keys.indexOf(key) === -1
      ) {
        game.keys.push(key);
      } else if (key === " ") {
        game.player.shootTop();
      }
    }
    function keyUpHandler({ key }: KeyboardEvent) {
      if (game.keys.indexOf(key) > -1) {
        game.keys.splice(game.keys.indexOf(key), 1);
      }
    }

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, [game]);
};
