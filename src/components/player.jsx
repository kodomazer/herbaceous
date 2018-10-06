import React from 'react';
import Garden from './garden';
const noop = ()=>{}

export default ({onSelect, onSelectCard=noop, onSelectPot=noop, player: {id, privateGarden, ...pots}={}, self}) => (
  <div onClick={()=>{}/*onSelect*/}>
    <Garden
      gardenName={self ? 'Your Garden' : 'Player ' + id + '\'s Private Garden'}
      onSelect={onSelect}
      onSelectCard={onSelectCard}
      herbs={privateGarden}/>
    {pots.map(
      ({name, herbs}) => (<Garden
        gardenName={name}
        onSelect={onSelectPot}
        onSelectCard={onSelectCard}
        herbs={herbs}
      />)
    )}
  </div>
)
