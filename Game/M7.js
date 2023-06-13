/*
Designer:屋雄弥
Date    :2023.6.13
Purpose :まんじゃらシステム
*/

/*
Function Name:ScoreCalculation
Designer     :屋雄弥
Date         :2023.6.13
Function     :アガリ点を決める
*/

function ScoreCalculation(hand){
    let theNumberOfStar=0;
    var tentativeHand=[12];
    //星付きの数を判定
    for(let i=0; i<11; ++i){
        if(hand[i]%2==1){
            theNumberOfStar++;
            tentativeHand[i]=((hand[i]-1)%1000)/10
        }
        else{
            tentativeHand[i]=(hand[i]%1000)/10;
        }
    }
    tentativeHand.sort();
    //役判定　エラー時は-1を返す
    for(let i=0; i<10; ++i){
        if(tentativeHand[i]==tentativeHand[i+1]){
            break;
        }
        if(i==10){
            return 90+15*theNumberOfStar;
        }
    }
    const firstLastIndex=tentativeHand.lastIndexOf(hands[0]);
    if(firstLastIndex==11){
        return 600+15*theNumberOfStar;
    }
    else{
        if(firstLastIndex==8){
            if(tentativeHand[9]==tentativeHand[11]){
                return 360+15*theNumberOfStar;
            }
            else {
                return -1;
            }
        }
        else if(firstLastIndex==7){
            if(tentativeHand[8]==tentativeHand[11]){
                return 360+15*theNumberOfStar;
            }
            else {
                return -1;
            }
        }
        else if(firstLastIndex==5){
            if(tentativeHand[6]==tentativeHand[11]){
                return 270+15*theNumberOfStar;
            }
            else if((tentativeHand[6]==tentativeHand[8])&&(tentativeHand[9]==tentativeHand[11])){
                return 210+15*theNumberOfStar;
            }
            else {
                return -1;
            }
        }
        else if(firstLastIndex==3){
            if(tentativeHand[4]==tentativeHand[11]){
                return 360+15*theNumberOfStar;
            }
            else if((tentativeHand[4]==tentativeHand[7])&&(tentativeHand[8]==tentativeHand[11])){
                return 180+15*theNumberOfStar;
            }
            else {
                return -1;
            }
        }
        else if(firstLastIndex==2){
            if(tentativeHand[3]==tentativeHand[11]){
                return 360+15*theNumberOfStar;
            }
            else if((tentativeHand[5]==tentativeHand[6])||(tentativeHand[8]==tentativeHand[9])){
                return 210+15*theNumberOfStar;
            }
            else if((tentativeHand[3]==tentativeHand[5])&&(tentativeHand[6]==tentativeHand[8])&&(tentativeHand[9]==tentativeHand[11])){
                120+15*theNumberOfStar;
            }
            else {
                return -1;
            }
        }
        else{
            return -1;
        }
    }
}
