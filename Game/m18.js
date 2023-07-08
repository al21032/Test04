/*
Designer    :森本直寛
Date        :2023.6.20
Purpose     :まんじゃらシステム
*/

/*
Function Name   :afterReachDiscard
Designer        :森本直寛
Date            :2023.6.20
Function        :打牌した後の操作を行う
*/

function afterReachDiscard(trash0, trashPoint, hand) {
    hand[11] -= 9000;
    trash0[trashPoint0] = hand[11];
    trashPoint0 += 1;
}