"use strict";
import Field from "./field.js";
import * as sound from "./sound.js";

const Reason = Object.freeze(
{
    win : "win",
    lose : "lose",
    cancel : "cancel",
});

export default class GameBuilder
{
    gameDuration(duration)
    {
        this.gameDuration = duration;
        return this;
    }

    carrotCount(carrotCount)
    {
        this.carrotCount = carrotCount;
        return this;
    }

    bugCount(bugCount)
    {
        this.bugCount = bugCount;
        return this;
    }

    build()
    {
        return new Game(this.carrotCount,this.bugCount,this.gameDuration);
    }
}

class Game{
    constructor(carrotCount,bugCount,gameDuration)
    {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.gameDuration = gameDuration;
        this.started = false;
        this.score = this.carrotCount;
        this.timer = undefined;
        this.remainingTimeSec = undefined;
        this.gameBtn = document.querySelector(".game__button");
        this.gameBtn.addEventListener("click",()=>{
            if(this.started)
            {
                this.stop(Reason.cancel);
            }
            else
            {
                this.start();
            }
        });
        this.gameTimer = document.querySelector(".game__timer");
        this.gameScore = document.querySelector(".game__score");
        this.gameField = new Field(carrotCount,bugCount);
        this.gameField.setClickListener(this.onFieldClick); //callback binding
    }

    setGameStopListener(onGameStop)
    {
        this.onGameStop = onGameStop;
    }

    initGame() 
    {
        this.gameField.init();
        this.score = this.carrotCount;
        this.timer = undefined;
        this.updateScore(this.score);
    }

    start()
    {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showGameButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
    }

    resume()
    {
        this.started = true;
        this.showStopButton();
        this.showGameButton();
        this.resumeGameTimer();
        sound.resumeBackground();
    }
    
    stop(reason)
    {
        this.started = false;
        sound.stopBackground();
        this.stopGameTimer();
        this.showPlayButton();
        this.hideGameButton();
        switch(reason)
        {
            case Reason.win:
                sound.playWin();
                this.onGameStop && this.onGameStop("YOU WON");
                break;
            case Reason.lose:
                sound.playBug();
                this.onGameStop && this.onGameStop("YOU LOST");
                break;       
            case Reason.cancel:
                sound.playAlert();
                this.onGameStop && this.onGameStop("Resume?");
                break;         
        }
    }

     // GameButton
    showPlayButton() 
    {
        const icon = this.gameBtn.querySelector(".fa-stop");
        icon.classList.add("fa-play");
        icon.classList.remove("fa-stop");
    }    

    showStopButton() 
    {
        const icon = this.gameBtn.querySelector(".fa-play");
        icon.classList.add("fa-stop");
        icon.classList.remove("fa-play");
    }    

    showGameButton() 
    {
        const icon = this.gameBtn.querySelector(".fa-stop");
        this.gameBtn.style.visibility = "visible";
        this.gameBtn.style.disabled = "false";
    }
    
    hideGameButton()
    {
        this.gameBtn.style.visibility = "hidden";
        this.gameBtn.style.disabled = "diasabled";
    }
    
    // Timer and Score
    showTimerAndScore() 
    {
        this.gameTimer.style.visibility = "visible";
        this.gameScore.style.visibility = "visible";
    }

    updateScore(currentScore)
    {
        this.gameScore.innerHTML = `${currentScore}`;
    }

    startGameTimer()
    {
        this.remainingTimeSec = this.gameDuration;
        this.updateTimerText(this.remainingTimeSec);
        this.timer = setInterval(()=>{
            if(this.remainingTimeSec<=0)
            {
                this.stopGameTimer();
                return;
            }
            this.updateTimerText(--this.remainingTimeSec);
        },1000);
    }

    resumeGameTimer()
    {
        this.updateTimerText(this.remainingTimeSec);
        this.timer = setInterval(()=>{
            if(this.remainingTimeSec<=0)
            {
                this.stopGameTimer();
                return;
            }
            this.updateTimerText(--this.remainingTimeSec);
        },1000);
    }

    stopGameTimer()
    {
        clearInterval(this.timer);
    }

    updateTimerText(remainingTimeSec)
    {
        if(remainingTimeSec === 0)
        {
            sound.playBug();
            this.stop(Reason.lose);
        }
    
        const min = parseInt(remainingTimeSec/60);
        const sec = remainingTimeSec%60;
        this.gameTimer.innerHTML = `
            ${min}:${sec}
        `;
    }

    // Field
    onFieldClick = (item)=> 
    {
        if(!this.started)
        {
            return false;
        }
        if(item === "carrot")
        {
            sound.playCarrot();
            this.updateScore(--this.score);
            if(this.score === 0)
            {
                sound.playWin();
                this.stop(Reason.win);
            }
        }
        else if(item === "bug")
        {
            sound.playBug();
            this.stop(Reason.lose);
        }
        return true;
    }    
}