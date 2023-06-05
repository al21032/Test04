/*
Designer:高橋匠
Date    :2023.6.5
Purpose :まんじゃらシステム
*/

/*
Function Name:DoClaim
Designer     :高橋匠
Date         :2023.6.5
Function     :ポンをするなら，牌を3枚か4枚見せてポンをする.
              ドラを見せてポンするかの場合分けも行う.
*/

function DoClaim(discardTile, hands) {
	var color = Math.floor(discardTile / 10); // 牌の色を格納する.

	// 配列に挿入して，昇順にソートする.
	hands.push(discardTile);
	hands.sort((a, b) => a - b);

	var showBonusTiles = false; // ドラを見せてポンするかのフラグ.
	var firstColorLabel = -1; // ポン対象の牌の色が，手牌で最初に現れる位置.
	var lastColorLabel = -1; // ポン対象の牌の色が，手牌で最後に現れる位置.

	for (let i = 0; i < 12; ++i) {
		if (Math.floor(hands[i] / 10) > color) lastColorLabel = i - 1;
		// ポン対象の牌が黒色だった場合，配列の最後である11を格納.
		if (color === 12) {
			lastColorLabel = 11;
			break;
		}
	}

	// ポン対象の牌の色が，手牌で最初に現れる位置を探す.
	for (let i = 0; i < 10; ++i) {

		// ポン対象の牌の色と，手牌の色が一致したら
		if (Math.floor(hands[i] / 10) === color) {
			firstColorLabel = i;

			// ポン対象の牌の色のドラを持っていたら
			if (hands[lastColorLabel] % 1000 === 1) {
				if (confirm('ドラを見せる?')) {
					showBonusTiles = true; // ドラを見せるならtrueを格納.
				}
			}

			// まずは3枚まで見せる.
			if (showBonusTiles) { // ドラを見せるなら後ろから見せる.
				hands[lastColorLabel] += 1000;
				hands[lastColorLabel - 1] += 1000;
				hands[lastColorLabel - 2] += 1000;
			} else { // ドラを見せないなら前から見せる.
				hands[firstColorLabel] += 1000;
				hands[firstColorLabel + 1] += 1000;
				hands[firstColorLabel + 2] += 1000;
			}
			break;
		}
	}

	// 手牌の最後の牌の色が4つ以上繋がっていたら(配列の外の参照防止)
	if (firstColorLabel < 9) {

		// ポン対象の牌の色が，手牌で最初に現れる位置から3つ先まで繋がっていたら
		if (hands[firstColorLabel + 3] === color) {
			if (confirm('4枚見せてポンする?')) {
				if (showBonusTiles) hands[lastColorLabel - 3] += 1000;
				else hands[firstColorLabel + 3] += 1000;
			}
		}
	}

	// 昇順にソートして終了.
	hands.sort((a, b) => a - b);
}