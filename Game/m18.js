/*
Designer:高橋匠
Date    :2023.6.10
Purpose :まんじゃらシステム
*/

/*
<<<<<<< HEAD
Function Name:AfterReachDiscard
=======
Function Name:afterReachDiscard
>>>>>>> a0d6b38a9a7a468c19ca9fe1618491a7b075add1
Designer     :高橋匠
Date         :2023.6.10
Function     :ユーザの切り番で，ツモ牌のみを打牌する．
*/

function afterReachDiscard(trash0, trashPoint, hand) {
    hand[11] -= 9000;
    trash0[trashPoint0] = hand[11];
    trashPoint0 += 1;
}