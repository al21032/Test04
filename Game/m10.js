/*
Designer:高橋匠
Date    :2023.6.3
Purpose :まんじゃらシステム
*/

/*
Function Name:SetClaim
Designer     :高橋匠
Date         :2023.6.3
Function     :手牌の更新後に，ポンが可能な牌のフラグをcanClaimTilesで立てる.
*/

function SetClaim(hands, canClaimTiles) {

	// 初期化
	for (let i = 0; i < 12; ++i) {
		canClaimTiles[i] = false;
	}

	// (手牌の数 - 1)だけループする.
	for (let i = 0; i < 10; ++i) {
		if (hands[i] >= 1000) break; // 鳴いてある牌の分は判定しない.

		// Math.floor(hand[i] / 10):牌の色を識別するための2桁目と3桁目の抽出.
		// 同じ色の牌が2つ続けて並んでいたら，ポンが可能な牌とする.
		if (Math.floor(hands[i] / 10) === Math.floor(hands[i + 1] / 10)) {
			if (Math.floor(hands[i] / 10) === 0) canClaimTiles[0] = true; // yellow
			else if (Math.floor(hand[i] / 10) === 1) canClaimTiles[1] = true; // lime
			else if (Math.floor(hand[i] / 10) === 2) canClaimTiles[2] = true; // green
			else if (Math.floor(hand[i] / 10) === 3) canClaimTiles[3] = true; // cyan
			else if (Math.floor(hand[i] / 10) === 4) canClaimTiles[4] = true; // blue
			else if (Math.floor(hand[i] / 10) === 5) canClaimTiles[5] = true; // purple
			else if (Math.floor(hand[i] / 10) === 6) canClaimTiles[6] = true; // red
			else if (Math.floor(hand[i] / 10) === 7) canClaimTiles[7] = true; // pink
			else if (Math.floor(hand[i] / 10) === 8) canClaimTiles[8] = true; // orange
			else if (Math.floor(hand[i] / 10) === 9) canClaimTiles[9] = true; // bisque
			else if (Math.floor(hand[i] / 10) === 10) canClaimTiles[10] = true; // brown
			else if (Math.floor(hand[i] / 10) === 11) canClaimTiles[11] = true; // black
		}
	}
}