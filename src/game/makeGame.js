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
