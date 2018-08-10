import { Game } from 'boardgame.io/core';

function makeGame(playerCount) {
  console.log('making game with '+playerCount+' players.');
  // TODO use playerCount to set up different Game rules here

  const MakeDeck = () => {
    var deck= Array(72).fill(null);
    var index = 0;
    var code = {ID:0,type:'a'};
    for (var i = 0;i<7;i++) {
      for (var j = 0;j<9;j++) {
        deck[index]=code;
        index++;
        code = nextCard(code);
      }
      code=nextType(code);
    }
    code = setType(code,'1');
    for (i = 1;i<4;i++) {
      for (j = 0;j<3;j++) {
        deck[index] = code;
        index++;
        code = nextCard(code);
      }
      code=nextType(code);
    }
    return deck;
  };

  const Herb = Game({
    setup: () => {
      let deck = MakeDeck();
      return {deck};
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
  
  function nextType(current){
    return {
		...current,
		type:String.fromCharCode(current.type.charCodeAt(0)+1),
	};
  }
  function nextCard(current){
    return {
      ...current,
      ID:current.ID+1,
    }
  }
  function setType(current,type){
    return {
		...current,
		type:type,
	};
  }

  return Herb;
};

export default makeGame;
