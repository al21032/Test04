/*
Designer:高橋匠
Date    :2023.6.10
Purpose :まんじゃらシステム
*/

/*
Function Name:BeforeReachDiscard
Designer     :高橋匠
Date         :2023.6.10
Function     :ユーザの切り番で，ツモ牌のみを打牌する．
*/

function AfterReachDiscard(trash0, trashPoint, hand) {
    hand[11] -= 9000;
    trash0[trashPoint0] = hand[11];
    trashPoint0 += 1;
}