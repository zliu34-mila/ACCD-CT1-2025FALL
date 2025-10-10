let cBox = document.getElementById("colorBox");
let colorBtn= document.getElementById("changeColor")
let imgBox = document.getElementById("schImage")
let imgBtn = document.getElementById("changeImage")

let assignRandomColor = function()
{
    let rComp = 255 * Math.random()
    let gComp = 255 * Math.random()
    let bComp = 255 * Math.random()
    cBox.style.backgroundColor = "rgb(" + rComp + ", " + gComp + ", " + bComp + ")"
}


const changeImage = () =>
{
    console.log(imgBox.src)
    if(imgBox.src.includes("schnazuar1"))
    {
        imgBox.src = "image/schnazuar2.jpg"
    }
    else
    {
        imgBox.src = "image/schnazuar1.jpeg"
    }
}



imgBtn.addEventListener("click", changeImage)
colorBtn.addEventListener("click", assignRandomColor)