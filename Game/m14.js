function doReach(hand, canWinTile) {
    const tmpHand = new Array(11);
    const color = new Array(11);

    for (let i = 0; i < 11; ++i) {
        tmpHand[i] = hand[i];
    }

    tmpHand.sort((a, b) => a - b);

    for (let i = 0; i < 11; ++i) {
        color[i] = Math.floor((tmpHand[i] % 1000) / 10);
    }

    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    let six = 0;
    let seven = 0;
    let eight = 0;
    let nine = 0;

    // 2色セット確認
    if (color[0] === color[1] 
        && color[1] !== color[2]) {
        two += 1;
    }
   for (let i = 1; i < 9; ++i) {
        if (color[i - 1] !== color[i] 
            && color[i] === color[i + 1] 
            && color[i + 1] !== color[i + 2]) {
           two += 1;
        }
    }
    if (color[8] !== color[9] 
        && color[9] === color[10]) {
        two += 1;
    }

    // 3色セット確認
    if (color[0] === color[1] 
        && color[1] === color[2] 
        && color[2] !== color[3]) {
        three += 1;
    }
    for (let i = 1; i < 8; ++i) {
        if (color[i - 1] !== color[i] 
            && color[i] === color[i + 1] 
            && color[i + 1] === color[i + 2] 
            && color[i + 2] !== color[i + 3]) {
            three += 1;
        }
    }
    if (color[7] !== color[8] 
        && color[8] === color[9] 
        && color[9] === color[10]) {
        three += 1;
    }

    // 4色セット確認
    if (color[0] === color[1] 
        && color[1] === color[2] 
        && color[2] === color[3] 
        && color[3] !== color[4]) {
        four += 1;
    }
    for (let i = 1; i < 7; ++i) {
        if (color[i - 1] !== color[i] 
            && color[i] === color[i + 1] 
            && color[i + 1] === color[i + 2] 
            && color[i + 2] === color[i + 3] 
            && color[i + 3] !== color[i + 4]) {
            four += 1;
        }
    }
    if (color[6] !== color[7] 
        && color[7] === color[8] 
        && color[8] === color[9] 
        && color[9] === color[10]) {
        four += 1;
    }

    // 5色セット確認
    if (color[0] === color[1] 
        && color[1] === color[2] 
        && color[2] === color[3] 
        && color[3] === color[4] 
        && color[4] !== color[5]) {
        five += 1;
    }
    for (let i = 1; i < 6; ++i) {
        if (color[i - 1] !== color[i] 
            && color[i] === color[i + 1] 
            && color[i + 1] === color[i + 2] 
            && color[i + 2] === color[i + 3] 
            && color[i + 3] === color[i + 4] 
            && color[i + 4] !== color[i + 5]) {
            five += 1;
        }
    }
    if (color[5] !== color[6] 
        && color[6] === color[7] 
        && color[7] === color[8] 
        && color[8] === color[9] 
        && color[9] === color[10]) {
        five += 1;
    }

    // 6色セット確認
    if (color[0] === color[1] 
        && color[1] === color[2] 
        && color[2] === color[3] 
        && color[3] === color[4] 
        && color[4] === color[5] 
        && color[5] !== color[6]) {
        six += 1;
    }
    for (let i = 1; i < 5; ++i) {
        if (color[i - 1] !== color[i] 
            && color[i] === color[i + 1] 
            && color[i + 1] === color[i + 2] 
            && color[i + 2] === color[i + 3] 
            && color[i + 3] === color[i + 4] 
            && color[i + 4] === color[i + 5] 
            && color[i + 5] !== color[i + 6]) {
            six += 1;
        }
    }
    if (color[4] !== color[5] 
        && color[5] === color[6] 
        && color[6] === color[7] 
        && color[7] === color[8] 
        && color[8] === color[9] 
        && color[9] === color[10]) {
        six += 1;
    }

    // 7色セット確認
    if (color[0] === color[1] 
        && color[1] === color[2] 
        && color[2] === color[3] 
        && color[3] === color[4] 
        && color[4] === color[5] 
        && color[5] === color[6] 
        && color[6] !== color[7]) {
        seven += 1;
    }
    for (let i = 1; i < 4; ++i) {
        if (color[i - 1] !== color[i] 
            && color[i] === color[i + 1] 
            && color[i + 1] === color[i + 2] 
            && color[i + 2] === color[i + 3] 
            && color[i + 3] === color[i + 4] 
            && color[i + 4] === color[i + 5] 
            && color[i + 5] === color[i + 6] 
            && color[i + 6] !== color[i + 7]) {
            seven += 1;
        }
    }
    if (color[3] !== color[4] 
        && color[4] === color[5] 
        && color[5] === color[6] 
        && color[6] === color[7] 
        && color[7] === color[8] 
        && color[8] === color[9] 
        && color[9] === color[10]) {
        seven += 1;
    }

    // 8色セット確認
    if (color[0] === color[1] 
        && color[1] === color[2] 
        && color[2] === color[3] 
        && color[3] === color[4] 
        && color[4] === color[5] 
        && color[5] === color[6] 
        && color[6] === color[7] 
        && color[7] !== color[8]) {
        eight += 1;
    }
    for (let i = 1; i < 3; ++i) {
        if (color[i - 1] !== color[i] 
            && color[i] === color[i + 1] 
            && color[i + 1] === color[i + 2] 
            && color[i + 2] === color[i + 3] 
            && color[i + 3] === color[i + 4] 
            && color[i + 4] === color[i + 5] 
            && color[i + 5] === color[i + 6] 
            && color[i + 6] === color[i + 7] 
            && color[i + 7] !== color[i + 8]) {
            eight += 1;
        }
    }
    if (color[2] !== color[3] 
        && color[3] === color[4] 
        && color[4] === color[5] 
        && color[5] === color[6] 
        && color[6] === color[7] 
        && color[7] === color[8] 
        && color[8] === color[9] 
        && color[9] === color[10]) {
        eight += 1;
    }

    // 9色セット確認
    if (color[0] === color[1] 
        && color[1] === color[2]
        && color[2] === color[3] 
        && color[3] === color[4] 
        && color[4] === color[5] 
        && color[5] === color[6] 
        && color[6] === color[7] 
        && color[7] === color[8] 
        && color[8] !== color[9]) {
        nine += 1;
    }
    for (let i = 1; i < 3; ++i) {
        if (color[i - 1] !== color[i] 
            && color[i] === color[i + 1] 
            && color[i + 1] === color[i + 2] 
            && color[i + 2] === color[i + 3] 
            && color[i + 3] === color[i + 4] 
            && color[i + 4] === color[i + 5] 
            && color[i + 5] === color[i + 6] 
            && color[i + 6] === color[i + 7] 
            && color[i + 7] === color[i + 8] 
            && color[i + 8] !== color[i + 9]) {
            nine += 1;
        }
    }
    if (color[1] !== color[2] 
        && color[2] === color[3] 
        && color[3] === color[4] 
        && color[4] === color[5] 
        && color[5] === color[6] 
        && color[6] === color[7] 
        && color[7] === color[8] 
        && color[8] === color[9] 
        && color[9] === color[10]) {
        nine += 1;
    }

    // 1-1-1-1-1-1-1-1-1-1-1-1色セット確認
    let check = true;
    for (let i = 0; i < 10; ++i) {
        if (color[i] === color[i + 1]) {
            check = false;
            break;
        }
    }
    if (check) {
        canWinTile = 11;
        for (let i = 0; i < 11; ++i) {
            if (color[i] != i) {
                canWinTile = i;
                break;
            }
        }
    }

    // 3-3-3-3色セット確認
    if (two === 1 && three === 3) {
        if (color[0] === color[1] && color[1] !== color[2]) {
            canWinTile = color[0];
        }
        for (let i = 1; i < 9; ++i) {
            if (color[i - 1] !== color[i] 
                && color[i] === color[i + 1] 
                && color[i + 1] !== color[i + 2]) {
                canWinTile = color[i];
            }
        }
        if (color[8] !== color[9] && color[9] === color[10]) {
            canWinTile = color[10];
        }
    }

    // 4-4-4色セット確認
    if (three === 1 && four === 2) {
        if (color[0] === color[1] 
            && color[1] === color[2] 
            && color[2] !== color[3]) {
            canWinTile = color[0];
        }
        for (let i = 1; i < 8; ++i) {
            if (color[i - 1] !== color[i] 
                && color[i] === color[i + 1] 
                && color[i + 1] === color[i + 2] 
                && color[i + 2] !== color[i + 3]) {
                canWinTile = color[i];
            }
        }
        if (color[7] !== color[8] 
            && color[8] === color[9] 
            && color[9] === color[10]) {
            canWinTile = color[10];
        }
    }

    // 6-3-3色セット確認
    if (five === 1 && three === 2) {
        if (color[0] === color[1] 
            && color[1] === color[2] 
            && color[2] === color[3] 
            && color[3] === color[4] 
            && color[4] !== color[5]) {
            canWinTile = color[0];
        }
        for (let i = 0; i < 6; ++i) {
            if (color[i - 1] !== color[i] 
                && color[i] === color[i + 1] 
                && color[i + 1] === color[i + 2] 
                && color[i + 2] === color[i + 3] 
                && color[i + 3] === color[i + 4] 
                && color[i + 4] !== color[i + 5]) {
                canWinTile = color[i];
            }
        }
        if (color[5] !== color[6] 
            && color[6] === color[7] 
            && color[7] === color[8] 
            && color[8] === color[9] 
            && color[9] === color[10]) {
            canWinTile = color[10];
        }
    } else if (two === 1 
        && six === 1 
        && three === 1) {
        if (color[0] === color[1] && color[1] !== color[2]) {
            canWinTile = color[0];
        }
        for (let i = 1; i < 9; ++i) {
            if (color[i - 1] !== color[i] 
                && color[i] === color[i + 1] 
                && color[i + 1] !== color[i + 2]) {
                canWinTile = color[i];
            }
        }
        if (color[8] !== color[9] && color[9] === color[10]) {
            canWinTile = color[10];
        }
    }

    // 6-6色セット確認
    if (five === 1 && six === 1) {
        if (color[0] === color[1] 
            && color[1] === color[2] 
            && color[2] === color[3] 
            && color[3] === color[4] 
            && color[4] !== color[5]) {
            canWinTile = color[0];
        }
        for (let i = 0; i < 6; ++i) {
            if (color[i - 1] !== color[i] 
                && color[i] === color[i + 1] 
                && color[i + 1] === color[i + 2] 
                && color[i + 2] === color[i + 3] 
                && color[i + 3] === color[i + 4] 
                && color[i + 4] !== color[i + 5]) {
                canWinTile = color[i];
            }
        }
        if (color[5] !== color[6] 
            && color[6] === color[7] 
            && color[7] === color[8] 
            && color[8] === color[9] 
            && color[9] === color[10]) {
            canWinTile = color[10];
        }
    }

    // 9-3色セット確認
    if (eight === 1 && three === 1) {
        if (color[0] === color[1] 
            && color[1] === color[2] 
            && color[2] === color[3] 
            && color[3] === color[4] 
            && color[4] === color[5] 
            && color[5] === color[6] 
            && color[6] === color[7] 
            && color[7] !== color[8]) {
            canWinTile = color[0];
        }
        for (let i = 0; i < 3; ++i) {
            if (color[i - 1] !== color[i] 
                && color[i] === color[i + 1] 
                && color[i + 1] === color[i + 2] 
                && color[i + 2] === color[i + 3] 
                && color[i + 3] === color[i + 4] 
                && color[i + 4] === color[i + 5] 
                && color[i + 5] === color[i + 6] 
                && color[i + 6] === color[i + 7] 
                && color[i + 7] !== color[i + 8]) {
                canWinTile = color[i];
            }
        }
        if (color[2] !== color[3] 
            && color[3] === color[4] 
            && color[4] === color[5] 
            && color[5] === color[6] 
            && color[6] === color[7] 
            && color[7] === color[8] 
            && color[8] === color[9] 
            && color[9] === color[10]) {
            canWinTile = color[10];
        }
    } else if (nine === 1 && two === 1) {
        if (color[0] === color[1] && color[1] !== color[2]) {
            canWinTile = color[0];
        }
        for (let i = 1; i < 9; ++i) {
            if (color[i - 1] !== color[i] 
                && color[i] === color[i + 1] 
                && color[i + 1] !== color[i + 2]) {
                canWinTile = color[i];
            }
        }
        if (color[8] !== color[9] && color[9] === color[10]) {
            canWinTile = color[10];
        }
    }

    // 8-4色セット確認
    if (seven === 1 && four === 1) {
        if (color[0] === color[1] 
            && color[1] === color[2] 
            && color[2] === color[3] 
            && color[3] === color[4] 
            && color[4] === color[5] 
            && color[5] === color[6] 
            && color[6] !== color[7]) {
            canWinTile = color[0];
        }
        for (let i = 0; i < 4; ++i) {
            if (color[i - 1] !== color[i] 
                && color[i] === color[i + 1] 
                && color[i + 1] === color[i + 2] 
                && color[i + 2] === color[i + 3] 
                && color[i + 3] === color[i + 4] 
                && color[i + 4] === color[i + 5] 
                && color[i + 5] === color[i + 6] 
                && color[i + 6] !== color[i + 7]) {
                canWinTile = color[i];
            }
        }
        if (color[3] !== color[4] 
            && color[4] === color[5] 
            && color[5] === color[6] 
            && color[6] === color[7] 
            && color[7] === color[8] 
            && color[8] === color[9] 
            && color[9] === color[10]) {
            canWinTile = color[10];
        }
    } else if (eight === 1 && three === 1) {
        if (color[0] === color[1] 
            && color[1] === color[2] 
            && color[2] !== color[3]) {
            canWinTile = color[0];
        }
        for (let i = 1; i < 8; ++i) {
            if (color[i - 1] !== color[i] 
                && color[i] === color[i + 1] 
                && color[i + 1] === color[i + 2] 
                && color[i + 2] !== color[i + 3]) {
                canWinTile = color[i];
            }
        }
        if (color[7] !== color[8] 
            && color[8] === color[9] 
            && color[9] === color[10]) {
            canWinTile = color[10];
        }
    }

    // 12色セット確認
    check = true;
    for (let i = 0; i < 10; ++i) {
        if (color[i] != color[i + 1]) {
            check = false;
            break;
        }
    }
    if (check) {
        canWinTile = color[10];
    }
    return canWinTile;
}