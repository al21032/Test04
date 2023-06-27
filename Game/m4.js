/*
<<<<<<< HEAD
Designer    :小泉遼太
Date        :2023.6.12
Purpose     :まんじゃらシステム
*/

/*
Function Name   :TransitionHelp
Designer        :小泉 遼太
Date            :2023.6.12
Function        :ヘルプボタンを押したらヘルプ画面に遷移する
=======
Designer:小泉遼太
Date    :2023.6.12
Purpose :まんじゃらシステム
*/

/*
Function Name:TransitionHelp
Designer     :小泉遼太
Date         :2023.6.12
Function     :ヘルプボタンを押したらhelp.htmlに遷移する
>>>>>>> a0d6b38a9a7a468c19ca9fe1618491a7b075add1
*/

// ヘルプ画面へ遷移するボタンを生成
function drawHelp() {
    var buttonX = 100;
    var buttonY = 50;
    var buttonWidth = 150;
    var buttonHeight = 70;

    // ボタン描画
    ctx.beginPath();
    ctx.ellipse(buttonX, buttonY, buttonWidth / 2, buttonHeight / 2, 0, 0, 2 * Math.PI);
    ctx.fillStyle = 'lightblue';
    ctx.fill();

    // ボタンのテキスト描画
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ヘルプ', buttonX, buttonY);

    // ボタンが押された時の処理
    canvas.addEventListener('click', e => {
        // マウスの座標をhelpCanvas内の座標と合わせる
        const rect = canvas.getBoundingClientRect();
        const point = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    
<<<<<<< HEAD
        const hit = (buttonX <= buttonX && point.x <= buttonX + buttonWidth / 2)
                    && (buttonY <= buttonY && point.y <= buttonY + buttonHeight / 2)
        if (hit) {
            window.open('../Help/help.html', 'ヘルプ', 'width=1000, height=900');
            imageObj.src = imageData;
        }
    });
}
=======
        const hit =
            (buttonX <= buttonX && point.x <= buttonX + buttonWidth / 2)
            && (buttonY <= buttonY && point.y <= buttonY + buttonHeight / 2)
        if (hit) {
            TransitionHelp();
        }
    });
}

function TransitionHelp() {
    // 新しいウィンドウを開く
    window.open('../Help/help.html', 'ヘルプ', 'width=1000, height=900');
    imageObj.src = imageData;
}
>>>>>>> a0d6b38a9a7a468c19ca9fe1618491a7b075add1
