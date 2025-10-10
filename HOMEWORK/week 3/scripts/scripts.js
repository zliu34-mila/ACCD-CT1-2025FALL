// let gB1 = document.getElementById("galleryBniu1")
// let gB2 = document.getElementById("galleryBniu2")
// let gB3 = document.getElementById("galleryBniu3")
// let gB4 = document.getElementById("galleryBniu4")
let thumbImages = document.querySelectorAll(".booniu-box > img")
console.log(thumbImages)
let scImage = document.getElementById("showcaseImage")
let arrowRight = document.querySelector(".showcase-arrow-right")
let arrowLeft = document.querySelector(".showcase-arrow-left")

let currentIndexThumb = 0

function changeImage(_Image){
    let tumbSrc = _Image.src
    scImage.src = tumbSrc

    thumbImages.forEach(function(element){
        element.parentElement.classList.remove("current-thumb")
    })

    // something.parentElement.classList.remove("current-thumb")

    _Image.parentElement.classList.add("current-thumb")
    currentIndexThumb = Array.from(thumbImages).indexOf(_Image)
}
for(let i = 0; i < thumbImages.length; i++){
    thumbImages[i].addEventListener("click", function(event){
        changeImage(event.target)
    })
}

arrowRight.addEventListener("click", function(){
    currentIndexThumb++
    if(currentIndexThumb >= thumbImages.length) {
        currentIndexThumb = 0
    }
    changeImage(thumbImages[currentIndexThumb])
})
arrowLeft.addEventListener("click", function(){
    currentIndexThumb--
    if(currentIndexThumb < 0){
        currentIndexThumb = thumbImages.length - 1
    }
    changeImage(thumbImages[currentIndexThumb])
})
// gB1.addEventListener("click", changeImage)
// gB2.addEventListener("click", changeImage)
// gB3.addEventListener("click", changeImage)
// gB4.addEventListener("click", changeImage)