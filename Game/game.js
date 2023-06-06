var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var state = false;
var deckHead = 0;
var parent = 0;
var turn = 0;

canvas.width = 850;
canvas.height = 600;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

var hand = []; // 手牌
var deck = []; // 牌山
var trash0 = []; // 捨牌1~4
var trash1 = [];
var trash2 = [];
var trash3 = [];
var point = []; // 点数
var discardTile = -1; // 切り牌
var canClaimTiles = []; // ポンできる牌
var canWinTiles = []; // 上がれる牌
var isPossibleClaim = false; // ポンできるならtrue
var isClaim = false; // ポンするならtrue

// 初期化
const init = () => {

    // 牌山を初期化
    for (let i = 0; i < 144; ++i) {
        let tile = Math.floor(i / 12) * 10;
        if (i % 12 === 0) tile += 1;
        deck.push(tile);
    }

    // 牌山をランダムシャッフル
    shuffleArray(deck);

    // ユーザの手牌を配る
    for (let i = 0; i < 11; ++i) {
        hand.push(deck[deckHead]);
        deckHead += 4;
    }

    // ユーザの手牌を昇順でソート
    hand.sort((a, b) => a - b);

    // 点数を格納
    for (let i = 0; i < 4; ++i) {
        point.push(3000);
    }

    // テスト用に捨て牌格納
    for (let i = 0; i < 10; ++i) {
        trash0.push(deck[deckHead]);
        deckHead += 1;
        trash1.push(deck[deckHead]);
        deckHead += 1;
        trash2.push(deck[deckHead]);
        deckHead += 1;
        trash3.push(deck[deckHead]);
        deckHead += 1;
    }

    drawHandTiles(hand); // 手牌を描画
    drawPoints(point); // 点数を描画
    drawTrash(trash0, trash1, trash2, trash3); // 捨牌を描画
    turn = parent;
}

// 繰り返し処理
const loop = () => {

    // 再描画
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHandTiles(hand);
    drawPoints(point);
    drawTrash(trash0, trash1, trash2, trash3);

    // ユーザの切り番なら
    if (turn === 0) {

        // ツモ
        drawSelf(deck, deckHead);

        for (let i = 0; i < 11; ++i) {
            // 手牌とツモ牌を交換
            if (discardTile === i) {
                hand[i] = deck[deckHead];
                deckHead += 1;
                turn += 3
            }
        }

        // ツモ切り
        if (discardTile === 11) {
            deckHead += 1;
            turn += 3
        }
        discardTile = -1;
        SetClaim(hand, canClaimTiles); // ポン可能牌設定
        isPossibleClaim = false;
    }else {
        // 相手の切り番処理
        DiscardTileOrder(discardTile, canClaimTiles, canWinTiles, isPossibleClaim);
        if (isPossibleClaim) {
            // ロンするかの確認
            CheckClaim(discardTile, canClaimTiles, isClaim); // ポンするかの確認
        }
        if (isClaim) DoClaim(discardTile, hand); // ポン処理
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

// 手牌を描画
function drawHandTiles(hand) {
    var startX = 70;
    var startY = 500;
    var tileWidth = 40;
    var tileHeight = 60;
    const spacing = 10;

    for (let i = 0; i < hand.length; ++i) {
        const x = startX + (tileWidth + spacing) * i;
        const y = startY;

        if (Math.floor(hand[i] / 10) === 0) ctx.fillStyle = 'yellow';
        else if (Math.floor(hand[i] / 10) === 1) ctx.fillStyle = 'lime';
        else if (Math.floor(hand[i] / 10) === 2) ctx.fillStyle = 'green';
        else if (Math.floor(hand[i] / 10) === 3) ctx.fillStyle = 'cyan';
        else if (Math.floor(hand[i] / 10) === 4) ctx.fillStyle = 'blue';
        else if (Math.floor(hand[i] / 10) === 5) ctx.fillStyle = 'purple';
        else if (Math.floor(hand[i] / 10) === 6) ctx.fillStyle = 'red';
        else if (Math.floor(hand[i] / 10) === 7) ctx.fillStyle = 'pink';
        else if (Math.floor(hand[i] / 10) === 8) ctx.fillStyle = 'orange';
        else if (Math.floor(hand[i] / 10) === 9) ctx.fillStyle = 'bisque';
        else if (Math.floor(hand[i] / 10) === 10) ctx.fillStyle = 'brown';
        else if (Math.floor(hand[i] / 10) === 11) ctx.fillStyle = 'black';

        ctx.fillRect(x, y, tileWidth, tileHeight);

        if (hand[i] % 10 === 1) {
            const radius = 10;
            ctx.beginPath();
            ctx.arc(x + tileWidth / 2, y + tileHeight / 2, radius, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.closePath();
        }
    }
}

// 点数を描画
function drawPoints(point) {
    var textX0 = centerX;
    var textY0 = centerY + 50;
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';

    ctx.fillText(point[0], textX0, textY0);

    var textX1 = centerX - 50;
    var textY1 = centerY;
    ctx.fillText(point[1], textX1, textY1);

    var textX2 = centerX;
    var textY2 = centerY - 50;
    ctx.fillText(point[2], textX2, textY2);

    var textX3 = centerX + 50;
    var textY3 = centerY;
    ctx.fillText(point[3], textX3, textY3);
}

// ツモ牌を描画
function drawSelf(deck, deckHead) {
    var startX = 650;
    var startY = 500;
    var tileWidth = 40;
    var tileHeight = 60;

    const x = startX;
    const y = startY;

    if (Math.floor(deck[deckHead] / 10) === 0) ctx.fillStyle = 'yellow';
    else if (Math.floor(deck[deckHead] / 10) === 1) ctx.fillStyle = 'lime';
    else if (Math.floor(deck[deckHead] / 10) === 2) ctx.fillStyle = 'green';
    else if (Math.floor(deck[deckHead] / 10) === 3) ctx.fillStyle = 'cyan';
    else if (Math.floor(deck[deckHead] / 10) === 4) ctx.fillStyle = 'blue';
    else if (Math.floor(deck[deckHead] / 10) === 5) ctx.fillStyle = 'purple';
    else if (Math.floor(deck[deckHead] / 10) === 6) ctx.fillStyle = 'red';
    else if (Math.floor(deck[deckHead] / 10) === 7) ctx.fillStyle = 'pink';
    else if (Math.floor(deck[deckHead] / 10) === 8) ctx.fillStyle = 'orange';
    else if (Math.floor(deck[deckHead] / 10) === 9) ctx.fillStyle = 'bisque';
    else if (Math.floor(deck[deckHead] / 10) === 10) ctx.fillStyle = 'brown';
    else if (Math.floor(deck[deckHead] / 10) === 11) ctx.fillStyle = 'black';

    ctx.fillRect(x, y, tileWidth, tileHeight);
}

// 捨牌を描画
function drawTrash(trash0, trash1, trash2, trash3) {
    var startX = centerX - 100;
    var startY = centerY + 80;
    var tileWidth = 20;
    var tileHeight = 30;
    const spacing = 5;

    for (let i = 0; i < trash0.length; ++i) {
        let x = startX + (tileWidth + spacing) * (i % 8);
        let y = startY;

        if (Math.floor(i / 8) >= 1) y += (tileHeight + 5);
        if (Math.floor(i / 8) >= 2) y += (tileHeight + 5);
        if (i === 24) x = startX + (tileWidth + spacing) * i;

        if (Math.floor(trash0[i] / 10) === 0) ctx.fillStyle = 'yellow';
        else if (Math.floor(trash0[i] / 10) === 1) ctx.fillStyle = 'lime';
        else if (Math.floor(trash0[i] / 10) === 2) ctx.fillStyle = 'green';
        else if (Math.floor(trash0[i] / 10) === 3) ctx.fillStyle = 'cyan';
        else if (Math.floor(trash0[i] / 10) === 4) ctx.fillStyle = 'blue';
        else if (Math.floor(trash0[i] / 10) === 5) ctx.fillStyle = 'purple';
        else if (Math.floor(trash0[i] / 10) === 6) ctx.fillStyle = 'red';
        else if (Math.floor(trash0[i] / 10) === 7) ctx.fillStyle = 'pink';
        else if (Math.floor(trash0[i] / 10) === 8) ctx.fillStyle = 'orange';
        else if (Math.floor(trash0[i] / 10) === 9) ctx.fillStyle = 'bisque';
        else if (Math.floor(trash0[i] / 10) === 10) ctx.fillStyle = 'brown';
        else if (Math.floor(trash0[i] / 10) === 11) ctx.fillStyle = 'black';

        ctx.fillRect(x, y, tileWidth, tileHeight);

        if (hand[i] % 10 === 1) {
            const radius = 5;
            ctx.beginPath();
            ctx.arc(x + tileWidth / 2, y + tileHeight / 2, radius, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.closePath();
        }
    }

    startX = centerX - 160;
    var startY = centerY - 100;
    var tileWidth = 30;
    var tileHeight = 20;

    for (let i = 0; i < trash1.length; ++i) {
        let x = startX;
        let y = startY + (tileHeight + spacing) * (i % 8);

        if (Math.floor(i / 8) >= 1) x -= (tileWidth + 5);
        if (Math.floor(i / 8) >= 2) x -= (tileWidth + 5);
        if (i === 24) y = startY + (tileHeight + spacing) * i;

        if (Math.floor(trash1[i] / 10) === 0) ctx.fillStyle = 'yellow';
        else if (Math.floor(trash1[i] / 10) === 1) ctx.fillStyle = 'lime';
        else if (Math.floor(trash1[i] / 10) === 2) ctx.fillStyle = 'green';
        else if (Math.floor(trash1[i] / 10) === 3) ctx.fillStyle = 'cyan';
        else if (Math.floor(trash1[i] / 10) === 4) ctx.fillStyle = 'blue';
        else if (Math.floor(trash1[i] / 10) === 5) ctx.fillStyle = 'purple';
        else if (Math.floor(trash1[i] / 10) === 6) ctx.fillStyle = 'red';
        else if (Math.floor(trash1[i] / 10) === 7) ctx.fillStyle = 'pink';
        else if (Math.floor(trash1[i] / 10) === 8) ctx.fillStyle = 'orange';
        else if (Math.floor(trash1[i] / 10) === 9) ctx.fillStyle = 'bisque';
        else if (Math.floor(trash1[i] / 10) === 10) ctx.fillStyle = 'brown';
        else if (Math.floor(trash1[i] / 10) === 11) ctx.fillStyle = 'black';

        ctx.fillRect(x, y, tileWidth, tileHeight);

        if (hand[i] % 10 === 1) {
            const radius = 5;
            ctx.beginPath();
            ctx.arc(x + tileWidth / 2, y + tileHeight / 2, radius, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.closePath();
        }
    }

    var startX = centerX + 80;
    var startY = centerY - 120;
    var tileWidth = 20;
    var tileHeight = 30;

    for (let i = 0; i < trash2.length; ++i) {
        let x = startX - (tileWidth + spacing) * (i % 8);
        let y = startY;

        if (Math.floor(i / 8) >= 1) y -= (tileHeight + 5);
        if (Math.floor(i / 8) >= 2) y -= (tileHeight + 5);
        if (i === 24) x = startX - (tileWidth + spacing) * (i % 8);

        if (Math.floor(trash2[i] / 10) === 0) ctx.fillStyle = 'yellow';
        else if (Math.floor(trash2[i] / 10) === 1) ctx.fillStyle = 'lime';
        else if (Math.floor(trash2[i] / 10) === 2) ctx.fillStyle = 'green';
        else if (Math.floor(trash2[i] / 10) === 3) ctx.fillStyle = 'cyan';
        else if (Math.floor(trash2[i] / 10) === 4) ctx.fillStyle = 'blue';
        else if (Math.floor(trash2[i] / 10) === 5) ctx.fillStyle = 'purple';
        else if (Math.floor(trash2[i] / 10) === 6) ctx.fillStyle = 'red';
        else if (Math.floor(trash2[i] / 10) === 7) ctx.fillStyle = 'pink';
        else if (Math.floor(trash2[i] / 10) === 8) ctx.fillStyle = 'orange';
        else if (Math.floor(trash2[i] / 10) === 9) ctx.fillStyle = 'bisque';
        else if (Math.floor(trash2[i] / 10) === 10) ctx.fillStyle = 'brown';
        else if (Math.floor(trash2[i] / 10) === 11) ctx.fillStyle = 'black';

        ctx.fillRect(x, y, tileWidth, tileHeight);

        if (hand[i] % 10 === 1) {
            const radius = 5;
            ctx.beginPath();
            ctx.arc(x + tileWidth / 2, y + tileHeight / 2, radius, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.closePath();
        }
    }

    startX = centerX + 120;
    var startY = centerY + 80;
    var tileWidth = 30;
    var tileHeight = 20;

    for (let i = 0; i < trash3.length; ++i) {
        let x = startX;
        let y = startY - (tileHeight + spacing) * (i % 8);

        if (Math.floor(i / 8) >= 1) x += (tileWidth + 5);
        if (Math.floor(i / 8) >= 2) x += (tileWidth + 5);
        if (i === 24) y = startY + (tileHeight + spacing) * i;

        if (Math.floor(trash3[i] / 10) === 0) ctx.fillStyle = 'yellow';
        else if (Math.floor(trash3[i] / 10) === 1) ctx.fillStyle = 'lime';
        else if (Math.floor(trash3[i] / 10) === 2) ctx.fillStyle = 'green';
        else if (Math.floor(trash3[i] / 10) === 3) ctx.fillStyle = 'cyan';
        else if (Math.floor(trash3[i] / 10) === 4) ctx.fillStyle = 'blue';
        else if (Math.floor(trash3[i] / 10) === 5) ctx.fillStyle = 'purple';
        else if (Math.floor(trash3[i] / 10) === 6) ctx.fillStyle = 'red';
        else if (Math.floor(trash3[i] / 10) === 7) ctx.fillStyle = 'pink';
        else if (Math.floor(trash3[i] / 10) === 8) ctx.fillStyle = 'orange';
        else if (Math.floor(trash3[i] / 10) === 9) ctx.fillStyle = 'bisque';
        else if (Math.floor(trash3[i] / 10) === 10) ctx.fillStyle = 'brown';
        else if (Math.floor(trash3[i] / 10) === 11) ctx.fillStyle = 'black';

        ctx.fillRect(x, y, tileWidth, tileHeight);

        if (hand[i] % 10 === 1) {
            const radius = 5;
            ctx.beginPath();
            ctx.arc(x + tileWidth / 2, y + tileHeight / 2, radius, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.closePath();
        }
    }
}

canvas.addEventListener('click', clickEvent);

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
            console.log(i);
            discardTile = i;
            break;
        }
    }

    if (mouseX >= 650 && mouseX <= 690 && mouseY >= 500 && mouseY <= 560) {
        console.log(11);
        discardTile = 11;
    }
}