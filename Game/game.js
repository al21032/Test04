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
const hand = []     // 手牌
const deck = []     // 牌山
const trash0 = []   // 捨て牌1-4
const trash1 = []
const trash2 = []
const trash3 = []
const point = []    // 点数
var discardTile = -1;   // 切り牌

const init = () => {
    // deckに牌を格納
    for (let i = 0; i < 144; ++i) {
        let tile = Math.floor(i / 12) * 10;
        // 各色1つずつ星をつける処理
        if (i % 12 === 0) tile += 1;
        deck.push(tile);
    }
    // 牌山をシャッフル
    shuffleArray(deck);
    // ユーザの手牌を配る
    for (let i = 0; i < 11; ++i) {
        hand.push(deck[deckHead]);
        deckHead += 4;
    }

    // 手牌のソート
    hand.sort((a, b) => a - b);
    //parent = Math.floor(Math.random() * 4);
    for (let i = 0; i < 4; ++i) {
        point.push(3000);
    }
    drawHandTiles(hand);
    drawPoints(point);
    turn = parent;
}
// 抜け出す処理は後で
const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHandTiles(hand);
    drawPoints(point);
    if (turn === 0) {
        drawSelf();
        for (let i = 0; i < 11; ++i) {
            if (discardTile === i) {
                hand[i] = deck[deckHead];
                deckHead += 1;
                turn += 3
            }
        }
        if (discardTile === 11) {
            deckHead += 1;
            turn += 3
        }
    }else {
        discardTile = -1;
    }
}
init();
loop();
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
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
    }
}
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
function drawSelf() {
    var startX = 650;
    var startY = 500;
    var tileWidth = 40;
    var tileHeight = 60;
    const x = startX;
    const y = startY;
    if (Math.floor(hand[deckHead] / 10) === 0) ctx.fillStyle = 'yellow';
    else if (Math.floor(hand[deckHead] / 10) === 1) ctx.fillStyle = 'lime';
    else if (Math.floor(hand[deckHead] / 10) === 2) ctx.fillStyle = 'green';
    else if (Math.floor(hand[deckHead] / 10) === 3) ctx.fillStyle = 'cyan';
    else if (Math.floor(hand[deckHead] / 10) === 4) ctx.fillStyle = 'blue';
    else if (Math.floor(hand[deckHead] / 10) === 5) ctx.fillStyle = 'purple';
    else if (Math.floor(hand[deckHead] / 10) === 6) ctx.fillStyle = 'red';
    else if (Math.floor(hand[deckHead] / 10) === 7) ctx.fillStyle = 'pink';
    else if (Math.floor(hand[deckHead] / 10) === 8) ctx.fillStyle = 'orange';
    else if (Math.floor(hand[deckHead] / 10) === 9) ctx.fillStyle = 'bisque';
    else if (Math.floor(hand[deckHead] / 10) === 10) ctx.fillStyle = 'brown';
    else if (Math.floor(hand[deckHead] / 10) === 11) ctx.fillStyle = 'black';
    ctx.fillRect(x, y, tileWidth, tileHeight);
}
canvas.addEventListener('click', clickEvent);
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