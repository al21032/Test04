var object = document.querySelector('.object');
var objects = document.querySelectorAll('.object');
var originalTop = objects[0].offsetTop - 8;
var isMoved = false;

object.addEventListener('click', function(){
    selectTile(this);
});

// objectCountだけ牌を生成してcontainerに並べる．
var container = document.getElementById('container');
var objectCount = 12;

for(var i = 0; i < objectCount; i++){
    var object = document.createElement('div');
    object.className = 'object';
    container.appendChild(object);

    object.addEventListener('click', function(){
        selectTile(this);
    });
}

function selectTile(object){
    // 牌が選択済みの場合isMoved==true
    if(isMoved){
        object.style.top = (originalTop) + 'px';
        isMoved = false;
    } else{
        object.style.top = (originalTop - 50) + 'px';
        isMoved = true;
    }
}