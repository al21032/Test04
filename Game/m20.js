/*
Designer:深井悠稀
Date    :2023.6.11
Purpose :まんじゃらシステム
*/

/*
Function Name:clickTrash
Designer     :深井悠稀
Date         :2023.6.11
Function     :クリックした牌を捨てる
*/
//呼び出すときはcanvas.addEventListener('click', ClickTrash);
function clickTrash(event){
    {
        var mouseX = event.clientX - canvas.offsetLeft;
        var mouseY = event.clientY - canvas.offsetTop;
        
        var startX = 70;
        var startY = 500;
        var tileWidth = 40;
        var tileHeight = 60;
        const spacing = 10;
        //ここでは手牌のうちの左から11枚の組を選択した時の処理.一番右牌山の牌は入れない
        for(let i = 0; i < 11; ++i){
            //ここのif文では選択した物がタイルか判定している.なので余白の部分をクリックしても反応がない
            if (
                mouseX >= startX + (tileWidth + spacing) * i 
                && mouseX <= startX + tileWidth + (tileWidth + spacing) * i 
                && mouseY >= startY 
                && mouseY <= startY + tileHeight
            )
            {
                trash0.push(hand[i]);
                hand[i] = deck[deckHead];
                deckHead += 1;
                drawSelf(deck, deckHead);
                drawHandTiles(hand);
                drawTrash(trash0, trash1, trash2, trash3);
                console.log("success");
                break;
            }
        }
    }
}