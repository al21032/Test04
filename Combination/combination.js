var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = 850;
canvas.height = 1500;

function draw() {
    // キャンバスのクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 役名と点数のデータ
    const combinations = [
        {   name: "カラフルセット", score: 90   },
        {   name: "3-3-3-3セット",  score: 120  },
        {   name: "6-3-3セット",    score: 210  },
        {   name: "6-6セット",      score: 270  },
        {   name: "9-3セット",      score: 360  },
        {   name: "4-4-4セット",    score: 180  },
        {   name: "8-4セット",      score: 360  },
        {   name: "1色セット",      score: 600  }
    ];

    const colorData = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],     // カラフル
        [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3],       // 3-3-3-3
        [4, 4, 4, 4, 4, 4, 5, 5, 5, 2, 2, 2],       // 6-3-3
        [6, 6, 6, 6, 6, 6, 9, 9, 9, 9, 9, 9],       // 6-6
        [7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 3, 3],       // 9-3
        [10, 10, 10, 10, 1, 1, 1, 1, 2, 2, 2, 2],       // 4-4-4
        [8, 8, 8, 8, 8, 8, 8, 8, 1, 1, 1, 1],       // 8-4
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]        // 1色
    ];

    // 牌の幅と高さ
    const tileWidth = 40;
    const tileHeight = 60;

    // 描画開始位置
    let x = 50;
    let y = 50;

    // 役の要素を描画
    for (let i = 0; i < combinations.length; i++) {
        const combination = combinations[i];

        // 色情報を黒に戻す
        ctx.fillStyle = 'black';

        // 役名の描画
        ctx.font = '20px Arial';
        ctx.fillText(combination.name, x, y);

        // 点数の描画
        ctx.fillText(combination.score + ' 点', x + 400, y);

        // 牌の描画
        const colors = colorData[i];
        for (let j = 0; j < 12; j++) {
            const colorIndex = colors[j];
            const color = getColorByIndex(colorIndex);

            ctx.fillStyle = color;
            ctx.fillRect(x, y + 30, tileWidth, tileHeight);
            x += tileWidth + 5;
        }
        // 次の役描画位置を設定
        x = 50;
        y += 120;
    }
    ctx.font = '25px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('星付き牌1つにつき', 600, 40);
    ctx.fillText('15点上がる', 600, 65);
}

function getColorByIndex(index) {
    const colors = [
        'yellow', 'lime', 'green', 'cyan', 'blue', 'purple',
        'red', 'pink', 'orange', 'bisque', 'brown', 'black'
    ];
    return colors[index];
}

draw();