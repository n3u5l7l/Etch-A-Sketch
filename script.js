const bodys = document.querySelector("body");
const wholecontainer = document.createElement("div");
const wholeBox = document.createElement("div");
const titles = document.createElement("h1");
const drawingpad = document.createElement("div");

titles.textContent = "Etch-A-SKetch";
titles.setAttribute("style", "display:flex; justify-content:center;")

wholecontainer.appendChild(titles);
wholecontainer.appendChild(drawingpad);

drawingpad.appendChild(wholeBox);
const buttons = document.createElement("button");
wholeBox.appendChild(buttons);
buttons.textContent="ERASE";
drawingpad.setAttribute("style", "display:flex; justify-content:center;");

wholecontainer.setAttribute("style", "display:flex; flex-direction:column;");

wholeBox.setAttribute("style", "display:flex; flex-direction:column; -webkit-box-shadow: 0 0 10px #888888");

bodys.appendChild(wholecontainer);

function colors(e)
{
    this.setAttribute("style", "padding:10px; background-color:black;");
}

for (let i = 0; i < 16; i++)
{
    const boxcontainer = document.createElement("div");
    boxcontainer.classList.add("drawingbox");
    boxcontainer.setAttribute("style", "display:flex;");
    for (let j = 0; j < 16; j++)
    {
        const boxes = document.createElement("div");
        boxes.setAttribute("style", "padding:10px;")
        boxes.addEventListener('mousemove', colors);
        boxcontainer.appendChild(boxes);
    }
    wholeBox.appendChild(boxcontainer);
}

function erased(e)
{
    const cleanbox = document.querySelectorAll(".drawingbox div");
    cleanbox.forEach(boxes=>boxes.setAttribute("style", "padding:10px;"));

}
buttons.addEventListener("click", erased);
