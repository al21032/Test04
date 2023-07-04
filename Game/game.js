const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let deckHead;
let parent = -1;
let turn;

canvas.width = 850;
canvas.height = 600;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

var hand = new Array(12); // 手牌
var deck = new Array(144); // 牌山
var trash0 = new Array(30); // 捨牌1~4
var trash1 = new Array(30);
var trash2 = new Array(30);
var trash3 = new Array(30);
var trashPoint0; // 捨牌の位置
var trashPoint1;
var trashPoint2;
var trashPoint3;
var point = new Array(4); // 点数
var discardTile = -1; // 切り牌
var canClaimTiles = new Array(25); // ポンできる牌
var canWinTile; // 上がれる牌
var isPossibleClaim ; // ポンできるならtrue
var isClaim; // ポンするならtrue
var duringClaim; // ポン処理中ならtrue
var winPoint; // 役の分の点数
var doraPoint; // ドラの分の点数
var isReach; // リーチしているならtrue
var canSelfDraw; // 牌山が残っているならtrue
//var isPaused; // 描画を停止中ならtrue
var isSelfDraw; // ツモ上がりならtrue
var isRon; // ロン上がりならtrue
var deadIn; // ロンされた席
var claimCount; // 鳴いた回数
var canEnd; // 終局を表示できるならtrue

for (let i = 0; i < 4; ++i) {
    point[i] = 3000;
}

// 初期化
const init = () => {
    deckHead = 0;
    parent += 1;
    turn = parent;
    trashPoint0 = 0;
    trashPoint1 = 0;
    trashPoint2 = 0;
    trashPoint3 = 0;
    canWinTile = -1;
    isPossibleClaim = false;
    isClaim = false;
    duringClaim = false;
    winPoint = 0;
    doraPoint = 0;
    isReach = false;
    canSelfDraw = true;
//   isPaused = false;
    isSelfDraw = false;
    isRon = false;
    deadIn = -1;
    claimCount = 0;
    canEnd = false;

    // タイマー処理の初期化
    clearTimeout();

    // 牌山を初期化
    for (let i = 0; i < 144; ++i) {
        let tile = Math.floor(i / 12) * 10;
        if (i % 12 === 0) tile += 1;
        deck[i] = tile;
    }

    // 牌山をランダムシャッフル
    shuffleArray(deck);

    // ユーザの手牌を配る
    for (let i = 0; i < 11; ++i) {
        hand[i] = deck[deckHead];
        deckHead += 4;
    }

    // ユーザの手牌を昇順でソート
    hand.sort((a, b) => a - b);

    // 捨て牌を初期化
    for (let i = 0; i < 30; ++i) {
        trash0[i] = -1;
        trash1[i] = -1;
        trash2[i] = -1;
        trash3[i] = -1;
    }

    // ポンできる牌と上がれる牌を初期化
    for (let i = 0; i < 12; ++i) {
        canClaimTiles[i] = false;
    }
    canWinTile = -1;

    clearTimeout(timer);

}

// 繰り返し処理
const loop = () => {


/*    if (isPaused) {
        setTimeout(loop, 1000);
    }else */
    if (parent === 4) { // 親が1周したか．

        if (canEnd) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawEndGame(point);
            for (let i = 0; i < 4; ++i) {
                point[i] = 3000;
            }
            parent = 0;
            canEnd = false;
        }
        canEnd = true;
        // isPaused = true;
    }
    // 牌山が残っているか．
    selfDrawRequest(deckHead);

    /*if (isPaused) {
        setTimeout(loop, 1000);
    } else {*/

        if (isSelfDraw) { // ツモ上がりなら
            if (hand[11] % 10 === 1) {
                doraPoint += 15;
            }
            for (let i = 0; i < 11; ++i) {
                if (hand[i] % 10 === 1) {
                    doraPoint += 15;
                }
            }
            winPoint += doraPoint;
            drawWin(winPoint);
            point[0] += winPoint;
            for (let i = 1; i <= 3; ++i) {
                point[i] -= winPoint / 3;
            }
            setTimeout(loop, 1000);
            init();
        } else if (isRon) { // ロン上がりなら
            for (let i = 0; i < 11; ++i) {
                if (hand[i] % 10 === 1) {
                    doraPoint += 15;
                }
            }
            winPoint += doraPoint;
            drawWin(winPoint);
            point[0] += winPoint;
            point[deadIn] -= winPoint;

            setTimeout(loop, 1000)

            init();
        } else if (!canSelfDraw) { // 牌山が残っていないなら
            drawDrawnGame();
            init();
        } else {
            setClaim(hand, canClaimTiles);

            if (turn === 0) { // ユーザの切り番なら
                // 再描画
                drawGame();
                // ツモする
                hand[11] = selfDrawDecision(deck, deckHead, hand);

                // ツモ牌を描画
                drawSelf(hand, 11);

                // ツモ上がり確認
                isSelfDraw = checkWinOnSelfDraw(hand, canWinTile, isSelfDraw);

                if (discardTile !== -1 
                    && (Math.floor(hand[discardTile] / 1000) < 1 || Math.floor(hand[discardTile] / 1000) > 3)) {
                    if (isReach === false) beforeReachDiscard(discardTile, trash0, hand);
                    else afterReachDiscard(trash0, trashPoint0, hand)
                } else {
                    discardTile = -1;
                }

                setClaim(hand, canClaimTiles);
    
                // 打牌した牌が鳴かれるか
                discardTileOrder (discardTile, canClaimTiles, canWinTile, isPossibleClaim)

                // 打牌した牌が鳴かれないなら，切り番を遷移する．
                if (discardTile != -1 && !isPossibleClaim) {
                    turn = 1;
                    winPoint = scoreCalculation(hand, winPoint);
                    if (isReach === false) {
                        isReach = checkReach(winPoint, isReach);
                    }
                    if (isReach === true) {
                        canWinTile = doReach(hand, canWinTile);
                    }
                    if (!isSelfDraw) {
                        drawGame();
                    }
                }
                discardTile = -1;
            } else if (turn === 1) {
                // 相手の切り番処理
                // 時計回りにツモ切り
                deckHead += 1;
                trash1[trashPoint1] = deck[deckHead];
                deckHead += 1;
                turn = 2;

                drawGame();

            } else if (turn === 2) {
                if (parent === 2 && trashPoint2 === 0) {
                        otherTurn(trash1, trashPoint1, trash2, trashPoint2);
                } else {
                    trashPoint1 = otherTurn(trash1, trashPoint1, trash2, trashPoint2);
                }
            } else if (turn === 3) {
                if (parent === 3 && trashPoint3 === 0) {
                    otherTurn(trash2, trashPoint2, trash3, trashPoint3);
                } else {
                    trashPoint2 = otherTurn(trash2, trashPoint2, trash3, trashPoint3);
                }

            } else if (turn == 4) {
                if (parent === 0 && trashPoint0 === 0) {
                    otherTurn(trash3, trashPoint3, trash0, trashPoint0);
                } else {
                    trashPoint3 = otherTurn(trash3, trashPoint3, trash0, trashPoint0);
                }
            }
        }
        // 画面の任意の位置をクリックして描画を進める．

        // isPaused = true;

        setTimeout(loop, 1000);

        discardTile = -1;
    //}
}

init();
loop();

// ランダムシャッフル
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 卓の描画
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHandTiles(hand);
    drawPoints(point);
    drawTrash(trash0, trash1, trash2, trash3);
    drawReach(isReach);
    drawHelp();
}

function drawReach(isReach) {
    if (isReach) {
        const x = 405;
        const y = 310;
        const width = 40;
        const height = 6;

        ctx.fillStyle = 'white';
        ctx.fillRect(x, y, width, height);

        ctx.beginPath();
        ctx.arc(x + width / 2, y + height / 2, 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
}

// 親が一周したときの描画
function drawEndGame(point) {
    ctx.fillStyle = 'white';
    ctx.fillRect(365, 225, 120, 60);

    let textX = centerX;
    let textY = centerY - 30;
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';

    ctx.fillText('終局', textX, textY);

    ctx.fillStyle = 'white';
    ctx.fillRect(315, 375, 220, 60);

    textX = centerX;
    textY = centerY + 120;
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';

    ctx.fillText(point[0] + 'points', textX, textY);

    let judge = true;
    for (let i = 1; i <= 3; ++i) {
        if (point[0] < point[i]) {
            judge = false;
        }
    }

    if (judge) {
        ctx.fillStyle = 'white';
        ctx.fillRect(315, 325, 220, 60);

        textX = centerX;
        textY = centerY + 70;
        ctx.font = '50px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';

        ctx.fillText('YOU WIN', textX, textY);
    } else {
        ctx.fillStyle = 'white';
        ctx.fillRect(315, 325, 220, 60);

        textX = centerX;
        textY = centerY + 70;
        ctx.font = '50px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';

        ctx.fillText('YOU LOSE', textX, textY);
    }

}

// 流れたときの描画
function drawDrawnGame() {
    ctx.fillStyle = 'white';
    ctx.fillRect(365, 225, 120, 60);

    const textX = centerX;
    const textY = centerY - 30;
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';

    ctx.fillText('流局', textX, textY);
}

// 上がりの描画
function drawWin(winPoint) {
    ctx.fillStyle = 'white';
    ctx.fillRect(280, 225, 300, 60);

    const textX = centerX;
    const textY = centerY - 30;
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';

    ctx.fillText('+' + winPoint + 'points', textX, textY);
}


// 手牌を描画
function drawHandTiles(hand) {
    // 見せてない牌の描画
    let startX = 70;
    let startY = 500;
    let tileWidth = 40;
    let tileHeight = 60;
    let spacing = 10;

    for (let i = 0; i < 11; ++i) {
        const x = startX + (tileWidth + spacing) * i;
        const y = startY;

        ctx.fillStyle = tileColor(hand, i);

        if (hand[i] < 1000) {
            ctx.fillRect(x, y, tileWidth, tileHeight);
            drawDora(hand, 10, x, y, tileWidth, tileHeight, i);
        }
    
    }
    
    // 鳴いた牌の描画
    startX = 515;
    startY = 530;
    tileWidth = 30;
    tileHeight = 45;
    spacing = 5;

    let y = startY;

    for (let i = 0; i < 3; ++i) {
        let x = startX;
        for (let j = 0; j <= 11; ++j) {

            ctx.fillStyle = tileColor(hand, j);

            if (Math.floor(hand[j] / 1000) === (3 - i)) {
                ctx.fillRect(x, y, tileWidth, tileHeight);
                if (hand[j] % 10 === 1 && Math.floor(hand[j] / 1000) === (3 - i)) {
                    const radius = 5;
                    ctx.beginPath();
                    ctx.arc(x + tileWidth / 2, y + tileHeight / 2, radius, 0, 2 * Math.PI);
                    ctx.fillStyle = 'white';
                    ctx.fill();
                    ctx.closePath();
                }
                x += tileWidth + spacing;
            }
        }
        y -= (tileHeight + spacing);
    }

}

// 点数を描画
function drawPoints(point) {
    const textX0 = centerX;
    const textY0 = centerY;
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';

    ctx.fillText(point[0], textX0, textY0);

    const textX1 = centerX - 50;
    const textY1 = centerY - 50;
    ctx.fillText(point[1], textX1, textY1);

    const textX2 = centerX;
    const textY2 = centerY - 100;
    ctx.fillText(point[2], textX2, textY2);

    const textX3 = centerX + 50;
    const textY3 = centerY - 50;
    ctx.fillText(point[3], textX3, textY3);
}

// ツモ牌を描画
function drawSelf(tile, label) {
    const startX = 660;
    const startY = 500;
    const tileWidth = 40;
    const tileHeight = 60;

    const x = startX;
    const y = startY;

    ctx.fillStyle = tileColor(tile, label);
    ctx.fillRect(x, y, tileWidth, tileHeight);

    drawDora(tile, 10, x, y, tileWidth, tileHeight, label);
}

// 捨牌を描画
function drawTrash(trash0, trash1, trash2, trash3) {
    let startX = centerX - 100;
    let startY = centerY + 30;
    let tileWidth = 20;
    let tileHeight = 30;
    const spacing = 5;

    for (let i = 0; i < trash0.length; ++i) {
        if (trash0[i] === -1) break;
        let x = startX + (tileWidth + spacing) * (i % 8);
        let y = startY;

        if (Math.floor(i / 8) >= 1) {
            y += (tileHeight + 5);
        }
        if (Math.floor(i / 8) >= 2) {
            y += (tileHeight + 5);
        }
        if (Math.floor(i / 8) >= 3) {
            y += (tileHeight + 5);
        }

       ctx.fillStyle = tileColor(trash0, i);

        ctx.fillRect(x, y, tileWidth, tileHeight);

        drawDora(trash0, 5, x, y, tileWidth, tileHeight, i);
    }

    startX = centerX - 160;
    startY = centerY - 150;
    tileWidth = 30;
    tileHeight = 20;

    for (let i = 0; i < trash1.length; ++i) {
        if (trash1[i] === -1) {
            break;
        }
        let x = startX;
        let y = startY + (tileHeight + spacing) * (i % 8);

        if (Math.floor(i / 8) >= 1) {
            x -= (tileWidth + 5);
        }
        if (Math.floor(i / 8) >= 2) {
            x -= (tileWidth + 5);
        }
        if (Math.floor(i / 8) >= 3) {
            x -= (tileWidth + 5);
        }

        ctx.fillStyle = tileColor(trash1, i);

        ctx.fillRect(x, y, tileWidth, tileHeight);

        drawDora(trash1, 5, x, y, tileWidth, tileHeight, i);
    }

    startX = centerX + 80;
    startY = centerY - 170;
    tileWidth = 20;
    tileHeight = 30;

    for (let i = 0; i < trash2.length; ++i) {
        if (trash2[i] === -1) break;
        let x = startX - (tileWidth + spacing) * (i % 8);
        let y = startY;

        if (Math.floor(i / 8) >= 1) {
            y -= (tileHeight + 5);
        }
        if (Math.floor(i / 8) >= 2) {
            y -= (tileHeight + 5);
        }
        if (Math.floor(i / 8) >= 3) {
            y -= (tileHeight + 5);
        }

        ctx.fillStyle = tileColor(trash2, i);

        ctx.fillRect(x, y, tileWidth, tileHeight);

        drawDora(trash2, 5, x, y, tileWidth, tileHeight, i);
    }

    startX = centerX + 120;
    startY = centerY + 30;
    tileWidth = 30;
    tileHeight = 20;

    for (let i = 0; i < trash3.length; ++i) {
        if (trash3[i] === -1){
            break;
        }
        let x = startX;
        let y = startY - (tileHeight + spacing) * (i % 8);

        if (Math.floor(i / 8) >= 1) {
            x += (tileWidth + 5);
        }
        if (Math.floor(i / 8) >= 2) {
            x += (tileWidth + 5);
        }
        if (Math.floor(i / 8) >= 3) {
            x += (tileWidth + 5);
        }

        ctx.fillStyle = tileColor(trash3, i);

        ctx.fillRect(x, y, tileWidth, tileHeight);

        drawDora(trash3, 5, x, y, tileWidth, tileHeight, i);
    }
}

// ドラの白丸を描画
function drawDora(tile, radius, x, y, tileWidth, tileHeight, i) {
    if (tile[i] % 10 === 1) {
        ctx.beginPath();
        ctx.arc(x + tileWidth / 2, y + tileHeight / 2, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }
}

// 牌の色の抽出
function tileColor(tile, point) {
    let colorString = '';

    if (Math.floor((tile[point] % 1000) / 10) === 0) {
        colorString = 'yellow';
    } else if (Math.floor((tile[point] % 1000) / 10) === 1) {
        colorString = 'lime';
    } else if (Math.floor((tile[point] % 1000) / 10) === 2) {
        colorString = 'green';
    } else if (Math.floor((tile[point] % 1000) / 10) === 3) {
        colorString = 'cyan';
    } else if (Math.floor((tile[point] % 1000) / 10) === 4) {
        colorString = 'blue';
    } else if (Math.floor((tile[point] % 1000) / 10) === 5) {
        colorString = 'purple';
    } else if (Math.floor((tile[point] % 1000) / 10) === 6) {
        colorString = 'red';
    } else if (Math.floor((tile[point] % 1000) / 10) === 7) {
        colorString = 'pink';
    } else if (Math.floor((tile[point] % 1000) / 10) === 8) {
        colorString = 'orange';
    } else if (Math.floor((tile[point] % 1000) / 10) === 9) {
        colorString = 'bisque';
    } else if (Math.floor((tile[point] % 1000) / 10) === 10) {
        colorString = 'brown';
    } else if (Math.floor((tile[point] % 1000) / 10) === 11) {
        colorString = 'black';
    }

    return colorString;
}

function otherTurn(trashA, trashPointA, trashB, trashPointB) {
    // 再描画
    drawGame();

    // ロン上がり確認
    if (isReach) {
        isRon = checkWinOnRon(trashA, trashPointA, canWinTile, isSelfDraw);
        if (isRon) {
            deadIn = turn - 1;
            if (trashA[trashPointA] % 10 === 1) {
                doraPoint += 15;
            }
        }
    } else { // ポン処理
        if (canClaimTiles[Math.floor((trashA[trashPointA] % 1000) / 10)]) {
            duringSelect = true;
            isClaim = checkClaim(isClaim);
        }
    }

    if (isClaim) {
        claimCount = doClaim(trashA, trashPointA, hand, claimCount);
        drawGame();
        isClaim = false;
        duringClaim = true;
    } else if (duringClaim) {
        if (discardTile !== -1 
            && (Math.floor(hand[discardTile] / 1000) < 1 || Math.floor(hand[discardTile] / 1000) > 3)) {
            beforeReachDiscard(discardTile, trash0, hand);
            setClaim(hand, canClaimTiles, duringClaim);
            winPoint = scoreCalculation(hand, winPoint);
            turn = 1;
            duringClaim = false;
            if (isReach === false) {
                isReach = checkReach(winPoint, isReach);
            }
            if (isReach === true) {
                canWinTile = doReach(hand, canWinTile);
            }
            drawGame();
        }
    } else {
        trashPointA += 1;
        if (turn < 4) {
            trashB[trashPointB] = deck[deckHead];
            deckHead += 1;
            turn += 1
            if (!isRon) {
                drawGame();
            }
        } else {
            turn = 0;
        }

    }
    return trashPointA;
}

canvas.addEventListener('click', clickEvent);
//canvas.addEventListener('click', unPause);

// ユーザがクリックした牌を取得
function clickEvent(event) {
    const mouseX = event.clientX - canvas.offsetLeft;
    const mouseY = event.clientY - canvas.offsetTop;

    const startX = 70;
    const startY = 500;
    const tileWidth = 40;
    const tileHeight = 60;
    const spacing = 10;

    for (let i = 0; i < 11; ++i) {
        if (mouseX >= startX + (tileWidth + spacing) * i 
            && mouseX <= startX + tileWidth + (tileWidth + spacing) * i 
            && mouseY >= startY 
            && mouseY <= startY + tileHeight) {
            discardTile = i;
            break;
        }
    }

    if (mouseX >= 650 
        && mouseX <= 690 
        && mouseY >= 500 
        && mouseY <= 560) {
        discardTile = 11;
    }
}

// 描画の再開
/*
function unPause(event) {
    isPaused = false;
}*/
