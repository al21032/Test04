/*
Designer:高橋匠
Date    :2023.6.3
Purpose :まんじゃらシステム
*/

/*
Function Name:CheckClaim
Designer     :高橋匠
Date         :2023.6.3
Function     :牌が切られた後に，切られた牌がポン可能なら，ポンするかを確認する.
*/

function CheckClaim (discardTile, canClaimTiles, isClaim) {

	// 切られた牌が，ポンできるフラグが立っているかの確認.
	if (canClaimTiles(Math.floor(discardTile / 10))) {
		if (confitm('ポンしますか?')) isClaim = true; // ポンするならtrueを格納.
		else isClaim = false;
	}
}