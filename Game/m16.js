/*
Designer        :深井悠稀	　　
Date		    :2023.6.15
Purpose		    :まんじゃらシステム
*/

/*
Function Name   :checkWinonSelfDraw
Designer        :深井悠稀
Date            :2023.6.15
Function        :ツモ上がり確認
Return          :true ツモ上がりする, false ツモ上がりしない 
*/
function checkWinonSelfDraw(hand, canWinTile) {
    if (Math.floor((hand[11] % 1000) / 10) === canWinTile) {
        if (confirm('ツモ')) 
            return true 
        else 
            return false
    }
}