class Game {
    constructor(){
        this.startScreen = document.querySelector("#game-intro");
        this.gameScreen = document.querySelector("#game-screen");
        this.gameEndScreen = document.querySelector("#game-end");
        this.scoreNode = document.querySelector("#score");
        this.livesNode = document.querySelector("#lives");
        this.player = new Player(
            this.gameScreen,
            200,
            500,
            100,
            150,
            "./images/car.png"
          );
        this.height = 600;
        this.width = 500;
        this.obstacles = [];
        this.scores = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = 1000/60
    }
    start(){
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";
        this.gameIntervalId = setInterval(() => {this.gameLoop()}, this.gameLoopFrequency)
    };
    gameLoop(){
        // console.log("in the game loop");
    
        this.update();
        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId)
        }
    };

    checkCollisions(){
        for (let i = 0; i < this.obstacles.length; i++) {
        const obstacle = this.obstacles[i];
        obstacle.move(); // esto no entiendo muy bien por que se encuentra aqui.

        if (this.player.didCollide(obstacle)) {
            obstacle.element.remove();
            this.obstacles.splice(i, 1);
            this.lives--;
            this.livesNode.innerText = this.lives;
            i--;
        }
        else if (obstacle.top > this.height) {
            this.scores++;
            this.scoreNode.innerText = this.scores;
            obstacle.element.remove();
            this.obstacles.splice(i, 1);
            i--;
        }
        }

        if (this.lives === 0) {
            this.endGame();
        }

        if (Math.random() > 0.98 && this.obstacles.length < 1) {
            this.obstacles.push(new Obstacle(this.gameScreen));
        }
    }

    endGame() {
        this.player.element.remove();
        this.obstacles.forEach(obstacle => obstacle.element.remove());
    
        this.gameIsOver = true;
    
        // Hide game screen
        this.gameScreen.style.display = "none";
        // Show end game screen
        this.gameEndScreen.style.display = "block";
      }

    update(){
        this.player.move();
        this.checkCollisions();
    };
}


// ==============    TERRENO DE PRUEBAS    ==============
// let lista = [1, 3, 2, 4, 2, 1, 2, 5]
// let index = []
// for(let i = 0; i < lista.length; i++){
//     if  (lista[i] % 2 === 0){
//         index.push(i)
//     }
// }
// index.forEach((index)=>{
//     lista.splice(index, 1)
// })
// console.log(lista);

// // ------------- SOLUCION ESTABLE -------------
// is (lista.length > 0){
//     for(let i = lista.length - 1; i >= 0; i--){
//         if  (lista[i] % 2 === 0){
//             lista.splice(i, 1);
//         }
//     }
// }
// console.log(lista);
