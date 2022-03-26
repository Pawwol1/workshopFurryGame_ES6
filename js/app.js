import "../sass/main.scss";
import Game from "./game";

document.addEventListener("DOMContentLoaded", function(){

    const gra = new Game();
    gra.showFurry();
    gra.showCoin();
    gra.startGame();
    document.addEventListener('keydown', function (event) {
        gra.turnFurry(event);
    });
});