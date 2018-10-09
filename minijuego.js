enchant();

window.onload = function(){
    var game = new Core(320, 320);
    game.fps = 15;
    game.preload("chara1.png", "icon0.png", "bigmonster1.gif");
    game.onload = function(){

        var Player = enchant.Class.create(enchant.Sprite, {
            initialize: function(){
                enchant.Sprite.call(this, 32, 32);
                this.image = game.assets['chara1.png'];
                this.frame = 5;                   // set image data
                this.lifes = 3;
                game.rootScene.addChild(this);     // add to canvas
            }
        });

         var Enemy = enchant.Class.create(enchant.Sprite, {
            initialize: function(){
                enchant.Sprite.call(this, 80, 80);
                this.image = game.assets['bigmonster1.gif']; // set image
                this.frame = 3;
                this.moveTo(238, Math.floor(Math.random() * 300)); // set position
                game.rootScene.addChild(this);     // canvas
            }
        });

         var ApplePlayer = enchant.Class.create(enchant.Sprite, {
            initialize: function(){
                enchant.Sprite.call(this, 16, 16);
                this.image = game.assets['icon0.png']; // set image
                this.moveTo(16, player.y + 8);       // move to the position
                this.tl.moveBy(320, 0, 30);        // set movement
                this.frame = 22;                   // set image data
                game.rootScene.addChild(this);     // add to canvas
            }
        });

         var AppleEnemy = enchant.Class.create(enchant.Sprite, {
            initialize: function(){
                enchant.Sprite.call(this, 16, 16);
                this.image = game.assets['icon0.png']; // set image
                this.moveTo(288 - 1, enemy.y);       // move to the position
                this.tl.moveBy(-320, 0, 30);        // set movement
                this.frame = 23;                   // set image data
                game.rootScene.addChild(this);     // add to canvas
            }
        });

        var player = new Player();
        var enemy = new Enemy();
        var right_down = false;

        game.rootScene.on('rightbuttondown', function(){
            if(right_down == false){
                var apple_player = new ApplePlayer();
                right_down = true;
            }
            
        });

        game.rootScene.on('rightbuttonup', function(){
            right_down = false;
        });

        game.rootScene.tl.then(function() {
            enemy.moveTo(238, Math.floor(Math.random() * 300));
            var apple_enemy = new AppleEnemy();
        }).delay(30).loop(); 

        game.rootScene.on('enterframe', function(){
            var hits = AppleEnemy.intersect(ApplePlayer);
            for(var i = 0, len = hits.length; i < len; i++){
                //game.rootScene.removeChild(hits[i][0]);
                game.rootScene.removeChild(hits[i][1]);
         
            }
        });

        game.rootScene.on('enterframe', function(){
            var hits = AppleEnemy.intersect(Player);
            for(var i = 0, len = hits.length; i < len; i++){
                game.rootScene.removeChild(hits[i][0]);
                if(player.lifes == 1){
                    game.rootScene.removeChild(hits[i][1]);
                    alert("Fin del juego. Score: " + score);
                    game.stop();
                    //fin del juego
                } else {
                    player.lifes = player.lifes - 1;
                }
                
         
            }
        });

        game.rootScene.on('enterframe', function(){
            var hits = ApplePlayer.intersect(Enemy);
            for(var i = 0, len = hits.length; i < len; i++){
                game.rootScene.removeChild(hits[i][0]);
                score = score + 1;
         
            }
        });

        game.rootScene.on('downbuttondown', function(){
            if(player.y < 258){
                player.y = player.y + 30;
            }
            
        });

        game.rootScene.on('upbuttondown', function(){
            if(player.y > 1){
                player.y = player.y - 30;
            }
            
        });

    

    };


        
    var score = 0;
    game.start();
};