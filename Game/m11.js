/*
Designer:高橋匠
Date    :2023.6.3
Purpose :まんじゃらシステム
*/

/*
Function Name:checkClaim
Designer     :高橋匠
Date         :2023.6.3
Function     :牌が切られた後に，切られた牌がポン可能なら，ポンするかを確認する.
*/

function checkClaim (isClaim) {
	// 切られた牌が，ポンできるフラグが立っているかの確認.
<<<<<<< HEAD
	if (confirm('ポンしますか?')) {
		isClaim = true; // ポンするならtrueを格納.
	} else {
		isClaim = false;
	}
=======
	if (confirm('ポンしますか?')) isClaim = true; // ポンするならtrueを格納.
	else isClaim = false;
>>>>>>> a0d6b38a9a7a468c19ca9fe1618491a7b075add1
	return isClaim;
}
