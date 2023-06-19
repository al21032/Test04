/*
Designer:高橋匠
Date    :2023.6.10
Purpose :まんじゃらシステム
*/

/*
Function Name:selfDrawRequest
Designer     :高橋匠
Date         :2023.6.10
Function     :牌山が残っていれば，canSelfDrawをtrueにする．
*/

function selfDrawRequest(deckHead) {
    if (deckHead < 144) {
        canSelfDraw = true;
    } else {
        canSelfDraw = false;
    }
}