import React from 'react';
import Garden from './garden';

export default ({onSelect, player: {id, privateGarden}={}, self}) => (
  <div onClick={()=>{}/*onSelect*/}>
    <Garden
      gardenName={self ? 'Your Garden' : 'Player ' + id + '\'s Private Garden'}
      onSelect={onSelect}
      herbs={privateGarden}/>
    {/*render pots*/}
  </div>
)
