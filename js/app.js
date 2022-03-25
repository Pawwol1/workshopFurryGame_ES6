document.addEventListener("DOMContentLoaded", function(){

    class Furry{
        constructor(){
            this.x = 0;
            this.y = 0;
            this.direction = 'right';
        }
    }
    class Coin{
        constructor(){
            this.x = Math.floor(Math.random() * 10);
            this.y = Math.floor(Math.random() * 10);
        }
    }

    class Game {
        constructor() {
            this.board = document.querySelectorAll('#board div');
            this.furry = new Furry();
            this.coin = new Coin();
            this.score = 0;
            this.idSetInterval = 0;

        }


        index(x, y) {
            return x + (y * 10);
        }

        showFurry() {
            this.hideVisibleFurry();
            if(this.furry.y<=9 && this.furry.y>=0)
                this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');

        }

        showCoin() {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        }

        startGame() {
            this.startGameInterval = setInterval(() => {
                this.moveFurry();
                this.idSetInterval++;
            }, 250);
        }

        moveFurry() {
            if (this.furry.direction === "right") {
                this.furry.x = this.furry.x + 1;
            } else if (this.furry.direction === "left") {
                this.furry.x = this.furry.x - 1;
            } else if (this.furry.direction === "up") {
                this.furry.y = this.furry.y - 1;
            } else if (this.furry.direction === "down") {
                this.furry.y = this.furry.y + 1;
            }
            this.showFurry();
            this.gameOver();
            this.checkCoinCollision();
        }

        hideVisibleFurry() {
            let furryElement = document.querySelector('.furry');
            if (furryElement)
                furryElement.classList.remove('furry');
        }

        turnFurry(event) {
            switch (event.which) {
                case 37:
                    this.furry.direction = 'left';
                    break;
                case 39:
                    this.furry.direction = 'right';
                    break;
                case 38:
                    this.furry.direction = 'up';
                    break;
                case 40:
                    this.furry.direction = 'down';
                    break;
            }
        }
        checkCoinCollision() {
            if(this.furry.x === this.coin.x && this.furry.y === this.coin.y){
                this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
                this.score++;
                let scoreField = document.querySelector('#score').querySelector('strong');
                scoreField.innerText = this.score;
                this.coin = new Coin();
                this.showCoin();
            }
        }
        gameOver(){
            if(this.furry.x>9 || this.furry.x<0 || this.furry.y>9 || this.furry.y<0){
                clearInterval(this.startGameInterval);
                this.hideVisibleFurry();
                alert("game over");
            }
        }
    }

    const gra = new Game();
    gra.showFurry();
    gra.showCoin();
    gra.startGame();
    document.addEventListener('keydown', function (event) {
        gra.turnFurry(event);
    });

});