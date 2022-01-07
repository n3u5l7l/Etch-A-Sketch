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

drawingpad.appendChild(wholeBox);
const buttons = document.createElement("button");
drawingpad.appendChild(buttons);
buttons.textContent="ERASE";
drawingpad.setAttribute("style", "display:flex; justify-content:center;");
buttons.style.alignSelf="flex-start";

wholecontainer.setAttribute("style", "display:flex; flex-direction:column;");
wholeBox.setAttribute("style", "display:flex; flex-direction:column; -webkit-box-shadow: 0 0 10px #888888;");
const wholeBoxWidth = 600;
const wholeBoxHeight = 600;
wholeBox.style.width=`${wholeBoxWidth}px`;
wholeBox.style.height= `${wholeBoxHeight}px`;
//wholeBox.style.maxHeight="500px";
bodys.appendChild(wholecontainer);

function colors(e)
{
    this.style.backgroundColor="black";
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
        boxes.addEventListener('mousemove', colors);
        boxcontainer.appendChild(boxes);
    }
    boxcontainer.style.minWidth="0";
    wholeBox.appendChild(boxcontainer);
}

function erased(e)
{
    const cleanbox = document.querySelectorAll(".drawingbox div");
    cleanbox.forEach(boxes=>boxes.style.backgroundColor="white");

}
buttons.addEventListener("click", erased);
