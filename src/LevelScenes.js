class Level1 extends GameScene {
    constructor() {
      super('Level1')
      this.heights = [4, 7, 5, null, 5, 4, null, 4, 4];
      // Add Level1 weather here
      this.weather = 'afternoon';
      this.skyColor = 'sky';
      this.music = 'pinkMusic';
      this.platform = 'platform1';
      this.large = 'bg30';
      this.medium = 'bg20';

    }
  }
  
  class Level2 extends GameScene {
    constructor() {
      super('Level2')
      this.heights = [5, 4, null, 4, 6, 4, 6, 5, 5];
      // Add Level2 weather here
      this.weather = 'twilight';
      this.skyColor = 'sunset';
      this.music = 'bass';
      this.platform = 'platform2'
      this.large = 'bg31';
      this.medium = 'bg21';
    }


    
  }
  
  class Level3 extends GameScene {
    constructor() {
      super('Level3')
      this.heights = [6, null, 6, 4, 6, 4, 5, null, 4];
      this.skyColor = 'night';
      this.music = 'Nevada';
      this.platform = 'platform3'
      this.large = 'bg32';
      this.medium = 'bg22';

    }

    batReady() {
      console.log("HELLO CRETE FROM LEVLE 2")

      gameState.bat = this.physics.add.group({
        allowGravity: false
      });
      this.time.addEvent({
        callback: this.batGenLoop,
        delay: 1000,
        callbackScope: this,
        loop: true,
      });
      

      this.physics.add.overlap(gameState.bat, gameState.platforms,  function (bat, platform) {
        console.log('sheeesh')
        bat.destroy();
      })

      this.physics.add.overlap(gameState.playerA, gameState.bat, (player, currentEnemy) => {
        gameState.currentMusic.stop();//chicken A music!
        this.cameras.main.fade(800, 0, 0, 0, false, function(camera, progress) {
          camera.shake(240, .01, true)
          this.scene.stop(this.levelKey);
          this.scene.restart(this.levelKey);
          
        });
      });
    
      //bat losing condition
      this.physics.add.overlap(gameState.playerB, gameState.bat, (player, currentEnemy) => {
        gameState.currentMusic.stop();//chicken B!! Music!
    
        this.cameras.main.fade(800, 0, 0, 0, false, function(camera, progress) {
          camera.shake(240, .01, true)
          this.scene.stop(this.levelKey);
          this.scene.restart(this.levelKey);
          
        });
      });

      

    }//create

    batGenLoop() {
      console.log('batman')

      const yCoord = Math.random() * 600;
      gameState.bat.create(1890, yCoord, 'bat').setScale(3).body.setSize(12, 10, true).setOffset(10, 10)
      gameState.bat.move = this.tweens.add({
        targets: gameState.bat.getChildren(),
        x: -200,
        ease: 'linear',
        duration: 5000,
      });
      gameState.bat.move2 = this.tweens.add({
        targets: gameState.bat.getChildren(),
        y: "-=10",
        ease: 'linear',
        duration: 100,
        yoyo: true,
        repeat: -1
      });
      gameState.bat.playAnimation('batFly')

    }
  }