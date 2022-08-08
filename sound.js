"use strict";
let carrotSound = new Audio("sound/carrot_pull.mp3");
let bugSound = new Audio("sound/bug_pull.mp3");
let gameWinSound = new Audio("sound/game_win.mp3");
let bgSound = new Audio("sound/bg.mp3");
let alertSound = new Audio("sound/alert.wav");

export function playCarrot()
{
    playSound(carrotSound);
}

export function playBug()
{
    playSound(bugSound);
}

export function playAlert()
{
    playSound(alertSound);
}

export function playBackground()
{
    playSound(bgSound);
}

export function resumeBackground()
{
    resumeSound(bgSound);
}

export function stopBackground()
{
    stopSound(bgSound);
}

export function playWin()
{
    playSound(gameWinSound);
}

function playSound(sound)
{
    sound.currentTime = 0;
    sound.play();
}

function resumeSound(sound)
{
    sound.play();
}

function stopSound(sound)
{
    sound.pause();
}
