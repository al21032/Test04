/*
Designer:小泉遼太
Date    :2023.6.13
Purpose :まんじゃらシステム
*/

/*
Function Name:SelfDrawRequest
Designer     :小泉遼太
Date         :2023.6.13
Function     :ツモができるかどうか判定する
*/

function SelfDrawRequest() {
    // 牌山に牌があればtrue, なければfalse
    if(deckHead == 143) wallExist = false;
    else    wallExist = true;
};