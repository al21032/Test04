/*
Designer:高橋匠
Date    :2023.6.24
Purpose :まんじゃらシステム
*/

/*
Function Name:additionalDiscardRequest
Designer     :高橋匠
Date         :2023.6.24
Function     :直前の捨て牌がポンかロンされるかを確認する．
*/

function additionalDiscardRequest(discardTile, canWinTile, canClaimTiles) {
	ret = true;
	color = Math.floor((discardTile % 1000) / 10);

	if (canWinTile === color) {
		ret = false;
	}

	if (canClaimTiles[color]) {
		ret = false;
	}

	return ret;

}