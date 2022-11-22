const gameState = {
    speed: 240,
    ups: 380,
    scoreA: 0,
    scoreB: 0,
    movableA : true,
    movableB: true
};


var keyW;
var keyA;
var keyS;
var keyD;
var KeyQ;

const config = {
    type: Phaser.AUTO,
    width: 500,
    height: 600,
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 800 }
        }
    },
    scene: [StartScene, Level1, Level2, Level3, EndScene]
};

const game = new Phaser.Game(config);
