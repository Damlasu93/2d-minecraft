let steve = sprites.create(img`
    . . 5 5 5 5 . .
    . 5 5 5 5 5 5 .
    . 5 1 1 1 1 5 .
    . 5 1 f 1 f 5 .
    . 5 1 1 1 1 5 .
    . . 5 5 5 5 . .
    . . 5 5 5 5 . .
    . 5 5 5 5 5 5 .
`, SpriteKind.Player)
controller.moveSprite(steve, 100, 100)
steve.setStayInScreen(true)
info.setLife(3)
info.setScore(0)
game.onUpdateInterval(2000, function create_diamond() {
    let diamond = sprites.create(img`
        . . 8 . .
        . 8 8 8 .
        8 8 8 8 8
        . 8 8 8 .
        . . 8 . .
    `, SpriteKind.Food)
    diamond.setPosition(randint(10, 150), randint(10, 110))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function on_player_overlap(player: Sprite, diamond: Sprite) {
    diamond.destroy()
    info.changeScoreBy(1)
    music.playTone(880, 100)
})
let creeper = sprites.create(img`
    5 5 . . . . 5 5
    5 5 . . . . 5 5
    . . 5 5 5 5 . .
    . 5 1 5 5 1 5 .
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    . 5 5 5 5 5 5 .
    5 5 . . . . 5 5
`, SpriteKind.Enemy)
creeper.setPosition(140, 60)
creeper.follow(steve, 30)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_enemy_overlap(player: Sprite, enemy: Sprite) {
    info.changeLifeBy(-1)
    player.startEffect(effects.fire, 300)
    music.playTone(220, 150)
    enemy.setPosition(randint(20, 140), randint(20, 100))
})
game.onUpdate(function check_score() {
    if (info.score() >= 10) {
        game.gameOver(true)
    }
    
})
