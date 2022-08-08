"use strict";
import PopUp from "./popup.js";
import Game from './game.js';
import GameBuilder from './game.js';

const CARROT_COUNT = 3;
const BUG_COUNT = 3;
const GAME_DURATION_SEC = 3;

const game = new GameBuilder()
.carrotCount(CARROT_COUNT)
.bugCount(BUG_COUNT)
.gameDuration(GAME_DURATION_SEC)
.build();

const gameFinishBanner = new PopUp();

game.setGameStopListener(gameFinishBanner.showWithText);
gameFinishBanner.setRefreshListener(() => {
    game.start();
});
gameFinishBanner.setResumeListener(() => {
    game.resume();
});



