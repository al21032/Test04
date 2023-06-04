var object = document.querySelector('.object');
var originalTop = object.offsetTop;
var isMoved = false;

object.addEventListener('click', function(){
    if(isMoved){
        object.style.top = originalTop + 'px';
        isMoved = false;
    } else{
        object.style.top = (originalTop - 50) + 'px';
        isMoved = true;
    }
});
