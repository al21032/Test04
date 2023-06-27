/*
Designer    :森本直寛
Date        :2023.6.20
Purpose     :まんじゃらシステム
*/

/*
Function Name   :cheakReach
Designer        :森本直寛
Date            :2023.6.20
Function        :ユーザがリーチ可能なら，リーチするかどうかを確認する．
Return          :true リーチする, false リーチしない
*/

function cheakReach(winPoint, isReach) {
    if (winPoint > 0) {
        if (window.confirm('リーチしますか？')) {
            isReach = true;
        } else {
            isReach = false;
        }  
    }
    return isReach;
}