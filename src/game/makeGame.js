import { Game } from 'boardgame.io/core';
import Potting from './Potting';
import Planting from './Planting';

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
      ...Planting.moves(),
      pass(G, ctx){
        ctx.events.endPhase('planting');
        return G;
      },
      pot(G,ctx,cards,pot){
        var selected = Potting.sanitize(cards);
        if (!Potting.validate(
          selected,
          G.players[ctx.currentPlayer].privateGarden,
          G.communityGarden
        )) {
          return;
        }
        //TODO: Pot plants if valid
        var player = {...G.players[ctx.currentPlayer]};
        player[pot] = selected;
        player.privateGarden = player.privateGarden.filter(
          (card) =>{
            return selected.reduce((acc,sCard)=>{
              return acc && (sCard.type!==card.type || sCard.id !== card.id)
            },
            true)
          }
        )
        var publicGarden = G.publicGarden.filter(
          (card) =>{
            return selected.reduce((acc,sCard)=>{
              return acc && (sCard.type!==card.type || sCard.id !== card.id)
            },
            true)
          }
        )
        var players = {...G.players};
        players[ctx.currentPlayer] = player;
        return {...G,players,publicGarden};
        
      }
    },
    flow: {
      phases:[
        {
          name: "startGame",
          onTurnBegin:(G,ctx)=>{
            return {...G,deck:ctx.random.Shuffle(G.deck)};
          }
        },
        {
          name: "potting",
          allowedMoves: [
            'pot',
            'select',
            'pass',
          ],
        },
        Planting.phase(),
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
  
  
  return Herb;
};

export default makeGame;
