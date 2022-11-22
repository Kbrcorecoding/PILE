var medianX = (gameState.playerA.body.x > gameState.playerB.body.x) ? (gameState.playerA.body.x - gameState.playerB.body.x) : (gameState.playerB.body.x - gameState.playerA.body.x);
    
        var medianY =  (gameState.playerA.body.y > gameState.playerB.body.y) ? (gameState.playerA.body.y - gameState.playerB.body.y) : (gameState.playerB.body.y - gameState.playerA.body.y);
        game.camera.focusOnXY(medianX, medianY);
        if(gameState.playerA.body.x < game.camera.view.x) {    
          gameState.playerA.stopMoveLeft(); // implementation dependent
    }
        if(gameState.playerB.body.x < game.camera.view.x) {    
          gameState.playerB.stopMoveLeft(); // implementation dependent
        }
        
        if(gameState.playerA.body.y < game.camera.view.y) {    
          gameState.playerA.stopMoveTop(); // implementation dependent
        }
        if(gameState.playerB.body.y < game.camera.view.y) {    
          gameState.playerB.stopMoveTop(); // implementation dependent
        }
        if(gameState.playerA.body.right > game.camera.view.right) {    
          gameState.playerA.stopMoveRight(); // implementation dependent
        }
        if(gameState.playerB.body.right > game.camera.view.right) {    
          gameState.playerB.stopMoveRight(); // implementation dependent
        }
        if(gameState.playerA.body.bottom > game.camera.view.bottom) {    
          gameState.playerA.stopMoveDown(); // implementation dependent
        }
        if(gameState.playerB.body.bottom > game.camera.view.bottom) {    
          gameState.playerB.stopMoveDown(); // implementation dependent
        }