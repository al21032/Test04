/*
Designer:高橋匠
Date    :2023.6.10
Purpose :まんじゃらシステム
*/

/*
Function Name:checkWinOnRon
Designer     :高橋匠
Date         :2023.6.10
Function     :ツモ牌が上がり牌ならツモするかを確認する．
*/

function checkWinOnSelfDraw(hand, canWinTile, isWin) {
    if (Math.floor((hand[11] % 1000) / 10) === canWinTile) {
        if (confirm('ツモ')) {
            isWin = true; // ツモならtrueを格納.
        } else {
            isWin = false;
        }
    }
    return isWin;
}