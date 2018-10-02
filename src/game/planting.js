import GameUtil from './util';

var Planting = {
  moves(){
    return moves;
  },
  phase(){
    return {
      name: "planting",
      allowedMoves: [
        'plantPrivate',
        'plantCommunity',
      ],
      onTurnBegin:(G, ctx)=>{
        var draw = GameUtil.drawCard(G.deck);
        return {...G,deck:draw.deck,activeCard:draw.card};
      },
    };
  }
}

var moves = {
  plantPrivate(G, ctx){
    //Copy things we need to mutate
    let active = ctx.currentPlayer;
    let players = {...G.players};
    let player = {...players[active]};
    let privateGarden = [...player.privateGarden];
    let communityGarden = [...G.communityGarden];
    //draw a card from the deck
    let draw = GameUtil.drawCard(G.deck);
    
    //add the first card to the private garden
    privateGarden.push(G.activeCard);
    //Add the next card to the Community
    communityGarden.push(draw.card);
    
    //Update the player object and array
    player.privateGarden = privateGarden;
    players[active] = player;
    
    //Update game state
    ctx.events.endPhase();
    ctx.events.endTurn();
    return {
      ...G,
      players,
      deck:draw.deck,
      communityGarden,
      activeCard:null
    };
  },
  plantCommunity(G, ctx){
    //Copy things we need to mutate
    let active = ctx.currentPlayer;
    let players = {...G.players};
    let player = {...players[active]};
    let privateGarden = [...player.privateGarden];
    let communityGarden = [...G.communityGarden];
    //draw a card from the deck
    let draw = GameUtil.drawCard(G.deck);
    
    //add the first card to the community garden
    communityGarden.push(G.activeCard);
    //Add the next card to the private garden
    privateGarden.push(draw.card);
    
    //Update the player object and array
    player.privateGarden = privateGarden;
    players[active] = player;
    
    //Update game state
    ctx.events.endPhase();
    ctx.events.endTurn();
    return {
      ...G,
      players,
      deck:draw.deck,
      communityGarden,
      activeCard:null
    };
  },
}


export default Planting;
