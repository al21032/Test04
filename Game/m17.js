/*
Designer:高橋匠
Date    :2023.6.10
Purpose :まんじゃらシステム
*/

/*
Function Name:beforeReachDiscard
Designer     :高橋匠
Date         :2023.6.10
Function     :ユーザの切り番で，任意の牌を打牌する．
*/

function beforeReachDiscard(discardTile, trash0, trashPoint0, hand) {
    trash0[trashPoint0] = hand[discardTile];
    trashPoint0 += 1;

<<<<<<< HEAD
    if (Math.floor(hand[11] / 1000) === 9) {
        hand[11] -= 9000;
    }
    hand[discardTile] = hand[11];
    hand[11] = 9999;
    hand.sort((a, b) => a - b);
=======
    if (Math.floor(hand[11] / 1000) === 9) hand[11] -= 9000;
    hand[discardTile] = hand[11];
    hand[11] = 9999;
    hand.sort((a, b) => a - b);
    
>>>>>>> a0d6b38a9a7a468c19ca9fe1618491a7b075add1
}