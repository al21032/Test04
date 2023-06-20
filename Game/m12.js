/*
Designer:高橋匠
Date    :2023.6.5
Purpose :まんじゃらシステム
*/

/*
Function Name:doClaim
Designer     :高橋匠
Date         :2023.6.5
Function     :ポンをするなら，牌を3枚見せてポンをする.
              ドラを見せてポンするかの場合分けも行う.
*/

function doClaim(trash, trashPoint, hand, claimCount) {

	var color = Math.floor((trash[trashPoint] % 1000) / 10); // 牌の色を格納する.

	var tmpTile = trash[trashPoint];

	// 配列に挿入して，昇順にソートする.
	hand[11] = trash[trashPoint];
	var isDora = false;
	if (hand[11] % 10 === 1) isDora = true;
	hand.sort((a, b) => a - b);

	var lastHand = -1;
	for (let i = 0; i < 12; ++i) {
		if (hand[i] >= 1000) break;
		lastHand = i;
	}

	trash[trashPoint] = -1;

	var showBonusTiles = false; // ドラを見せてポンするかのフラグ.
	var firstColorLabel = -1; // ポン対象の牌の色が，手牌で最初に現れる位置.
	var lastColorLabel = -1; // ポン対象の牌の色が，手牌で最後に現れる位置.

	for (let i = 0; i < 12; ++i) {
		if (hand[i] >= 1000) break;
		if (Math.floor((hand[i] % 1000) / 10) > color) {
			lastColorLabel = i - 1;
			break;
		}
		// ポン対象の牌が手牌の右端の色だった場合，手牌の右端を格納.
		if (Math.floor((hand[lastHand] % 1000) / 10) === color) {
			lastColorLabel = lastHand;
			break;
		}
	}

	// ポン対象の牌の色が，手牌で最初に現れる位置を探す.
	for (let i = 0; i < 10; ++i) {

		// ポン対象の牌の色と，手牌の色が一致したら
		if (Math.floor((hand[i]  % 1000) / 10) === color) {
			firstColorLabel = i;

			// ポン対象の牌の色のドラを持っていたら
			if (hand[lastColorLabel] % 10 === 1 && lastColorLabel - firstColorLabel > 2 && !isDora) {
				if (confirm('ドラを見せる?')) {
					showBonusTiles = true; // ドラを見せるならtrueを格納.
				}
			}

			if (isDora) showBonusTiles = true;


			// 3枚見せる
			if (showBonusTiles || tmpTile % 10 === 1) { // ドラを見せるなら後ろから見せる.
				hand[lastColorLabel] += ((3 - claimCount) * 1000);
				hand[lastColorLabel - 1] += ((3 - claimCount) * 1000);
				hand[lastColorLabel - 2] += ((3 - claimCount) * 1000);
			} else { // ドラを見せないなら前から見せる.
				hand[firstColorLabel] += ((3 - claimCount) * 1000);
				hand[firstColorLabel + 1] += ((3 - claimCount) * 1000);
				hand[firstColorLabel + 2] += ((3 - claimCount) * 1000);
			}
			break;
		}
	}
	
	// ポン対象の牌の色が，手牌で最初に現れる位置から3つ先まで繋がっていたら
	if (lastColorLabel - firstColorLabel > 2 && lastHand > 3) {
		if (confirm('4枚見せてポンする?')) {
			if (showBonusTiles) hand[lastColorLabel - 3] += ((3 - claimCount) * 1000);
			else hand[firstColorLabel + 3] += ((3 - claimCount) * 1000);
		}
	}

	// 昇順にソート.
	hand.sort((a, b) => a - b);

	claimCount += 1;
	return claimCount;
}
