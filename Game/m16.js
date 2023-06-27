<<<<<<< HEAD
function checkWinOnSelfDraw(hand, canWinTile, isWin) {
    if (Math.floor((hand[11] % 1000) / 10) === canWinTile) {
        if (confirm('ツモ')) {
            isWin = true; // ツモならtrueを格納.
        } else {
            isWin = false;
        }
    }
=======
/*
Designer:高橋匠
Date    :2023.6.10
Purpose :まんじゃらシステム
*/

/*
Function Name:checkWinonSelfDraw
Designer     :高橋匠
Date         :2023.6.10
Function     :上がり牌をツモしたら上がるか確認する
*/

function checkWinonSelfDraw(hand, canWinTile, isWin) {
    if (Math.floor((hand[11] % 1000) / 10) === canWinTile) {
        if (confirm('ツモ')) isWin = true; // ツモならtrueを格納.
        else isWin = false;
    }

>>>>>>> a0d6b38a9a7a468c19ca9fe1618491a7b075add1
    return isWin;
}