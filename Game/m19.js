/*
Designer:高橋匠
Date    :2023.6.3
Purpose :まんじゃらシステム
*/

/*
Function Name:DiscardTileOrder
Designer     :高橋匠
Date         :2023.6.3
Function     :切られた牌が，ポンやロンの対象になっているかを調べる.
*/

function discardTileOrder (discardTile, canClaimTiles, canWinTile, isPossibleClaim) {
	const color = Math.floor((discardTile % 1000) / 10); // 牌の色を格納する.

	// ポンの対象となっている牌ならば，
	if (canClaimTiles[color]) {
		isPossibleClaim = true; // ポンされる可能性がある牌としてtrueを格納する.
	}

	// ロンの対象となっている牌ならば，
	if (canWinTile === color) {
		isPossibleClaim = true;
	}
}
