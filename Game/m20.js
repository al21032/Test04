/*
Designer:深井悠稀
Date    :2023.6.24
Purpose :まんじゃらシステム
*/

/*
Function Name:additionalDiscardRequest
Designer     :深井悠稀
Date         :2023.6.24
Function     :打牌された牌がポンされないまたはあがれないならtrue,ポンされるまたは上がれるならfalseを返す
*/

function additionalDiscardRequest(discardTile, canWinTile, canClaimTiles) {
	if(canWinTile === (Math.floor((discardTile % 1000)/10))
        || canClaimTiles[(Math.floor((discardTile % 1000) / 10))])
        return false;
    else 
        return true;
}