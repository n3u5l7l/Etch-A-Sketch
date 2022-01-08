const bodys = document.querySelector("body");
const wholecontainer = document.createElement("div");
const wholeBox = document.createElement("div");
const titles = document.createElement("h1");
const drawingpad = document.createElement("div"); 
/* 
drawingpad is a container that can be used to add things left/right
side of the drawing box

wholeBox is the flex container that include erase and the whole drawing
grid
*/

titles.textContent = "Etch-A-SKetch";
titles.setAttribute("style", "display:flex; justify-content:center;")

wholecontainer.appendChild(titles);
wholecontainer.appendChild(drawingpad);

const buttons = document.createElement("div");
drawingpad.appendChild(buttons);
drawingpad.appendChild(wholeBox);

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

drawingpad.setAttribute("style", "display:flex; justify-content:center;");
buttons.style.display="flex";
buttons.style.flexDirection="column";


wholecontainer.setAttribute("style", "display:flex; flex-direction:column;");
wholeBox.setAttribute("style", "display:flex; flex-direction:column; -webkit-box-shadow: 0 0 10px #888888;");
const wholeBoxWidth = 600;
const wholeBoxHeight = 600;
wholeBox.style.width=`${wholeBoxWidth}px`;
wholeBox.style.height= `${wholeBoxHeight}px`;


bodys.appendChild(wholecontainer);

function darkColor(e)
{
    if(e.buttons === 1 || e.buttons === 3)
    {
        this.style.backgroundColor="rgb(0,0,0)";
    }
}
function colors(e)
{
    const cleanbox = document.querySelectorAll(".drawingbox div");
    cleanbox.forEach(boxes=>boxes.removeEventListener("mousemove", lightendark));
    cleanbox.forEach(boxes=>boxes.removeEventListener("mousemove", rainbows));
    cleanbox.forEach(boxes=>boxes.addEventListener("mousemove", darkColor));
}

const userGrid = parseInt(prompt("Grid Size? "));
for (let i = 0; i < userGrid; i++)
{
    const boxcontainer = document.createElement("div");
    boxcontainer.classList.add("drawingbox");
    boxcontainer.setAttribute("style", "display:flex;");
    boxcontainer.style.alignItems="flex-start";
    boxcontainer.style.whiteSpace="pre";
    for (let j = 0; j < userGrid; j++)
    {
        const boxes = document.createElement("div");
        boxes.style.width=`${wholeBoxWidth/userGrid}px`;
        boxes.style.height=`${(wholeBoxHeight/userGrid)}px`;
        boxes.style.backgroundColor="rgb(255,255,255)";
        //boxes.addEventListener('mousemove', colors);
        boxcontainer.appendChild(boxes);
    }
    boxcontainer.style.minWidth="0";
    wholeBox.appendChild(boxcontainer);
}

function erased(e)
{
    const cleanbox = document.querySelectorAll(".drawingbox div");
    cleanbox.forEach(boxes=>boxes.style.backgroundColor="rgb(255,255,255)");
    cleanbox.forEach(boxes=>boxes.replaceWith(boxes.cloneNode(true)));

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
    const cleanbox = document.querySelectorAll(".drawingbox div");
    cleanbox.forEach(boxes=>boxes.removeEventListener("mousemove", lightendark));
    cleanbox.forEach(boxes=>boxes.removeEventListener("mousemove", darkColor));
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
    const cleanbox = document.querySelectorAll(".drawingbox div");
    cleanbox.forEach(boxes=>boxes.removeEventListener("mousemove", rainbows));
    cleanbox.forEach(boxes=>boxes.removeEventListener("mousemove", darkColor));
    cleanbox.forEach(boxes=>boxes.addEventListener("mousemove", lightendark));
}

clearButton.addEventListener("click", erased);

darkButton.addEventListener("click", colors);

rainbow.addEventListener("click", rainbowcolor);

lighten.addEventListener("click", lightens);


