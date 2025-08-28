namespace StatusBarKind {
    export const defense = StatusBarKind.create()
}
function encounter() {
    if (Math.percentChance(50)) {
        if (Math.percentChance(50) && (defense_ || strike_)) {
            game.showLongText("you have encountered a elite", DialogLayout.Bottom)
            elite()
        } else {
            if (Math.percentChance(50)) {
                let groupName = enemyGroups._pickRandom();

                game.showLongText(`you have encountered a group of enemys who calls themself the ${groupName}`, DialogLayout.Bottom)
                enemy()
                for (let index = 0; index < randint(2, 4) - 1; index++) {
                    enemy()
                    pause(200)
                }
                savegame_state()
                Notification.notify("game saved!", 6, img`
                        . . . . . . f . 
                        . . . . f . f . 
                        4 4 4 4 4 f f f 
                        4 . . . 4 . . . 
                        4 4 4 4 4 4 . . 
                        4 . . . . 4 . . 
                        4 . . . . 4 . . 
                        4 4 4 4 4 4 . . 
                        `)
            } else {
                game.showLongText("you have encountered a enemy", DialogLayout.Bottom)
                enemy()
            }
        }
    } else if (Math.percentChance(50)) {
        game.showLongText("you have encountered a forest", DialogLayout.Bottom)
        if (game.ask("do you want to enter ", "the forest?")) {
            for (let index = 0; index < 2; index++) {
                if (Math.percentChance(40)) {
                    game.showLongText("you have encountered a enemy", DialogLayout.Bottom)
                    enemy()
                } else if (Math.percentChance(75)) {
                    anvil()
                } else {
                    if (healthBAR.value != healthBAR.max) {
                        game.showLongText("you have encountered a campfire", DialogLayout.Bottom)
                        if (game.ask("do you want to rest?")) {
                            energyBAR.value += 3
                            game.showLongText("your hp had been increased to max", DialogLayout.Bottom)
                            healthBAR.value = healthBAR.max
                        }
                    }
                }
            }
        }
    } else if (Math.percentChance(50)) {
        game.showLongText("you have encountered a desert", DialogLayout.Bottom)
        if (game.ask("do you want to enter ", "the desert?")) {
            if (Math.percentChance(45)) {
                game.showLongText("you have encountered a enemy", DialogLayout.Bottom)
                enemy()
            } else if (Math.percentChance(55)) {
                anvil()
            } else {
                if (Math.percentChance(65)) {
                    if (healthBAR.value != healthBAR.max) {
                        game.showLongText("you have encountered a campfire", DialogLayout.Bottom)
                        if (game.ask("do you want to rest?")) {
                            healthBAR.value += 3
                            game.showLongText("your hp had been increased to max", DialogLayout.Bottom)
                            healthBAR.value = energyBAR.max
                        }
                    }
                }
            }
        }
    } else if (Math.percentChance(50)) {
        anvil()
    } else {
        if (healthBAR.value != healthBAR.max) {
            game.showLongText("you have encountered a campfire", DialogLayout.Bottom)
            if (game.ask("do you want to rest?")) {
                healthBAR.value += 3
                game.showLongText("your hp had been increased to max", DialogLayout.Bottom)
                healthBAR.value = energyBAR.max
            }
        }
    }
}
function savegame_state() {
    blockSettings.writeNumber("hp", healthBAR.value)
    blockSettings.writeNumber("de", defenseBAR.value)
    if (defense_) {
        blockSettings.writeNumber("d", 1)
    }
    if (strike_) {
        blockSettings.writeNumber("s", 1)
    }
    if (escape_) {
        blockSettings.writeNumber("esc", 1)
    }
}
function anvil() {
    music.stopAllSounds()
    if (!(blockSettings.exists("md"))) {
        Achievements.showAchievement(
            "what the anvil?",
            "find your first Anvil"
        )
    }
    blockSettings.writeNumber("md", 1)
    game.showLongText("you have encountered a Anvil", DialogLayout.Bottom)
    if (game.ask("do you  want do upgrade", "strike?")) {
        strike_ = true
        energyBAR.value += -1
        for (let index = 0; index < 3; index++) {
            music.play(music.createSoundEffect(WaveShape.Noise, 374, 0, 255, 0, 100, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
        }
    } else if (game.ask("do you  want do upgrade", "defense?")) {
        defense_ = true
        energyBAR.value += -1
        for (let index = 0; index < 3; index++) {
            music.play(music.createSoundEffect(WaveShape.Noise, 374, 0, 255, 0, 100, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
        }
    } else if (game.ask("do you  want do upgrade", "escape skills?")) {
        escape_ = true
        energyBAR.value += -1
        for (let index = 0; index < 3; index++) {
            music.play(music.createSoundEffect(WaveShape.Noise, 374, 0, 255, 0, 100, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
        }
    }
}
let TICK_ = 0;
function enemy_turn(extrachance: number) {
    if (ENEMYHEALTH_ > RNG / 2.5) {
        clock = !(clock)
        if (clock) {
            return
        }
    }
    if (0 < ENEMYENERGY_) {
        if (Math.percentChance(10) && ENEMYENERGY_ > 1.2) {
            // do non normal path
            game.showLongText("The enemy unleashes a powerful strike!", DialogLayout.Bottom)
            if (Math.percentChance(1 + extrachance)) {
                DAMAGEDONE = 2.5
            } else {
                DAMAGEDONE = 1.3
            }
            scene.cameraShake(4, 500)
            game.showLongText(`you have taken ${Math.round(DAMAGEDONE)} damage`, DialogLayout.Bottom)
            if (0 < defenseBAR.value) {
                game.showLongText("but your defense took the hit", DialogLayout.Bottom)
                defenseBAR.value += 0 - DAMAGEDONE
            } else {
                healthBAR.value += 0 - DAMAGEDONE
            }
            ENEMYENERGY_ += -1.2
        }
        else if ((Math.percentChance(75) || defenseBAR.value > 3) && !(ENEMYHEALTH_ < RNG / 3.5 && (Math.percentChance(50) && Math.percentChance(50)))) {
            if (0 < ENEMYENERGY_) {
                if (Math.percentChance(1 + extrachance)) {
                    DAMAGEDONE = 2
                } else {
                    DAMAGEDONE = 1
                }
                scene.cameraShake(4, 500)
                game.showLongText(`you have taken ${Math.round(DAMAGEDONE)} damage`, DialogLayout.Bottom)
                if (0 < defenseBAR.value) {
                    game.showLongText("but your defense took the hit", DialogLayout.Bottom)
                    defenseBAR.value += 0 - DAMAGEDONE
                } else {
                    healthBAR.value += 0 - DAMAGEDONE
                }
                ENEMYENERGY_ += -1
            }
        } else if (Math.percentChance(50) || ENEMYHEALTH_ < RNG / 3.5 && (Math.percentChance(50) && Math.percentChance(50))) {
            if (0 < ENEMYENERGY_) {
                game.showLongText("enemy gained defense!", DialogLayout.Bottom)
                ENEMYENERGY_ += -1
                ENEMYHEALTH_ += 1
                ENEMY.value = ENEMYHEALTH_
                ENEMYENERGY.value = ENEMYENERGY_
            }
        }
    } else {
        if (TICK_ == 0) TICK_ = randint(2,5); game.showLongText("The enemy pauses, catching their breath...", DialogLayout.Bottom)
        if (TICK_ == 1) TICK_ = 0; ENEMYENERGY_ = 10;
        TICK_--
        return;
    }
}
function elite_summing() {
    if (Math.percentChance(15 + randint(0, 10))) {
        if (!(blockSettings.exists("m"))) {
            Achievements.showAchievement(
                "what is a summon?",
                "have a elite summon a enemy"
            )
            if (game.ask("help?")) {
                game.showLongText("try to do as much damage as possible. if you have strike+ use it instead of strike because you can take less damage. if you run out of energy use recover.", DialogLayout.Full)
            }
        }
        blockSettings.writeNumber("m", 1)
        music.stopAllSounds()
        music.play(music.stringPlayable("F E C D F D C E ", 120), music.PlaybackMode.UntilDone)
        game.showLongText("elite summoned. a enemy", DialogLayout.Bottom)
        ELITEENERGY = ENEMYENERGY_
        ELITEHEALTH = ENEMYHEALTH_
        // summon enemy waits till battle ends to continue elite battle
        summon()
        ENEMYENERGY.value = ELITEENERGY
        ENEMYHEALTH_ = ELITEHEALTH
        ENEMY.value = ENEMYHEALTH_
    }
}
function loadPLAYERbars() {
    healthBAR = statusbars.create(20, 4, StatusBarKind.Health)
    healthBAR.setColor(3, 2, 4)
    healthBAR.setLabel("HP")
    healthBAR.max = 10
    if (blockSettings.exists("hp")) {
        healthBAR.value = blockSettings.readNumber("hp")
    }
    energyBAR = statusbars.create(20, 4, StatusBarKind.Energy)
    energyBAR.setLabel("energy")
    energyBAR.max = 10
    energyBAR.y = 90
    defenseBAR = statusbars.create(20, 4, StatusBarKind.defense)
    defenseBAR.setColor(7, 2, 3)
    defenseBAR.setLabel("block")
    defenseBAR.value = 0
    defenseBAR.max = 10
    defenseBAR.y = 50
    if (blockSettings.exists("de")) {
        defenseBAR.value = blockSettings.readNumber("de")
    }
    if (blockSettings.exists("d")) {
        defense_ = true
    }
    if (blockSettings.exists("s")) {
        strike_ = true
    }
    if (blockSettings.exists("esc")) {
        escape_ = true
    }
}
statusbars.onZero(StatusBarKind.Health, function (status) {
    if (game.ask("restart from last point?")) {
        blockSettings.writeNumber("hp", 10)
        game.gameOver(false)
    } else {
        blockSettings.clear()
        game.setGameOverMessage(false, "you died")
        game.gameOver(false)
    }
})
function enemy() {
    music.stopAllSounds()
    music.play(music.stringPlayable("E D E F D C E A ", 120), music.PlaybackMode.LoopingInBackground)
    RNG = randint(2, 5)
    ENEMYHEALTH_ = RNG
    ENEMYENERGY_ = randint(2, 5)
    ENEMY = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    ENEMY.max = 5
    ENEMY.setLabel("enemy HP")
    ENEMY.value = ENEMYHEALTH_
    ENEMY.y = 35
    ENEMYENERGY = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    ENEMYENERGY.max = 5
    ENEMYENERGY.setLabel("enemy ENERGY")
    ENEMYENERGY.value = ENEMYENERGY_
    ENEMYENERGY.y = 20
    ENEMYENERGY.x = 60
    while (0 < ENEMYHEALTH_) {
        if (missedTURNS == 0) {
            game.showLongText("what do you do?", DialogLayout.Bottom)
            if (0 < energyBAR.value) {
                if (game.ask("strike")) {
                    ENEMYHEALTH_ += -1
                    scene.cameraShake(4, 500)
                    game.showLongText("you have done 1 damage", DialogLayout.Bottom)
                    energyBAR.value += -1
                    enemy_turn(25)
                } else if (strike_ && game.ask("strike+")) {
                    ENEMYHEALTH_ += -2
                    scene.cameraShake(4, 500)
                    game.showLongText("you have done 2 damage", DialogLayout.Bottom)
                    energyBAR.value += -2
                    enemy_turn(25)
                } else if (game.ask("DEF TO HP?")) {
                    energyBAR.value += -1
                    healthBAR.value += defenseBAR.value
                    defenseBAR.value = 0
                } else if (game.ask("defense")) {
                    defenseBAR.value += 1
                    energyBAR.value += -1
                    enemy_turn(25)
                } else if (defense_) {
                    if (game.ask("defense+")) {
                        defenseBAR.value += 2
                        energyBAR.value += -1
                        enemy_turn(1)
                    }
                }
            } else {
                game.showLongText("you ran out of energy!", DialogLayout.Bottom)
                game.showLongText("what do you do?", DialogLayout.Bottom)
                if (game.ask("run away?")) {
                    if (escape_) {
                        if (Math.percentChance(40)) {
                            music.stopAllSounds()
                            return
                        }
                    } else {
                        if (Math.percentChance(25)) {
                            music.stopAllSounds()
                            return
                        }
                    }
                } else if (game.ask("use recover")) {
                    music.stopAllSounds()
                    missedTURNS = 2
                    energyBAR.value = 2
                }
            }
        } else {
            missedTURNS += -1
            enemy_turn(1)
            pause(1000)
        }
        ENEMY.value = ENEMYHEALTH_
        ENEMYENERGY.value = ENEMYENERGY_
    }
    if (0 == ENEMYHEALTH_) {
        music.stopAllSounds()
        music.play(music.stringPlayable("B A B - A F C5 - ", 120), music.PlaybackMode.UntilDone)
        energyBAR.value = energyBAR.max
        healthBAR.value += 1
    }
    sprites.destroyAllSpritesOfKind(SpriteKind.StatusBar)
    loadPLAYERbars()
}
function elite() {
    if (!(blockSettings.exists("e"))) {
        Achievements.showAchievement(
            "my first elite!",
            "encounter your first elite"
        )
    }
    blockSettings.writeNumber("e", 1)
    music.play(music.stringPlayable("E D E F D C E A ", 120), music.PlaybackMode.LoopingInBackground)
    RNG = randint(5, 12)
    ENEMYHEALTH_ = RNG
    ENEMYENERGY_ = randint(3, 5)
    ENEMY = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    ENEMY.max = 12
    ENEMY.setLabel("elite HP")
    ENEMY.value = ENEMYHEALTH_
    ENEMY.y = 35
    ENEMYENERGY = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    ENEMYENERGY.max = 5
    ENEMYENERGY.setLabel("elite ENERGY")
    ENEMYENERGY.value = ENEMYENERGY_
    ENEMYENERGY.y = 20
    ENEMYENERGY.x = 60
    while (0 < ENEMYHEALTH_) {
        if (missedTURNS == 0) {
            game.showLongText("what do you do?", DialogLayout.Bottom)
            if (0 < energyBAR.value) {
                if (game.ask("strike")) {
                    ENEMYHEALTH_ += -1
                    scene.cameraShake(4, 500)
                    game.showLongText("you have done 1 damage", DialogLayout.Bottom)
                    energyBAR.value += -1
                    enemy_turn(25)
                } else if (strike_ && game.ask("strike+")) {
                    ENEMYHEALTH_ += -2
                    scene.cameraShake(4, 500)
                    game.showLongText("you have done 2 damage", DialogLayout.Bottom)
                    energyBAR.value += -2
                    enemy_turn(25)
                } else if (game.ask("DEF TO HP?")) {
                    energyBAR.value += -1
                    healthBAR.value += defenseBAR.value
                    defenseBAR.value = 0
                } else if (game.ask("defense")) {
                    defenseBAR.value += 1
                    energyBAR.value += -1
                    enemy_turn(25)
                } else if (defense_) {
                    if (game.ask("defense+")) {
                        defenseBAR.value += 2
                        energyBAR.value += -1
                        enemy_turn(25)
                    }
                }
            } else {
                game.showLongText("you ran out of energy!", DialogLayout.Bottom)
                game.showLongText("what do you do?", DialogLayout.Bottom)
                if (game.ask("run away?")) {
                    if (Math.percentChance(25)) {
                        sprites.destroyAllSpritesOfKind(SpriteKind.StatusBar)
                        Notification.notify("loading...", 5, img`
                            . . . . f f f . 
                            . . . f . f . f 
                            4 4 4 4 4 f . . 
                            4 . . . 4 f . . 
                            4 4 4 4 4 4 . . 
                            4 . . . . 4 . . 
                            4 . . . . 4 . . 
                            4 4 4 4 4 4 . . 
                            `)
                        loadPLAYERbars()
                        music.stopAllSounds()
                        return
                    }
                } else if (game.ask("use recover")) {
                    missedTURNS = 2
                    energyBAR.value = 2
                } else if (game.ask("use recover+")) {
                    missedTURNS = 4
                    energyBAR.value = 4
                }
            }
        } else {
            missedTURNS += -1
            enemy_turn(25)
            pause(500)
        }
    }
    if (0 == ENEMYHEALTH_) {
        music.stopAllSounds()
        music.play(music.stringPlayable("B A B - A F C5 - ", 120), music.PlaybackMode.UntilDone)
        energyBAR.value = energyBAR.max
        healthBAR.value += 1
    }
    sprites.destroyAllSpritesOfKind(SpriteKind.StatusBar)
    loadPLAYERbars()
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (game.ask("reset progress?")) {
        blockSettings.clear()
    }
})
function summon() {
    sprites.destroyAllSpritesOfKind(SpriteKind.StatusBar)
    loadPLAYERbars()
    if (Math.percentChance(50)) {
        RNG = randint(2, 4)
        ENEMYHEALTH_ = RNG
        ENEMYENERGY_ = randint(3, 5)
    } else {
        RNG = randint(1, 2)
        ENEMYHEALTH_ = RNG
        ENEMYENERGY_ = randint(1, 3)
    }
    ENEMY = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    ENEMY.max = 12
    ENEMY.setLabel("enemy HP")
    ENEMY.value = ENEMYHEALTH_
    ENEMY.y = 35
    ENEMYENERGY = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    ENEMYENERGY.max = 5
    ENEMYENERGY.setLabel("enemy ENERGY")
    ENEMYENERGY.value = ENEMYENERGY_
    ENEMYENERGY.y = 20
    ENEMYENERGY.x = 60
    while (0 < ENEMYHEALTH_) {
        if (missedTURNS == 0) {
            game.showLongText("what do you do?", DialogLayout.Bottom)
            if (0 < energyBAR.value) {
                if (game.ask("strike")) {
                    ENEMYHEALTH_ += -1
                    scene.cameraShake(4, 500)
                    game.showLongText("you have done 1 damage", DialogLayout.Bottom)
                    energyBAR.value += -1
                    enemy_turn(25)
                } else if (strike_ && game.ask("strike+")) {
                    ENEMYHEALTH_ += -2
                    scene.cameraShake(4, 500)
                    game.showLongText("you have done 2 damage", DialogLayout.Bottom)
                    energyBAR.value += -2
                    enemy_turn(25)
                } else if (game.ask("DEF TO HP?")) {
                    energyBAR.value += -1
                    healthBAR.value += defenseBAR.value
                    defenseBAR.value = 0
                } else if (game.ask("defense")) {
                    defenseBAR.value += 1
                    energyBAR.value += -1
                    enemy_turn(25)
                } else if (defense_) {
                    if (game.ask("defense+")) {
                        defenseBAR.value += 2
                        energyBAR.value += -1
                        enemy_turn(1)
                    }
                }
            } else {
                game.showLongText("you ran out of energy!", DialogLayout.Bottom)
                game.showLongText("what do you do?", DialogLayout.Bottom)
                if (game.ask("run away?")) {
                    if (Math.percentChance(25)) {
                        music.stopAllSounds()
                        return
                    }
                } else if (game.ask("use recover")) {
                    music.stopAllSounds()
                    missedTURNS = 2
                    energyBAR.value = 2
                }
            }
        } else {
            missedTURNS += -1
            enemy_turn(1)
            pause(1000)
        }
    }
    if (0 == ENEMYHEALTH_) {
        music.stopAllSounds()
        music.play(music.stringPlayable("B A B - A F C5 - ", 120), music.PlaybackMode.UntilDone)
        energyBAR.value = energyBAR.max
        healthBAR.value += 1
    }
    sprites.destroyAllSpritesOfKind(SpriteKind.StatusBar)
    loadPLAYERbars()
}
function audio_test() {
    game.showLongText("you will hear a ba-dong sound in this audio test", DialogLayout.Full)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    game.showLongText("did you hear the sound? you should have.", DialogLayout.Bottom)
    if (game.ask("change volume")) {
        music.setVolume(game.askForNumber("volume", 3))
    }
    if (game.ask("redo?")) {
        audio_test()
    }
}
const enemyGroups = [
    "The Rusty Blade Gang",
    "Thorn-in-Your-Side Squad",
    "The Midnight Muggers",
    "Bog-Bottom Brawlers",
    "The Grumpy Goblin Union",
    "Shadow-Cloak Collective",
    "The Screaming Pickles",
    "Bone-Rattle Battalion",
    "The Mismatched Mercenaries",
    "The Over-Caffeinated Raiders",
    "Mossbeard's Misfits",
    "The Pocket Sand Posse",
    "Emberfang Pack",
    "The \"Totally Not Lost\" Crew",
    "Cursed Coin Cartel",
    "The Last-Minute Minions",
    // New additions below
    "Ironfang Brotherhood",
    "Mudfang Marauders",
    "Stormclaw Syndicate",
    "Blistertoe Bandits",
    "The Laughing Skulls",
    "Ashfang Assembly",
    "The Crooked Dagger Crew",
    "Hollow-Eye Horde",
    "The Soot-Stained Savages",
    "Blackthorn Brotherhood",
    "The Wailing Wraiths",
    "Rustfang Rebels",
    "The Broken Shield Brigade",
    "Vine-Creep Vultures",
    "The Cracked Helm Clan",
    "The Mossy Maw Mob",
    "The Splintered Spear Squad",
    "Bloodroot Brawlers",
    "The Crimson Coin Cabal",
    "The Sun-Scorched Scavengers",
    "The Gravelgut Gang",
    "The Daggerleaf Division",
    "The Feral Fang Fellowship",
    "Gloomshade Gang",
    "The Splatterfang Swarm",
    "The Cobweb Crew",
    "The Blight-Born Battalion",
    "The Filthy Flask Fellowship",
    "The Poisonpetal Posse",
    "The Goldfang Grinners",
    "The Rotten Rope Raiders",
    "The Ember-Eye Enclave",
    "The Swamp Spite Squad",
    "The Grinning Graveborn",
    "The Shattered Sword Syndicate",
    "The Fang-and-Fury Faction",
    "The Noisy Nightstalkers",
    "The Snarltooth Swarm",
    "The Chainlink Chokers",
    "The Puddlefoot Patrol",
    "The Crooked Crown Collective"
]

let missedTURNS = 0
let ELITEHEALTH = 0
let ELITEENERGY = 0
let ENEMYENERGY: StatusBarSprite = null
let ENEMY: StatusBarSprite = null
let DAMAGEDONE = 0
let ENEMYENERGY_ = 0
let RNG = 0
let ENEMYHEALTH_ = 0
let escape_ = false
let defenseBAR: StatusBarSprite = null
let energyBAR: StatusBarSprite = null
let healthBAR: StatusBarSprite = null
let defense_ = false
let strike_ = false
let clock = false
let does = false
music.setVolume(255)
if (game.ask("audio test?")) {
    audio_test()
}
clock = true
Notification.notify("loading...", 10, img`
    . . . . f f f .
    . . . f . f . f
    4 4 4 4 4 f . .
    4 . . . 4 f . .
    4 4 4 4 4 4 . .
    4 . . . . 4 . .
    4 . . . . 4 . .
    4 4 4 4 4 4 . .
`)
loadPLAYERbars()
if (!(strike_)) {
    savegame_state()
    pause(500)
    savegame_state()
    enemy()
    Achievements.showAchievement(
        "my first enemey!",
        "defate your first enemy",
        30
    )
    blockSettings.writeNumber("h", 0)
}
forever(function () {
    pause(100)
    encounter()
    savegame_state()
    Notification.notify("game saved!", 15, img`
        . . . . . . f .
        . . . . f . f .
        4 4 4 4 4 f f f
        4 . . . 4 . . .
        4 4 4 4 4 4 . .
        4 . . . . 4 . .
        4 . . . . 4 . .
        4 4 4 4 4 4 . .
    `)
    pause(200)
})
