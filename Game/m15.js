/*
Designer	    : 深井悠稀
Date		    : 2023.6.15
Purpose		    : まんじゃらシステム
*/

/*
Function Name 	: 
Designer        : 深井悠稀
Date            : 2023.6.15
Function        : ロン上がり確認
Return          : true ロン上がりする, false ロン上がりしない
*/
function checkWinonRon(trash, trashPoint, canWinTile) {
    if (Math.floor((trash[trashPoint] % 1000) / 10) === canWinTile) {
        if (confirm('ロン')) return true; // ロンならtrueを格納.
        else return false;
    }
}