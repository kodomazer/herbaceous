import React from 'react';
import Garden from './garden';

export default ({onSelect, player: {id, privateGarden}}) => (
  <div onClick={()=>{}/*onSelect*/}>
    <button onClick={onSelect}> Garden number {id} </button>
    <Garden herbs={privateGarden}/>
    {/*render pots*/}
  </div>
)
