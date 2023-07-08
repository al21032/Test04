/*
Designer    :森本直寛
Date        :2023.6.20
Purpose     :まんじゃらシステム
*/

/*
Function Name   :beforeReachDiscard
Designer        :森本直寛
Date            :2023.6.20
Function        :ユーザの切り番で，牌を打牌する．
*/

function beforeReachDiscard(discardTile, trash0, trashPoint, hand) {
    trash0[trashPoint0] = hand[discardTile];
    trashPoint0 += 1;
    if (Math.floor(hand[11] / 1000) === 9) {
        hand[11] -= 9000;
    }
    hand[discardTile] = hand[11];
    hand[11] = 9999;
    hand.sort((a, b) => a - b);
}
