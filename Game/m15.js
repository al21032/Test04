function CheckWinonRon(trash, trashPoint, canWinTile, isWin) {
    if (Math.floor((trash[trashPoint] % 1000) / 10) === canWinTile) {
        if (confirm('ロン')) isWin = true; // ロンならtrueを格納.
        else isWin = false;
    }
    return isWin;
}