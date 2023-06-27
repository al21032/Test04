<<<<<<< HEAD
function checkWinOnRon(trash, trashPoint, canWinTile, isWin) {
    if (Math.floor((trash[trashPoint] % 1000) / 10) === canWinTile) {
        if (confirm('ロン')) {
            isWin = true; // ロンならtrueを格納.
        } else {
            isWin = false;
        }
=======
/*
Designer:高橋匠
Date    :2023.6.10
Purpose :まんじゃらシステム
*/

/*
Function Name:checkWinonRon
Designer     :高橋匠
Date         :2023.6.10
Function     :上がり牌が捨てられたらロンするか確認する
*/

function checkWinonRon(trash, trashPoint, canWinTile, isWin) {
    if (Math.floor((trash[trashPoint] % 1000) / 10) === canWinTile) {
        if (confirm('ロン')) isWin = true; // ロンならtrueを格納.
        else isWin = false;
>>>>>>> a0d6b38a9a7a468c19ca9fe1618491a7b075add1
    }
    return isWin;
}