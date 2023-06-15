var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var state = false;
var deckHead;
var parent = -1;
var turn;

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
var isPaused; // 描画を停止中ならtrue
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
    time = 0;
    canWinTile = -1;
    isPossibleClaim = false;
    isClaim = false;
    duringClaim = false;
    winPoint = 0;
    doraPoint = 0;
    isReach = false;
    canSelfDraw = true;
    isPaused = false;
    isSelfDraw = false;
    isRon = false;
    deadIn = -1;
    claimCount = 0;
    canEnd = false;

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
}

// timeout用
const pauseDrawing = (duration) => {
    const startTime = Date.now();
    while(Data.now() - starttime < duration) {
        ;
    }
}

// 繰り返し処理
const loop = () => {
    if (isPaused) {
        setTimeout(loop, 100);
    }else if (parent === 4) { // 親が1周したか．
        if (canEnd) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawEndGame(point);
            for (let i = 0; i < 4; ++i) {
                point[i] = 3000;
            }
            parent = 0;
        }
        canEnd = true;
        isPaused = true;
    }
    // 牌山が残っているか．
    SelfDrawRequest(deckHead);
    if (isPaused) {
        setTimeout(loop, 100);
    } else {
        if (isSelfDraw) { // ツモ上がりなら
            if (hand[11] % 10 === 1) doraPoint += 15;
            for (let i = 0; i < 11; ++i) {
                if (hand[i] % 10 === 1) doraPoint += 15;
            }
            winPoint += doraPoint;
            drawWin(winPoint);
            point[0] += winPoint;
            for (let i = 1; i <= 3; ++i) {
                point[i] -= winPoint / 3;
            }
            setTimeout(loop, 1)
            init();
        } else if (isRon) { // ロン上がりなら
            for (let i = 0; i < 11; ++i) {
                if (hand[i] % 10 === 1) doraPoint += 15;
            }
            winPoint += doraPoint;
            drawWin(winPoint);
            point[0] += winPoint;
            point[deadIn] -= winPoint;
            setTimeout(loop, 1)
            init();
        } else if (!canSelfDraw) { // 牌山が残っていないなら
            drawDrawnGame();
            init();
            
        } else {
            SetClaim(hand, canClaimTiles);

            if (turn === 0) { // ユーザの切り番なら
                // 再描画
                drawGame();
                // ツモする
                hand[11] = SelfDrawDecision(deck, deckHead, hand);

                // ツモ牌を描画
                drawSelf(hand, 11);

                // ツモ上がり確認
                isSelfDraw = checkWinonSelfDraw(hand, canWinTile);

                if (discardTile !== -1 && (Math.floor(hand[discardTile] / 1000) < 1 || Math.floor(hand[discardTile] / 1000) > 3)) {
                    if (isReach === false) BeforeReachDiscard(discardTile, trash0, trashPoint0, hand);
                    else AfterReachDiscard(trash0, trashPoint0, hand)
                } else {
                    discardTile = -1;
                }

                SetClaim(hand, canClaimTiles);
    
                // 打牌した牌が鳴かれるか
                DiscardTileOrder (discardTile, canClaimTiles, canWinTile, isPossibleClaim)

                // 打牌した牌が鳴かれないなら，切り番を遷移する．
                if (discardTile != -1 && !isPossibleClaim) {
                    turn = 1;
                    winPoint = ScoreCalculation(hand, winPoint);
                    if (isReach === false) isReach = CheckReach(winPoint, isReach);
                    if (isReach === true) canWinTile = DoReach(hand, canWinTile);

                    if (!isSelfDraw) drawGame();
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

                if (parent === 2 && trashPoint2 === 0) otherTurn(trash1, trashPoint1, trash2, trashPoint2);
                else trashPoint1 = otherTurn(trash1, trashPoint1, trash2, trashPoint2);

            } else if (turn === 3) {

                if (parent === 3 && trashPoint3 === 0) otherTurn(trash2, trashPoint2, trash3, trashPoint3);
                else trashPoint2 = otherTurn(trash2, trashPoint2, trash3, trashPoint3);

            } else if (turn == 4) {

                trashPoint3 = otherTurn(trash3, trashPoint3, trash0, trashPoint0);

            }
        }
        // 画面の任意の位置をクリックして描画を進める．
        isPaused = true;

        setTimeout(loop, 1);
        discardTile = -1;
    }
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
        var x = 405;
        var y = 310;
        var width = 40;
        var height = 6;

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

    var textX = centerX;
    var textY = centerY - 30;
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';

    ctx.fillText('終局', textX, textY);

    var judge = true;
    for (let i = 1; i <= 3; ++i) {
        if (point[0] < point[i]) judge = false;
    }

    if (judge) {
        ctx.fillStyle = 'white';
        ctx.fillRect(315, 325, 220, 60);

        var textX = centerX;
        var textY = centerY + 70;
        ctx.font = '50px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';

        ctx.fillText('YOU WIN', textX, textY);
    } else {
        ctx.fillStyle = 'white';
        ctx.fillRect(315, 325, 220, 60);

        var textX = centerX;
        var textY = centerY + 70;
        ctx.font = '50px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';

        ctx.fillText('YOU LOSE', textX, textY);
    }

    ctx.fillStyle = 'white';
    ctx.fillRect(315, 375, 220, 60);

    var textX = centerX;
    var textY = centerY + 120;
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';

    ctx.fillText(point[0] + 'points', textX, textY);
}

// 流れたときの描画
function drawDrawnGame() {
    ctx.fillStyle = 'white';
    ctx.fillRect(365, 225, 120, 60);

    var textX = centerX;
    var textY = centerY - 30;
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';

    ctx.fillText('流局', textX, textY);
}

// 上がりの描画
function drawWin(winPoint) {
    ctx.fillStyle = 'white';
    ctx.fillRect(280, 225, 300, 60);

    var textX = centerX;
    var textY = centerY - 30;
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';

    ctx.fillText('+' + winPoint + 'points', textX, textY);
}


// 手牌を描画
function drawHandTiles(hand) {
    // 見せてない牌の描画
    var startX = 70;
    var startY = 500;
    var tileWidth = 40;
    var tileHeight = 60;
    var spacing = 10;

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

    var y = startY;

    for (let i = 0; i < 3; ++i) {
        var x = startX;
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
    var textX0 = centerX;
    var textY0 = centerY;
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';

    ctx.fillText(point[0], textX0, textY0);

    var textX1 = centerX - 50;
    var textY1 = centerY - 50;
    ctx.fillText(point[1], textX1, textY1);

    var textX2 = centerX;
    var textY2 = centerY - 100;
    ctx.fillText(point[2], textX2, textY2);

    var textX3 = centerX + 50;
    var textY3 = centerY - 50;
    ctx.fillText(point[3], textX3, textY3);
}

// ツモ牌を描画
function drawSelf(tile, label) {
    var startX = 660;
    var startY = 500;
    var tileWidth = 40;
    var tileHeight = 60;

    const x = startX;
    const y = startY;

    ctx.fillStyle = tileColor(tile, label);

    ctx.fillRect(x, y, tileWidth, tileHeight);

    drawDora(tile, 10, x, y, tileWidth, tileHeight, label);
}

// 捨牌を描画
function drawTrash(trash0, trash1, trash2, trash3) {
    var startX = centerX - 100;
    var startY = centerY + 30;
    var tileWidth = 20;
    var tileHeight = 30;
    const spacing = 5;

    for (let i = 0; i < trash0.length; ++i) {
        if (trash0[i] === -1) break;
        let x = startX + (tileWidth + spacing) * (i % 8);
        let y = startY;

        if (Math.floor(i / 8) >= 1) y += (tileHeight + 5);
        if (Math.floor(i / 8) >= 2) y += (tileHeight + 5);
        if (Math.floor(i / 8) >= 3) y += (tileHeight + 5);

        ctx.fillStyle = tileColor(trash0, i);

        ctx.fillRect(x, y, tileWidth, tileHeight);

        drawDora(trash0, 5, x, y, tileWidth, tileHeight, i);
    }

    startX = centerX - 160;
    var startY = centerY - 150;
    var tileWidth = 30;
    var tileHeight = 20;

    for (let i = 0; i < trash1.length; ++i) {
        if (trash1[i] === -1) break;
        let x = startX;
        let y = startY + (tileHeight + spacing) * (i % 8);

        if (Math.floor(i / 8) >= 1) x -= (tileWidth + 5);
        if (Math.floor(i / 8) >= 2) x -= (tileWidth + 5);
        if (Math.floor(i / 8) >= 3) x -= (tileWidth + 5);

        ctx.fillStyle = tileColor(trash1, i);

        ctx.fillRect(x, y, tileWidth, tileHeight);

        drawDora(trash1, 5, x, y, tileWidth, tileHeight, i);
    }

    var startX = centerX + 80;
    var startY = centerY - 170;
    var tileWidth = 20;
    var tileHeight = 30;

    for (let i = 0; i < trash2.length; ++i) {
        if (trash2[i] === -1) break;
        let x = startX - (tileWidth + spacing) * (i % 8);
        let y = startY;

        if (Math.floor(i / 8) >= 1) y -= (tileHeight + 5);
        if (Math.floor(i / 8) >= 2) y -= (tileHeight + 5);
        if (Math.floor(i / 8) >= 3) y -= (tileHeight + 5);

        ctx.fillStyle = tileColor(trash2, i);

        ctx.fillRect(x, y, tileWidth, tileHeight);

        drawDora(trash2, 5, x, y, tileWidth, tileHeight, i);
    }

    startX = centerX + 120;
    var startY = centerY + 30;
    var tileWidth = 30;
    var tileHeight = 20;

    for (let i = 0; i < trash3.length; ++i) {
        if (trash3[i] === -1) break;
        let x = startX;
        let y = startY - (tileHeight + spacing) * (i % 8);

        if (Math.floor(i / 8) >= 1) x += (tileWidth + 5);
        if (Math.floor(i / 8) >= 2) x += (tileWidth + 5);
        if (Math.floor(i / 8) >= 3) x += (tileWidth + 5);

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
    var colorString = '';

    if (Math.floor((tile[point] % 1000) / 10) === 0) colorString = 'yellow';
    else if (Math.floor((tile[point] % 1000) / 10) === 1) colorString = 'lime';
    else if (Math.floor((tile[point] % 1000) / 10) === 2) colorString = 'green';
    else if (Math.floor((tile[point] % 1000) / 10) === 3) colorString = 'cyan';
    else if (Math.floor((tile[point] % 1000) / 10) === 4) colorString = 'blue';
    else if (Math.floor((tile[point] % 1000) / 10) === 5) colorString = 'purple';
    else if (Math.floor((tile[point] % 1000) / 10) === 6) colorString = 'red';
    else if (Math.floor((tile[point] % 1000) / 10) === 7) colorString = 'pink';
    else if (Math.floor((tile[point] % 1000) / 10) === 8) colorString = 'orange';
    else if (Math.floor((tile[point] % 1000) / 10) === 9) colorString = 'bisque';
    else if (Math.floor((tile[point] % 1000) / 10) === 10) colorString = 'brown';
    else if (Math.floor((tile[point] % 1000) / 10) === 11) colorString = 'black';

    return colorString;
}

function otherTurn(trashA, trashPointA, trashB, trashPointB) {
    // 再描画
    drawGame();

    // ロン上がり確認
    if (isReach) {
        isRon = checkWinonRon(trashA, trashPointA, canWinTile);
        if (isRon) {
            deadIn = turn - 1;
            if (trashA[trashPointA] % 10 === 1) doraPoint += 15;
        }
    } else { // ポン処理
        if (canClaimTiles[Math.floor((trashA[trashPointA] % 1000) / 10)]) {
            duringSelect = true;
            isClaim = CheckClaim(isClaim);
        }
    }

    if (isClaim) {
        claimCount = DoClaim(trashA, trashPointA, hand, claimCount);
        drawGame();
        isClaim = false;
        duringClaim = true;
    } else if (duringClaim) {
        if (discardTile !== -1 && (Math.floor(hand[discardTile] / 1000) < 1 || Math.floor(hand[discardTile] / 1000) > 3)) {
            BeforeReachDiscard(discardTile, trash0, trashPoint0, hand);
            SetClaim(hand, canClaimTiles, duringClaim);
            winPoint = ScoreCalculation(hand, winPoint);
            turn = 1;
            duringClaim = false;
            if (isReach === false) isReach = CheckReach(winPoint, isReach);
            if (isReach === true) canWinTile = DoReach(hand, canWinTile);
            drawGame();
        }
    } else {
        trashPointA += 1;
        if (turn < 4) {
            trashB[trashPointB] = deck[deckHead];
            deckHead += 1;
            turn += 1
            if (!isRon) drawGame();
        } else {
            turn = 0;
        }

    }

    return trashPointA;
}

canvas.addEventListener('click', clickEvent);
canvas.addEventListener('click', unPause);

// ユーザがクリックした牌を取得
function clickEvent(event) {
    var mouseX = event.clientX - canvas.offsetLeft;
    var mouseY = event.clientY - canvas.offsetTop;

    var startX = 70;
    var startY = 500;
    var tileWidth = 40;
    var tileHeight = 60;
    const spacing = 10;

    for (let i = 0; i < 11; ++i) {
        if (
            mouseX >= startX + (tileWidth + spacing) * i && mouseX <= startX + tileWidth + (tileWidth + spacing) * i &&
            mouseY >= startY && mouseY <= startY + tileHeight
        ){
            discardTile = i;
            break;
        }
    }

    if (mouseX >= 650 && mouseX <= 690 && mouseY >= 500 && mouseY <= 560) {
        discardTile = 11;
    }
}

// 描画の再開
function unPause(event) {
    isPaused = false;
}
