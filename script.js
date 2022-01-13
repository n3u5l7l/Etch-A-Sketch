const bodys = document.querySelector("body");
bodys.style.minWidth="100vh";
bodys.style.minHeight="100vh";
bodys.style.margin="0";
bodys.style.padding="0";
bodys.style.display="flex";

const wholecontainer = document.createElement("div");
bodys.appendChild(wholecontainer);
const wholeBox = document.createElement("div");
const titles = document.createElement("h1");
const drawingpad = document.createElement("div"); 
const footer = document.createElement("div");
const slide = document.createElement("input");

slide.setAttribute("type", "range");
slide.setAttribute("min", "1");
slide.setAttribute("max", "32");
slide.setAttribute("value", "16");
slide.classList.add("slider");
slide.setAttribute("class", "slideclass");
slide.setAttribute("style", " color: black;-webkit-appearance: none; margin-left:110px; width: 50%; height: 7px; background: #d3d3d3; transition: opacity .2s; -webkit-transition: .2s; opacity: 0.7; outline: none;");
slide.setAttribute("onmouseover", "opacity:1s;");

/* 
drawingpad is a container that can be used to add things left/right
side of the drawing box
wholeBox is the flex container that include the whole drawing
grid
*/

titles.textContent = "Etch-A-Sketch";
titles.setAttribute("style", "display:flex; justify-content:center; margin-left:340px;")

wholecontainer.appendChild(titles);
wholecontainer.appendChild(drawingpad);
wholecontainer.appendChild(footer);
wholecontainer.setAttribute("style", "display:flex; flex-direction:column;");
wholecontainer.style.width="100%";
wholecontainer.style.minHeight="100%";


const buttons = document.createElement("div");
drawingpad.appendChild(buttons);

const drawingplusslide = document.createElement("div");
drawingpad.appendChild(drawingplusslide);
drawingplusslide.style.width="35%";
drawingplusslide.style.display="flex";
drawingplusslide.style.flexDirection="column";
drawingplusslide.appendChild(wholeBox);
const containingslide = document.createElement("div");
drawingplusslide.appendChild(containingslide);
containingslide.style.width="100%";
containingslide.appendChild(slide);
const slidenumber = document.createElement("div");
containingslide.appendChild(slidenumber);
slidenumber.setAttribute("class", "slideoutput");
slidenumber.style.textAlign="center";
drawingpad.setAttribute("style", "display:flex; justify-content:center;");
drawingpad.style.height=`${80}%`;

buttons.style.display="flex";
buttons.style.flexDirection="column";
buttons.style.gap="50px";

const clearButton = document.createElement("button");
clearButton.textContent="CLEAR";
buttons.appendChild(clearButton);
const darkButton = document.createElement("button");
darkButton.textContent="Dark";
buttons.appendChild(darkButton);
const rainbow = document.createElement("button");
rainbow.textContent="Rainbow";
buttons.appendChild(rainbow);
const lighten = document.createElement("button");
lighten.textContent="Light to Dark";
buttons.appendChild(lighten);
const eraser = document.createElement("button");
eraser.textContent="Eraser";
buttons.appendChild(eraser);
const colorchoice = document.createElement("input");
colorchoice.type="color";
buttons.appendChild(colorchoice);

buttons.style.marginRight="250px";

wholeBox.setAttribute("style", "display:flex; flex-direction:column; -webkit-box-shadow: 0 0 10px #888888;");
wholeBox.style.width="100%";
wholeBox.style.height= "100%";
wholeBox.style.marginBottom="10px";
wholeBox.draggable=false;

const slider = document.querySelector(".slideclass");
const gridSize = document.querySelector(".slideoutput");
let userGrid = slider.value;
gridSize.innerHTML = slider.value + ' x ' + slider.value;
for (let i = 0; i < userGrid; i++)
{
    const boxcontainer = document.createElement("div");
    boxcontainer.classList.add("drawingbox");
    boxcontainer.setAttribute("style", "display:flex;");
    boxcontainer.style.height=`${(wholeBox.clientHeight/userGrid)}px`;
    boxcontainer.style.width=`${(wholeBox.cilentWidth)}px`;
    boxcontainer.style.alignItems="flex-start";
    for (let j = 0; j < userGrid; j++)
    {
        const boxes = document.createElement("div");
        boxes.style.width=`${wholeBox.clientWidth/userGrid}px`;
        boxes.style.height=`${(wholeBox.clientHeight/userGrid)}px`;
        boxes.style.backgroundColor="rgb(255,255,255)";
        boxes.style.userSelect="none";
        boxcontainer.appendChild(boxes);
    }
    
    wholeBox.appendChild(boxcontainer);
}

slider.oninput = function() {
    console.log(userGrid);
    gridSize.innerHTML = this.value + ' x ' + this.value;
    userGrid = this.value;
    const removeChilds = (parent) => {
        while (parent.lastChild) {
            while (parent.lastChild.lastChild)
            {
                parent.lastChild.removeChild(parent.lastChild.lastChild);
            }
            parent.removeChild(parent.lastChild);
        }
    };
    removeChilds(wholeBox);
    for (let i = 0; i < userGrid; i++)
    {
        const boxcontainer = document.createElement("div");
        boxcontainer.classList.add("drawingbox");
        boxcontainer.setAttribute("style", "display:flex;");
        boxcontainer.style.height=`${(wholeBox.clientHeight/userGrid)}px`;
        boxcontainer.style.width=`${(wholeBox.cilentWidth)}px`;
        boxcontainer.style.alignItems="flex-start";
        for (let j = 0; j < userGrid; j++)
        {
            const boxes = document.createElement("div");
            boxes.style.width=`${wholeBox.clientWidth/userGrid}px`;
            boxes.style.height=`${(wholeBox.clientHeight/userGrid)}px`;
            boxes.style.backgroundColor="rgb(255,255,255)";
            //boxes.draggable=false;
            boxes.style.userSelect="none";
            /*
                I used userSelect here rather than draggable because draggable 
                only prevents an element from being dragged, so you can still
                select the element, which is what caused unavailable mouse icon
                that prevented users from drawing when clicked the mouse button
                very fast since it kept selecting the grid boxes and is "attemp-
                ting" to drag something unavailable I think since you can still
                select the boxes. So I just prevented user from even able to
                select stuff in the first place.
            */
            boxcontainer.appendChild(boxes);
        }
        
        wholeBox.appendChild(boxcontainer);
    }
}

function erased(e)
{
    const cleanbox = document.querySelectorAll(".drawingbox div");
    cleanbox.forEach(boxes=>boxes.style.backgroundColor="rgb(255,255,255)");
    cleanbox.forEach(boxes=>boxes.replaceWith(boxes.cloneNode(true))); 
    //the cloneNode did a deep copy of all the boxes and the attribute within it except for eventListeners. So you
    //basically deleted all the eventListeners

}
function darkColor(e)
{
    if(e.buttons === 1 || e.buttons === 3)
    {
        this.style.backgroundColor="rgb(0,0,0)";
    }
}
function colors(e)
{
    const cleanboxes = document.querySelectorAll(".drawingbox div");
    /*One way to remove listerners, more tedious
    cleanbox.forEach(boxes=>boxes.removeEventListener("mousemove", lightendark));
    cleanbox.forEach(boxes=>boxes.removeEventListener("mousemove", rainbows));*/
    cleanboxes.forEach(boxes=>boxes.replaceWith(boxes.cloneNode(true)));  //other way, 
    const cleanbox = document.querySelectorAll(".drawingbox div");
    cleanbox.forEach(boxes=>boxes.addEventListener("mousemove", darkColor));
}
function rainbows(e)
{
    if(e.buttons === 1 || e.buttons === 3)
    {
        this.style.backgroundColor= `rgb(${Math.floor(Math.random() * 1000)%256}, ${Math.floor(Math.random() * 1000)%256}, ${Math.floor(Math.random() * 1000)%256})`;
    }
}
function rainbowcolor(e)
{
    const cleanboxes = document.querySelectorAll(".drawingbox div");
    cleanboxes.forEach(boxes=>boxes.replaceWith(boxes.cloneNode(true))); 
    const cleanbox = document.querySelectorAll(".drawingbox div");
    cleanbox.forEach(boxes=>boxes.addEventListener("mousemove", rainbows));

}

function lightendark(e)
{
    if(e.buttons === 1 || e.buttons === 3)
    {
        let backgroundchange = this.style.backgroundColor;
        let updatecolor = backgroundchange.substring(4, backgroundchange.length-1).replace(/ /g, '').split(',');
        let r = updatecolor[0];
        let b = updatecolor[1];
        let g = updatecolor[2];
        this.style.backgroundColor= `rgb(${r-25.5},${b-25.5},${g-25.5})`;
    }
}
function lightens(e)
{
    const cleanboxes = document.querySelectorAll(".drawingbox div");
    cleanboxes.forEach(boxes=>boxes.replaceWith(boxes.cloneNode(true))); 
    const cleanbox = document.querySelectorAll(".drawingbox div");
    cleanbox.forEach(boxes=>boxes.addEventListener("mousemove", lightendark));
}

function erasethings(e)
{
    if (e.buttons===1 || e.buttons===3)
    {
        this.style.backgroundColor="rgb(255,255,255)";
    }
}
function erasing(e)
{
    const cleanboxes = document.querySelectorAll(".drawingbox div");
    cleanboxes.forEach(boxes=>boxes.replaceWith(boxes.cloneNode(true)));
    const cleanbox = document.querySelectorAll(".drawingbox div");
    cleanbox.forEach(boxes=>boxes.addEventListener("mousemove", erasethings));
}

function coloringwithcolors(e)
{
    if (e.buttons===1 || e.buttons===3)
    {
        this.style.backgroundColor=`${colorchoice.value}`;
    }
}
function coloring(e)
{
    const cleanboxes = document.querySelectorAll(".drawingbox div");
    cleanboxes.forEach(boxes=>boxes.replaceWith(boxes.cloneNode(true))); 
    const cleanbox = document.querySelectorAll(".drawingbox div");
    cleanbox.forEach(boxes=>boxes.addEventListener("mousemove", coloringwithcolors));
}

clearButton.addEventListener("click", erased);

darkButton.addEventListener("click", colors);

rainbow.addEventListener("click", rainbowcolor);

lighten.addEventListener("click", lightens);

eraser.addEventListener("click", erasing);

colorchoice.addEventListener("input", coloring);


