
steve = sprites.create(img("""
    . . 5 5 5 5 . .
    . 5 5 5 5 5 5 .
    . 5 1 1 1 1 5 .
    . 5 1 f 1 f 5 .
    . 5 1 1 1 1 5 .
    . . 5 5 5 5 . .
    . . 5 5 5 5 . .
    . 5 5 5 5 5 5 .
"""), SpriteKind.player)

controller.move_sprite(steve, 100, 100)
steve.set_stay_in_screen(True)

info.set_life(3)
info.set_score(0)
def create_diamond():
    diamond = sprites.create(img("""
        . . 8 . .
        . 8 8 8 .
        8 8 8 8 8
        . 8 8 8 .
        . . 8 . .
    """), SpriteKind.food)

    diamond.set_position(randint(10, 150), randint(10, 110))


game.on_update_interval(2000, create_diamond)


def on_player_overlap(player, diamond):
    diamond.destroy()
    info.change_score_by(1)
    music.play_tone(880, 100)


sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_player_overlap)

creeper = sprites.create(img("""
    5 5 . . . . 5 5
    5 5 . . . . 5 5
    . . 5 5 5 5 . .
    . 5 1 5 5 1 5 .
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    . 5 5 5 5 5 5 .
    5 5 . . . . 5 5
"""), SpriteKind.enemy)

creeper.set_position(140, 60)
creeper.follow(steve, 30)


def on_enemy_overlap(player, enemy):
    info.change_life_by(-1)
    player.start_effect(effects.fire, 300)
    enemy.set_position(randint(20, 140), randint(20, 100))


sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_enemy_overlap)


def check_score():
    if info.score() >= 10:
        game.game_over(True)


game.on_update(check_score)