/*
Designer:高橋匠
Date    :2023.6.3
Purpose :まんじゃらシステム
*/

/*
Function Name:discardTileOrder
Designer     :高橋匠
Date         :2023.6.3
Function     :切られた牌が，ポンやロンの対象になっているかを調べる.
*/

function discardTileOrder (discardTile, canClaimTiles, canWinTile, isPossibleClaim) {
<<<<<<< HEAD
	const color = Math.floor((discardTile % 1000) / 10); // 牌の色を格納する.
=======
	var color = Math.floor((discardTile % 1000) / 10); // 牌の色を格納する.
>>>>>>> a0d6b38a9a7a468c19ca9fe1618491a7b075add1

	// ポンの対象となっている牌ならば，
	if (canClaimTiles[color]) {
		isPossibleClaim = true; // ポンされる可能性がある牌としてtrueを格納する.
	}

	// ロンの対象となっている牌ならば，
<<<<<<< HEAD
	if (canWinTile === color) {
		isPossibleClaim = true;
	}
=======
	if (canWinTile === color) isPossibleClaim = true;
>>>>>>> a0d6b38a9a7a468c19ca9fe1618491a7b075add1
}
