"use strict";
let carrotSound = new Audio("sound/carrot_pull.mp3");
const ITEM_SIZE = 80;

export default class Field{
    constructor(carrotCount,bugCount)
    {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector(".game__field");
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener("click",this.onClick)
    }

    setClickListener(onItemClick)
    {
        this.onItemClick = onItemClick;
    }

    init() 
    {
        this.field.innerHTML = '';
        this._addItem("carrot",this.carrotCount,"img/carrot.png");
        this._addItem("bug",this.bugCount,"img/bug.png");
    }

    _addItem(itemName, count, imgPath) 
    {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width-ITEM_SIZE;
        const y2 = this.fieldRect.height-ITEM_SIZE; 
        for(let id = 0; id < count; id++) 
        {
            const item = document.createElement("img");
            item.setAttribute("class",itemName);
            item.setAttribute("data-name",itemName);
            item.setAttribute("data-id",id);
            item.setAttribute("src",imgPath);

            item.style.position = "absolute";
            const x = randomNumber(x1,x2);
            const y = randomNumber(y1,y2);
            item.style.top = `${y}px`;
            item.style.left = `${x}px`;

            this.field.appendChild(item);
        }
    }

    onClick = (event) =>
    {
        const targetName = event.target.dataset.name
        const targetID = event.target.dataset.id;
        if(targetName === "carrot")
        {
            const tobeDeleted = document.querySelector(`.carrot[data-id="${targetID}"]`);
            let respond = this.onItemClick && this.onItemClick("carrot");
            if(respond)
            {
                tobeDeleted.remove();
            }
        }
        else if(targetName === "bug")
        {
            this.onItemClick && this.onItemClick("bug");
        }
    }

}

function randomNumber(min,max)
{
    return Math.floor(Math.random() * (max-min) + min);
}
