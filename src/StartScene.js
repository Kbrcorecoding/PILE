class StartScene extends Phaser.Scene {
    constructor() {
        super({key: 'StartScene'})
    }

    create(){
        if (gameState.scoreA == 1){
            this.add.text(150, 250, (`Pile. You died ${gameState.scoreA} time`), {fill: '#FFFFFF', fontSize: '20px'});
        } else if (gameState.scoreA == 0 ) {
            this.add.text(150, 250, (`Pile. Welcome to play. `), {fill: '#FFFFFF', fontSize: '20px'});
            this.add.text(150, 300, (`made by kabi `), {fill: '#FFFFFF', fontSize: '20px'});
        } else {
            this.add.text(150, 250, (`Pile. You died ${gameState.scoreA} times`), {fill: '#FFFFFF', fontSize: '20px'});
        }
        this.input.on('pointerdown', ()=> {
            this.scene.stop('StartScene');
            this.scene.start('Level1');
        })

    }

    
}

class EndScene extends Phaser.Scene {
    constructor() {
        super({key: 'EndScene'})
    }

    create(){
        this.add.text(150, 250, (`Pile. Thanks for playing. `), {fill: '#FFFFFF', fontSize: '20px'});
        this.add.text(150, 300, (`made by kabi `), {fill: '#FFFFFF', fontSize: '20px'});
    }

    
}