class GameScene extends Phaser.Scene {
    constructor(key) {
      super(key);
      // this.heights = [6, null, 6, 4, 6, 4, 5, null, 4];
      this.levelKey = key
      this.nextLevel = {
        'Level1': 'Level2',
        'Level2': 'Level3',
        'Level3': 'EndScene',
      }
    }

    preload ()
    {   //spritesheet
        this.load.spritesheet('player','../images/player.png', { frameWidth: 160, frameHeight: 160});
        this.load.spritesheet('beam', '../images/Beam.png', {frameWidth: 1080, frameHeight: 254});
        this.load.spritesheet('doge', '../images/Doge.png', {frameWidth: 1080, frameHeight: 1080});
        //small
        this.load.image('bg1', '../images/ROCK ROCK.png');
        this.load.image('bg101', '../images/Best Rock.png');
        //large3
        this.load.image('bg30', '../images/pinkpannel.png');
        this.load.image('bg31', '../images/trees.png');
        this.load.image('bg32', '../images/wavepannel.png');


        //medium2
        this.load.image('bg20', '../images/buildpanna.png');
        this.load.image('bg21', '../images/rocks.png');

        this.load.image('bg22', '../images/castlepannel.png');

        //fixed background
        this.load.image('sky', '../images/pink.jpg');
        this.load.image('sunset', '../images/sunset.png');
        this.load.image('night', '../images/night.png');


        //sfx
        this.load.audio('bass', '../audio/BASS.mp3');
        this.load.audio('pinkMusic', '../audio/pinkMusic.mp3');
        this.load.audio('Nevada', '../audio/Nevada.mp3');


        //platform
        this.load.image('platform2', '../images/platform.png');
        this.load.image('platform1', '../images/cloud.png');

        this.load.image('platform3', '../images/oldplat.png');


        //tweens' spritesheet
        this.load.spritesheet('giraffe', '../images/GohanGiraffe.png', {frameWidth: 1080, frameHeight: 1000});
        this.load.spritesheet('chicken', '../images/SpicyChicken.png', {frameWidth: 384, frameHeight: 340});
        this.load.spritesheet('bat', '../images/bat.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('snowman', 'https://content.codecademy.com/courses/learn-phaser/Cave%20Crisis/snowman.png', { frameWidth: 50, frameHeight: 70 });
        this.load.spritesheet('exit', 'https://content.codecademy.com/courses/learn-phaser/Cave%20Crisis/cave_exit.png', { frameWidth: 60, frameHeight: 70 });
    }

    create(){
        //essentials
        console.log("HELLO CRETE FROM GAME SCENE")
        gameState.active = true;

        gameState.bgColor = this.add.rectangle(0, 0, config.width, config.height, 0x0000).setOrigin(0, 0);
        

        gameState.cursors = this.input.keyboard.createCursorKeys();

        this.createParallaxBackgrounds();

        //add music
        console.log(this.music)
        // gameState.bass = this.sound.add('bass');
        gameState.currentMusic = this.sound.add(this.music);//add()!! do the same to other assets for different levels
        //play music
        gameState.currentMusic.play({
          mute: false,
          volume:1,
          loop: false,
        });

        //attack hitbox
        gameState.hitBoxA = this.physics.add.sprite(-100, 0, 'beam').setScale(1/6);
        gameState.hitBoxB = this.physics.add.sprite(-100, 0, 'beam').setScale(1/6);
        gameState.hitBoxA.body.allowGravity = false;
        gameState.hitBoxB.body.allowGravity = false;

        gameState.hitBoxA.visible = false;
        gameState.hitBoxB.visible = false;

        //backwall
        gameState.wall = this.add.rectangle(-10, config.height, 0x0000);
        this.physics.add.existing(gameState.wall);

       
        //snowman group
        gameState.enemy = this.physics.add.group();
        for (const [xIndex, yIndex] of this.heights.entries()) {
          if (typeof yIndex === 'number' && typeof xIndex === 'number') {
            gameState.enemy.create((220 * xIndex)+200,  0, 'snowman');
          } 
        }
          

        //other enemies
        gameState.chicken = this.physics.add.group();
        gameState.giraffe = this.physics.add.sprite(2500, 400, 'giraffe').setScale(0.6).setInteractive()//for hitarea;
        gameState.giraffe.body.allowGravity = false;
        gameState.giraffe.body.setSize(200, 1000, true);//change hit area with position relative to texture


        gameState.exit = this.physics.add.sprite((9*210-20), 0, 'exit');
        

        gameState.platforms = this.physics.add.group({
          immovable: true,
          allowGravity: false
        });

        //sprite set!
        gameState.playerA = this.physics.add.sprite(60, 20, 'player').setScale(.2);
        gameState.playerB = this.physics.add.sprite(60, 20, 'player').setScale(.2);
        gameState.playerA.body.setSize(260, 440, true).setOffset(420, 330);//change hit area with position relative to texture???????
        gameState.playerB.body.setSize(260, 440, true).setOffset(420, 330);//change hit area with position relative to texture???????

        //name tags
        gameState.playerA.tag = this.add.text(1,1,'Player A', { fontSize: '20px', fill: '#ff0000', fontFamily: 'Arial' });
        gameState.playerB.tag = this.add.text(1,1,'Player B', { fontSize: '20px', fill: '#0000ff', fontFamily: 'Arial' });
        //make keys
        gameState.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        gameState.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        gameState.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        gameState.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        gameState.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);



        //setups
        this.createAnimations();
        this.levelSetup();

        //anims set
        //all snowmen animation play
        gameState.enemy.playAnimation('snowmanAlert')

        gameState.exit.anims.play('glow', true);

        //cameras
        window.camera = this.cameras;
        this.cameras.main.setBounds(0, 0, gameState.bg3.width, gameState.bg3.height);
        this.physics.world.setBounds(0, 0, gameState.width, gameState.bg3.height + gameState.playerA.height);

        this.cameras.main.startFollow(gameState.playerA, true, 0.5, 0.5);

        
        //colliders
        gameState.playerA.setCollideWorldBounds(true);
        gameState.playerB.setCollideWorldBounds(true);

        this.physics.add.collider(gameState.playerA, gameState.platforms);
        this.physics.add.collider(gameState.playerB, gameState.platforms);
        this.physics.add.collider(gameState.enemy, gameState.platforms);
        this.physics.add.collider(gameState.exit, gameState.platforms);






    

        //react collide------------------------------------------------------------
        //snowman collide
        gameState.targetEnemyA;
        gameState.targetEnemyB;
        window.hello = gameState.targetEnemyB


        this.physics.add.overlap(gameState.playerA, gameState.enemy, (player, currentEnemy) => {
          gameState.targetEnemyA = currentEnemy; // set the snowman that collided with the player A
          gameState.movableA = false;
          this.physics.add.overlap(gameState.playerA, gameState.playerB, () => {
            gameState.movableA = true;
            gameState.movableB = true;

          })
        });

        this.physics.add.overlap(gameState.playerB, gameState.enemy, (player, currentEnemy) => {
          gameState.targetEnemyB = currentEnemy; // set the snowman that collided with the player B
          gameState.movableB = false;
          this.physics.add.overlap(gameState.playerA, gameState.playerB, () => {
            gameState.movableB = true;
            gameState.movableA = true;

          })
        });

        


        

        //tweens
        this.loadTweens();
        //attack mark@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        this.physics.add.overlap(gameState.hitBoxA, gameState.enemy, (hitbox, currentEnemy) => {
          camera.shake(240, .01, false)
          currentEnemy.destroy();          
        });

        this.physics.add.overlap(gameState.hitBoxB, gameState.enemy, (hitbox, currentEnemy) => {
          camera.shake(240, .01, false)
          // currentEnemy.setTint(0xff0000);

          currentEnemy.destroy();
        });

        this.physics.add.overlap(gameState.hitBoxA, gameState.chicken, (hitbox, currentChicken) => {
          camera.shake(240, .01, false)

          currentChicken.destroy();
        });

        this.physics.add.overlap(gameState.hitBoxB, gameState.chicken, (hitbox, currentChicken) => {
          camera.shake(240, .01, false)

          currentChicken.destroy();
        });

        


        //finalize---------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //chicken rain
        this.time.addEvent({
          callback: this.chickenGenLoop,
          delay: 1000,
          callbackScope: this,
          loop: true,
        })
        const camera = this.cameras.main;


        this.physics.add.overlap(gameState.chicken, gameState.platforms,  function (chicken, platform) {
          console.log('wooow')
          chicken.destroy();
        })

        //chicken losing condition

        this.physics.add.overlap(gameState.playerA, gameState.chicken, (player, currentEnemy) => {
          gameState.currentMusic.stop();//chicken A music!
          this.cameras.main.fade(800, 0, 0, 0, false, function(camera, progress) {
            camera.shake(240, .01, true)
            this.scene.stop(this.levelKey);
            this.scene.restart(this.levelKey);
            
          });
        });

        //chicken losing condition
        this.physics.add.overlap(gameState.playerB, gameState.chicken, (player, currentEnemy) => {
          gameState.currentMusic.stop();//chicken B!! Music!

          this.cameras.main.fade(800, 0, 0, 0, false, function(camera, progress) {
            camera.shake(240, .01, true)
            this.scene.stop(this.levelKey);
            this.scene.restart(this.levelKey);
            
          });
        });


        //boss giraffe
        // gameState.giraffe.move.stop();
        this.time.addEvent({
          callback: function() {
            gameState.giraffe.move.play();//!
            console.log('Gohan Longass neck rage!');
            gameState.exit.x = 300;
            gameState.exit.y= 0;
          },
          delay: 20000,//20000 is best
          callbackScope: this,
          loop: false,
        })

        //Rocking rock event listener
        this.time.addEvent({
          callback: function() {
            gameState.bg1.move.play();//!
            console.log('Rock the rock');
          },
          delay: 10000,//20000 is best
          callbackScope: this,
          loop: false,
        })

        //event listener
        //hitboxA listener
        gameState.playerA.on('animationstart-kill', function () {
          console.log("finish kill <3")
          gameState.hitBoxA.x = gameState.playerA.flipX ? gameState.playerA.x + 120 : gameState.playerA.x - 120;
          gameState.hitBoxA.y = gameState.playerA.y;
          gameState.hitBoxA.visible = true;

        })
        console.log("create")
        gameState.playerA.on('animationcomplete-kill', function () {
          console.log("kill <3")
          gameState.hitBoxA.x =0 ;
          gameState.hitBoxA.y = 0;
          gameState.hitBoxA.visible = false;
          
        })


        //hitboxB listener
        gameState.playerB.on('animationstart-kill', function () {
          console.log("finish kill <3")
          gameState.hitBoxB.x = gameState.playerB.flipX ? gameState.playerB.x + 120 : gameState.playerB.x - 120;
          gameState.hitBoxB.y = gameState.playerB.y;
          gameState.hitBoxB.visible = true;

        })
        gameState.playerB.on('animationcomplete-kill', function () {
          console.log("kill <3")
          gameState.hitBoxB.x =0 ;
          gameState.hitBoxB.y = 0;
          gameState.hitBoxB.visible = false;
          
        })


        //giraffe collider
        this.physics.add.overlap(gameState.platforms, gameState.giraffe,  function (giraffe, platform) {
          camera.shake(240, .03, true)
          console.log('wooow')
          platform.destroy();
        })//&

        //level varies
        //weather
        this.setSky(this.skyColor);


        if (this.batReady) {
          console.log('bats are ready')
          this.batReady();
        }
    }//close create()


    loadTweens() {
      window.gg = gameState.enemy

      gameState.enemy.move = this.tweens.add({
        targets: gameState.enemy.getChildren(),
        x: '-=60',
        ease: 'Linear',
        duration: 1000,
        repeat: -1,
        yoyo: true
      });
      //here for website info source
      //https://www.html5gamedevs.com/topic/41560-how-can-i-create-a-tween-for-a-group/


      gameState.giraffe.move = this.tweens.add({
        targets: gameState.giraffe,
        x: -300,
        ease: 'Linear',
        duration: 10000,
        repeat: 1 ,
        yoyo: true,
        paused: true,
        flipX: true,
        onStart: function() {
          console.log('run giraffe run')
          gameState.giraffe.anims.play('giraffeRun', true);
        }
      });

      gameState.bg1.move = this.tweens.add({
        targets: gameState.bg1,
        x: '-=10',        // start from current value
        duration:200,
        ease: 'linear',
        yoyo: true,
        repeat: 10,
        paused: true,
        onStart: function() {
          console.log('face hange!')
          gameState.bg1.timeline.play();
        }
    });

      gameState.bg1.timeline = this.tweens.createTimeline();

      gameState.bg1.timeline.add({
          targets: gameState.bg1,
          y: 900,
          ease: 'linear',
          duration: 3000
      });

      gameState.bg1.timeline.add({
          targets: gameState.bg101,
          y: config.height/2,
          ease: 'linear',
          duration: 3000
      });

      gameState.bg1.timeline.add({
        targets: gameState.bg101,
        x: '+=10',
        ease: 'linear',
        yoyo: true,
        duration: 200,
        repeat: -1
    });

    }
    createAnimations() {
      window.dis = this
      //player
      this.anims.create({
        key: 'kill',
        frames: this.anims.generateFrameNumbers('doge', { start: 10, end: 11 }),
        frameRate: 4,
        repeat: -1
      });

      this.anims.create({
        key: 'glow',
        frames: this.anims.generateFrameNumbers('exit', { start: 0, end: 5 }),
        frameRate: 4,
        repeat: -1
      });

      this.anims.create({
        key: 'diz',
        frames: this.anims.generateFrameNumbers('doge', { start: 11, end: 14 }),
        frameRate: 5,
        repeat: -1
      });

      this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('doge', { start: 2, end: 9 }),
        frameRate: 30,
        repeat: -1
      });
  
      this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('doge', { start: 0, end: 1 }),
        frameRate: 5,
        repeat: -1
      });
  
      this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('doge', { start: 12, end: 14 }),
        frameRate: 15,
        repeat: -1
      });
      //snowman(enemy)
      this.anims.create({
        key: 'snowmanAlert',
        frames: this.anims.generateFrameNumbers('snowman', { start: 0, end: 3 }),
        frameRate: 4,
        repeat: -1
      });

      this.anims.create({
        key: 'chickenRun',
        frames: this.anims.generateFrameNumbers('chicken', {start: 0, end: 4}),
        frameRate: 5,
        repeat: -1
      });

      //giraffe
      this.anims.create({
        key: 'giraffeRun',
        frames: this.anims.generateFrameNumbers('giraffe', {start: 0, end: 5}),
        frameRate: 5,
        repeat: -1
      });

      //bat
      this.anims.create({
        key: 'batFly',
        frames: this.anims.generateFrameNumbers('bat', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
      });
        
      }//anims finish

    createPlatform(xIndex, yIndex) {
      // Creates a platform evenly spaced along the two indices.
      // If either is not a number it won't make a platform
      if (typeof yIndex === 'number' && typeof xIndex === 'number') {//if wrong come here
        gameState.platforms.create((220 * xIndex),  yIndex * 70, this.platform).setOrigin(0, 0.5);
      }
    }  

    levelSetup() {
      for (const [xIndex, yIndex] of this.heights.entries()) {
       this.createPlatform(xIndex, yIndex);
      } 
    }

    createParallaxBackgrounds() {
      gameState.sky = this.add.image(0, 0, 'sky');
      gameState.sky.width = config.width;


      window.sky = gameState.sky;

      //rock hide and show
      gameState.bg1 = this.add.image(0, 0, 'bg1');
      gameState.bg101 = this.add.image(config.width/2, 900, 'bg101').setScale(1.2);

      gameState.bg2 = this.add.image(0, 0, this.medium);
      gameState.bg3 = this.add.image(0, 0, this.large);

      gameState.sky.setOrigin(0, 0);
      gameState.bg1.setOrigin(0, 0);


      gameState.bg2.setOrigin(0, 0);
      gameState.bg3.setOrigin(0, 0);
  
      const game_width = parseFloat(gameState.bg3.getBounds().width)
      gameState.width = game_width;
      const window_width = config.width;
  
      const bg1_width = gameState.bg1.getBounds().width
      const bg2_width = gameState.bg2.getBounds().width
  
      gameState.sky.setScrollFactor(0);
      gameState.bg1.setScrollFactor((bg1_width - window_width) / (game_width - window_width));
      gameState.bg101.setScrollFactor((bg1_width - window_width) / (game_width - window_width));

      gameState.bg2.setScrollFactor((bg2_width - window_width) / (game_width - window_width));
  }

    setSky(i) {
      if (i) {
        gameState.sky.setTexture(i)
      }
    }

    chickenGenLoop() {
      const xCoord = Math.random() * 1890;
      gameState.chicken.create(xCoord, 10, 'chicken').setScale(0.3).body.setSize(140, 320, true).setOffset(100, 20);
      gameState.chicken.playAnimation('chickenRun')
    }
    update() {
        if(gameState.active){
          //player tag position update
          gameState.playerA.tag.x = gameState.playerA.x-30;
          gameState.playerA.tag.y = gameState.playerA.y-50;
          gameState.playerB.tag.x = gameState.playerB.x-30;
          gameState.playerB.tag.y = gameState.playerB.y-50;

          //player A controls
            if (gameState.movableA) {
              if (gameState.cursors.right.isDown) {
                gameState.playerA.flipX = true;
                gameState.playerA.setVelocityX(gameState.speed);
                gameState.playerA.anims.play('run', true);
              } else if (gameState.cursors.left.isDown) {
                gameState.playerA.flipX = false;
                gameState.playerA.setVelocityX(-gameState.speed);
                gameState.playerA.anims.play('run', true);
              }  else {
                gameState.playerA.setVelocityX(0);
                gameState.playerA.anims.play('idle', true);
              }

              //others
              if (gameState.cursors.up.isDown && (gameState.playerA.body.touching.down)) {
                gameState.playerA.setVelocityY(-500);
              }
        
              if (!gameState.playerA.body.touching.down){
                gameState.playerA.anims.play('jump', false);
              }
              if (gameState.cursors.down.isDown) {
                gameState.playerA.anims.play('kill', true); 
              }
  
              
            } else {
              this.cameras.main.startFollow(gameState.playerB, true, 0.5, 0.5);
              gameState.playerA.anims.play('diz', true);
              gameState.playerA.x = gameState.targetEnemyA.x;
              

              gameState.playerA.y = gameState.targetEnemyA.y - 80;
            }
            //player B controls
            if (gameState.movableB) {
              if (gameState.keyD.isDown) {
                gameState.playerB.flipX = true;
                gameState.playerB.setVelocityX(gameState.speed);
                gameState.playerB.anims.play('run', true);
              } else if (gameState.keyA.isDown) {
                gameState.playerB.flipX = false;
                gameState.playerB.setVelocityX(-gameState.speed);
                gameState.playerB.anims.play('run', true);
              } else {
                gameState.playerB.setVelocityX(0);
                gameState.playerB.anims.play('idle', true);
              }
  
              if (gameState.keyW.isDown && gameState.playerB.body.touching.down) {
                gameState.playerB.anims.play('jump', true);
                gameState.playerB.setVelocityY(-500);
              }
        
              if (!gameState.playerB.body.touching.down) {
                console.log('up');
                gameState.playerB.anims.play('jump', true);
              }

              if (gameState.keyS.isDown) {
                gameState.playerB.anims.play('kill', true);
              }
      
              
            } else {
              this.cameras.main.startFollow(gameState.playerA, true, 0.5, 0.5);
              gameState.playerB.anims.play('diz', true);

              gameState.playerB.x = gameState.targetEnemyB.x;
              gameState.playerB.y = gameState.targetEnemyB.y - 80;
            }
            //losing conditions
            if ((gameState.playerB.y > gameState.bg1.height) || (gameState.playerA.y > gameState.bg1.height) || (!gameState.movableA && !gameState.movableB)){
              gameState.currentMusic.stop();
              gameState.movableA = true;
              gameState.movableB = true;
              console.log('Player dies');
              this.cameras.main.shake(240, .01, false, function(camera, progress) {
                if (progress > 0.9) {
                  this.physics.pause();
                  this.scene.restart(this.levelKey);
                }
                }
              );
            }

            //exit winning condition
            if ((this.physics.overlap(gameState.playerA, gameState.exit)) && (this.physics.overlap(gameState.playerB, gameState.exit))) {
              gameState.currentMusic.stop();
              this.cameras.main.fade(800, 0, 0, 0, false, function(camera, progress) {
              if (progress>0.9) {
                this.scene.stop(this.levelKey);
                this.scene.start(this.nextLevel[this.levelKey]);
              }
            });
          
        }

        if (gameState.keyQ.isDown) {
          gameState.currentMusic.stop();
          this.scene.stop(this.levelKey);
          this.scene.start(this.nextLevel[this.levelKey]);
        }

          }//active
  }//update
  

    

}//class