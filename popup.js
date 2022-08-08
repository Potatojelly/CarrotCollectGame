"use strict";

export default class PopUp {
    constructor() 
    {
        this.popUp = document.querySelector(".pop-up");
        this.popUpRefreshBtn = document.querySelector(".pop-up__refresh");
        this.popUpMessage = document.querySelector(".pop-up__message");
        this.popUpResumeBtn = document.querySelector(".pop-up__resume");
        this.popUpRefreshBtn.addEventListener("click",() => {
            this.refreshClick && this.refreshClick();
            this.refreshHide();
            this.hide();
        });
        this.popUpResumeBtn.addEventListener("click",() => {
            this.resumeClick && this.resumeClick();
            this.resumeHide();
            this.hide();
        })
    }

    setRefreshListener(refreshClick) 
    {   
        this.refreshClick = refreshClick;
    }

    setResumeListener(resumeClick)
    {
        this.resumeClick = resumeClick;
    }

    showWithText = (text) =>
    {
        this.popUp.classList.remove("pop-up--hide");
        if(text === "YOU WON" || text === "YOU LOST")
        {
            this.popUpRefreshBtn.classList.remove("refresh--hide");
        }
        else 
        {
            this.popUpResumeBtn.classList.remove("resume--hide");
        }
        this.popUpMessage.innerHTML =`${text}`;
    }

    hide()
    {
        this.popUp.classList.add("pop-up--hide");
    }

    refreshHide() 
    {
        this.popUpRefreshBtn.classList.add("refresh--hide");
    }

    resumeHide() 
    {
        this.popUpResumeBtn.classList.add("resume--hide");
    }

};
