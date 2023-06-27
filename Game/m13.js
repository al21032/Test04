<<<<<<< HEAD
function checkReach(winPoint, isReach) {
    if (winPoint > 0) {
        if (confirm('リーチしますか?')) {
            isReach = true; // リーチするならtrueを格納.
        } else {
            isReach = false;
        }
=======
/*
Designer:高橋匠
Date    :2023.6.10
Purpose :まんじゃらシステム
*/

/*
Function Name:checkReach
Designer     :高橋匠
Date         :2023.6.10
Function     :上がり時に役があるならリーチをするか確認する
*/

function checkReach(winPoint, isReach) {
    if (winPoint > 0) {
        if (confirm('リーチしますか?')) isReach = true; // リーチするならtrueを格納.
        else isReach = false;
>>>>>>> a0d6b38a9a7a468c19ca9fe1618491a7b075add1
    }
    return isReach;
}