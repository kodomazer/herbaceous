import GameUtil from './GameUtil';

var Planting = {
  moves(){
    return moves;
  },
  phase(){
    return [
      plantingPhase,
      {
        ...plantingPhase,
        name: 'startPhase',
        endPhaseIf: (G,ctx) => {
          if (G.gardenRemaining.length === 1)
            if (ctx.turn+1 < ctx.numPlayers){
              ctx.events.endTurn();
              return 'startPhase';
            }
            else {
              ctx.events.endTurn();
              return 'potting';
            }
        },
      },
    ];
  }
}

var plantingPhase = {
  name: "planting",
  allowedMoves: [
    'plantPrivate',
    'plantCommunity',
  ],
  onPhaseBegin: (G,ctx)=>{
      var draw = GameUtil.drawCard(G.deck);
      return {...G,deck:draw.deck,activeCard:draw.card,gardenRemaining:['private','public']};
  },
  onMove: (G,ctx)=>{
    if(G.gardenRemaining.length>0){
      var draw = GameUtil.drawCard(G.deck);
      return {...G,deck:draw.deck,activeCard:draw.card};
    }
  },
  onPhaseEnd: (G,ctx) => {
    var game = moves.plant(G,ctx,G.gardenRemaining[0]);
    return {...game,gardenRemaining:undefined};
  },
  endPhaseIf: (G,ctx) => {
    if(G.gardenRemaining.length === 1){
      ctx.events.endTurn();
      return 'potting';
    }
  },
};

var moves = {
  plant(G, ctx, garden){
    //TODO constants
    if(garden === 'private')
      return moves.plantPrivate(G,ctx);
    return moves.plantCommunity(G,ctx);
  },
  plantPrivate(G, ctx){
    //Copy things we need to mutate
    let active = ctx.currentPlayer;
    let players = {...G.players};
    let player = {...players[active]};
    let privateGarden = [...player.privateGarden];
    
    //add the first card to the private garden
    privateGarden.push(G.activeCard);
    player.privateGarden = privateGarden;
    players[active] = player;
    
    return {
      ...G,
      players,
      activeCard:null,
      gardenRemaining:['public'],
    };
  },
  plantCommunity(G, ctx){
    //Copy things we need to mutate
    let communityGarden = [...G.communityGarden];
    
    //add the first card to the community garden
    communityGarden.push(G.activeCard);
    
    return {
      ...G,
      communityGarden,
      activeCard:null,
      gardenRemaining:['private'],
    };
  },
}


export default Planting;
