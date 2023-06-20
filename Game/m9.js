/*
<<<<<<< HEAD
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
=======
Designer:高橋匠
Date    :2023.6.10
Purpose :まんじゃらシステム
*/
>>>>>>> ddd78e012f7f7fafc1338540471761d4aa312cb3

/*
Function Name:SelfDrawDecision
Designer     :高橋匠
Date         :2023.6.10
Function     :牌山が残っていれば，ユーザがツモをする．
*/

function SelfDrawDecision(deck, deckHead, hand) {
    hand[11] = deck[deckHead] + 9000;
    deckHead += 1;
    return hand[11];
}