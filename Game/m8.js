/*
Designer:高橋匠
Date    :2023.6.10
Purpose :まんじゃらシステム
*/

/*
<<<<<<< HEAD
Function Name:SelfDrawRequest
=======
Function Name:selfDrawRequest
>>>>>>> a0d6b38a9a7a468c19ca9fe1618491a7b075add1
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