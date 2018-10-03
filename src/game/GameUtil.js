
var GameUtil = {
  drawCard(deck){
    return {deck:deck.slice(1,deck.length+1),card:deck[0]};
  },
}


export default GameUtil;
