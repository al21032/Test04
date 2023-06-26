/*
Designer:高橋匠
Date    :2023.6.10
Purpose :まんじゃらシステム
*/

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