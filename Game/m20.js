/*
Designer:深井悠稀
Date    :2023.6.24
Purpose :まんじゃらシステム
*/

/*
Function Name:AdditionalDiscarRequest
Designer     :深井悠稀
Date         :2023.6.24
Function     :打牌された牌がポンされないまたはあがれないならtrue,ポンされるまたは上がれるならfalseを返す
*/
function AdditionalDiscarRequest(discardTile, canWinTile, canClaimTiles){
    if((Math.floor((discardTile % 1000)/10) === canWinTile)
        || canClaimTiles[(Math.floor((discardTile % 1000) / 10))])
        return false;
    else 
        return true;
}