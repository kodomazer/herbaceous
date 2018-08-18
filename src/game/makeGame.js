import { Game } from 'boardgame.io/core';

function makeGame(playerCount) {
  console.log('making game with '+playerCount+' players.');
  // TODO use playerCount to set up different Game rules here

  const MakeDeck = () => {
    var deck= [];
    var currentCard = {id:0,type:'a'};
    for (var i = 0;i<7;i++) {
      for (var j = 0;j<9;j++) {
        deck.push(currentCard);
        currentCard = nextCard(currentCard);
      }
      currentCard=nextCardType(currentCard);
    }
    currentCard = setCardType(currentCard,'1');
    for (i = 1;i<4;i++) {
      for (j = 0;j<3;j++) {
        deck.push(currentCard);
        currentCard = nextCard(currentCard);
      }
      currentCard=nextCardType(currentCard);
    }
    return deck;
  };

  function MakePlayers(playerCount){
	  let players = [];
    for(let i = 1;i<=playerCount;i++){
      players.push(makePlayer(i));
    }
    return players;
  }
  
  const Herb = Game({
    setup: () => {
      let deck = MakeDeck();
	  let players = MakePlayers(playerCount);
      return {
        deck,
        players,
        communityGarden:[],
        activeCard:null,
      };
    },

    moves: {
      shuffle(G, ctx) {
        let deck = [...G.deck]; // don't mutate original state.
        for(var i = deck.length-1;i>0;i--){

          var j = Math.floor(ctx.random.Number() * (i + 1));
          var temp = deck[i];
          deck[i] = deck[j];
          deck[j] = temp;
        }
        return { ...G, deck }; // don't mutate original state.
      },
      pass(G, ctx){
        ctx.events.endPhase();
        return G;
      },
      plantPrivate(G, ctx){
        //Copy things we need to mutate
        let active = ctx.currentPlayer;
        let players = {...G.players};
        let player = {...players[active]};
        let privateGarden = [...player.privateGarden];
        let communityGarden = [...G.communityGarden];
        //draw a card from the deck
        let draw = drawCard(G.deck);
        
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
        let draw = drawCard(G.deck);
        
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
    },
    flow: {
      phases:[
        {
          name: "potting-phase",
          allowedMoves: [
            'pot',
            'select',
            'pass',
          ],
          onTurnBegin:(G, ctx)=>{
            var draw = drawCard(G.deck);
            return {...G,deck:draw.deck,activeCard:draw.card};
          }
        },
        {
          name: "planting",
          allowedMoves: [
            'plantPrivate',
            'plantCommunity',
          ],
        },
      ],
    },
  });
  
  function nextCardType(current){
    return {
		...current,
		type:String.fromCharCode(current.type.charCodeAt(0)+1),
	};
  }
  function nextCard(current){
    return {
      ...current,
      id:current.id+1,
    }
  }
  function setCardType(current,type){
    return {
		...current,
		type:type,
	};
  }

  function makePlayer(playerID){
    return {
      id:playerID,
      privateGarden:[],
      largePot:[],
      woodenPlanter:[],
      smallPots:[],
      glassJar:[],
    }
  }
  
  function drawCard(deck){
    return {deck:deck.slice(1,deck.length+1),card:deck[0]};
  }
  
  return Herb;
};

export default makeGame;
