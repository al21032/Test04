function checkReach(winPoint, isReach) {
    if (winPoint > 0) {
        if (confirm('リーチしますか?')) {
            isReach = true; // リーチするならtrueを格納.
        } else {
            isReach = false;
        }
    }
    return isReach;
}