// ツモ確定
function SelfDrawDivision() {
    if(wallExist){
        // 牌山からツモする
        hand.push(deck[deckHead]);
        deckHead += 1;

        // 手牌をソート
        hand.sort((a, b) => a - b);

        // 手牌を再描画する
        drawHandTiles(hand);
    }
}