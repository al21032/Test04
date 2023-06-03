function createButton(){
    var button = document.createElement('div');
    button.className = 'button';
    
    var buttonText = document.createTextNode('対局開始');
    button.appendChild(buttonText);

    // ボタン要素をページに追加
    var buttonContainer = document.getElementById('buttonContainer');
    buttonContainer.appendChild(button);
}

function createP(){
    var menuText= document.createElement('p');
    menuText.innerText = 'メニュー';
    var buttonContainer = document.getElementById('buttonContainer');
    buttonContainer.parentNode.insertBefore(menuText, buttonContainer);
}

// ページのロード後にボタン生成
window.addEventListener('DOMContentLoaded', function(){
    createP();
    createButton();
});