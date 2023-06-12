/*
Designer:小泉遼太
Date    :2023.6.13
Purpose :まんじゃらシステム
*/

/*
Function Name:SelfDrawDivision
Designer     :小泉遼太
Date         :2023.6.13
Function     :次にツモする牌を手牌に配る
*/

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