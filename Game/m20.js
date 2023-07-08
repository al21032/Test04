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