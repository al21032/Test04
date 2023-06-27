/*
Designer:高橋匠
Date    :2023.6.10
Purpose :まんじゃらシステム
*/

/*
Function Name:checkWinOnRon
Designer     :高橋匠
Date         :2023.6.10
Function     :捨て牌が上がり牌ならロンするかを確認する．
*/

function checkWinOnRon(trash, trashPoint, canWinTile, isWin) {
    if (Math.floor((trash[trashPoint] % 1000) / 10) === canWinTile) {
        if (confirm('ロン')) {
            isWin = true; // ロンならtrueを格納.
        } else {
            isWin = false;
        }
    }
    return isWin;
}