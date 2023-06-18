function CheckWinonSelfDraw(hand, canWinTile, isWin) {
    if (Math.floor((hand[11] % 1000) / 10) === canWinTile) {
        if (confirm('ツモ')) isWin = true; // ツモならtrueを格納.
        else isWin = false;
    }

    return isWin;
}