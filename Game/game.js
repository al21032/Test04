//var object = document.querySelector('.object');
var objects = document.querySelectorAll('.object');
var originalTop = objects[0].offsetTop - 8;
var isMoved = false;
var container = document.getElementById('container');
var objectCount = 12;

// 牌が選択された時の処理を行う．
/*object.addEventListener('click', function(){
    selectTile(this);
});*/


// objectCountだけ牌を生成してcontainerに並べる．
for(var i = 0; i < objectCount; i++){
    var object = document.createElement('div');
    object.className = 'object';

    assignNumber(object);
    processObject(object);

    container.appendChild(object);

    object.addEventListener('click', function(){
        selectTile(this);
    });
}

// objectの並び替え
sortObjects();


// 番号を振り分ける関数
function assignNumber(object){
    const starNum = Math.floor(Math.random() * 2);
    const colorNum = Math.floor(Math.random() * 12);

    const tmp = starNum*1000 + colorNum*10;
    var dataNumber = String(tmp).padStart(4, "0");
    object.setAttribute('dataNumber', dataNumber);
}

// 番号から星と色を変更する関数
function processObject(object){
    // 番号取得して星を設定する．
    var number = object.getAttribute('dataNumber');

    if(number.charAt(0) === '1'){
        // 星をつける処理
        object.classList.add('has-star');
    }
    // 色を設定する．
    var secondDigit = parseInt(number.charAt(1));
    var thirdDigit = parseInt(number.charAt(2));

    if(secondDigit === 0 && thirdDigit === 0){
        object.style.backgroundColor = 'yellow';
    } else if(secondDigit === 0 && thirdDigit === 1){
        object.style.backgroundColor = 'limegreen';
    } else if(thirdDigit === 2){
        object.style.backgroundColor = 'green';
    } else if(thirdDigit === 3){
        object.style.backgroundColor = 'aqua';
    } else if(thirdDigit === 4){
        object.style.backgroundColor = 'blue';
    } else if(thirdDigit === 5){
        object.style.backgroundColor = 'purple';
    } else if(thirdDigit === 6){
        object.style.backgroundColor = 'red';
    } else if(thirdDigit === 7){
        object.style.backgroundColor = 'pink';
    } else if(thirdDigit === 8){
        object.style.backgroundColor = 'orange';
    } else if(thirdDigit === 9){
        object.style.backgroundColor = 'bisque';
    } else if(secondDigit === 1 && thirdDigit === 0){
        object.style.backgroundColor = 'saddlebrown';
    } else{
        object.style.backgroundColor = 'black';
    }
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

// container内のobjectをソートする．
function sortObjects(){
    var objects = container.querySelectorAll('.object');
    var objectArray = Array.from(objects);

    objectArray.sort(function(a, b){
        var numberA = parseInt(a.getArrtibute('dataNumber'));
        var numberB = parseInt(b.getAttribute('dataNumber'));
        return numberB - numberA;
    });
}