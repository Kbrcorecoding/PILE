# PILE
A javascript phaser-3 framed simple game
To play, download the folder and open with vscode. Use live server to run the game. Note: right click index html and select host live server for shortcut.
!!problems:
bat is slowing donw;
every time i have to go through a call back with so much stuff in bat gen loop

why is it so hard to set small delays?
https://newdocs.phaser.io/docs/3.54.0/focus/Phaser.Time.Clock-delayedCall

refresh after respond
578 579
              gameState.movableA = true;
              gameState.movableB = true;



kill animation


flying problem


jumping problem

anims same frames for two anims

how to cancel certain collisions

gameState.chicken.playAnimation('chickenRun')//???



//suggestioooons
//interesting snowman
//hit by the chicken, become the kfc. still movable
//if both kfc, die

//one doge, chicken immune, one gorilla, laser/invisible hitbox

//uuuuuuuuuuuuuummmmmmmmmmmmmbrelaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa <umbrella for the chicken will be great!>


//consider making a group of snowman
//help from my stackoverflow & https://www.codecademy.com/courses/learn-phaser/lessons/learn-phaser-physics/exercises/adding-enemies

//chicken is to be given a task
https://phaser.io/examples/v3/category/tweens/timelines

//general tween info
//https://newdocs.phaser.io/docs/3.52.0/Phaser.Types.Tweens

//on hitbox frame ditect: https://photonstorm.github.io/phaser3-docs/Phaser.Animations.Events.html#event:ANIMATION_REPEAT__anchor

//giraffe solution : https://phaser.io/examples/v3/view/tweens/paused-tween

//hitbox solution: https://newdocs.phaser.io/docs/3.52.0/Phaser.Animations.Events.ANIMATION_COMPLETE_KEY

//overlap boolean solution : https://newdocs.phaser.io/docs/3.52.0/focus/Phaser.Physics.Matter.MatterPhysics-overlap
//with this. physics.overlap(objectA, objectB)
//don't forget.physics

//---------------------------------------------------------------------------------------------------------------------------------------------------------------//
  // Battack() {
  //   // gameState.playerA.on(Phaser.Animations.Events.ANIMATION_UPDATE, (anim: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame) => {
  //   gameState.hitBoxB.x = gameState.playerB.flipX ? gameState.playerB.x + 120 : gameState.playerB.x - 120;
  //   gameState.hitBoxB.y = gameState.playerB.y;
  // }

  // Aattack() {
  //   gameState.playerA.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, gameObject, frameKey) {
  //     // Here you can check for the specific-frame
  //     if(frameKey == "9"||frameKey == "10"){
  //         // ... show hitarea
  //         gameState.hitBoxA.x = gameState.playerA.flipX ? gameState.playerA.x + 120 : gameState.playerA.x - 120;
  //         gameState.hitBoxA.y = gameState.playerA.y;
  //     } else {
        
  //     }

  //  });
  // }




    // gameState.startHit = (anim: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame);
// console.log(gameState.playerA.anims.currentFrame.index);
            window.test = gameState
            //update hitbox position ???
            // this.Battack();
            // this.Aattack();
            
