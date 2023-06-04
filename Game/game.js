var object = document.getElementById("object");
var leftPos = 0;
var topPos = 0;

object.addEventListener("click", function(){
    leftPos += 100;
    topPos += 100;
    object.style.left = leftPos + "px";
    object.style.top = topPos + "px";
});
