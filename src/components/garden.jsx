import React from 'react';
import Herbs from './herbs';

export default ({herbs=[], gardenName, onSelect, onSelectCard}) => (
  <div>
    <span>{gardenName + ':'}</span>
    <Herbs 
      herbs={herbs}
      onSelect={onSelectCard}
    />
    <button
      onClick={(e) => {
        e.preventDefault();
        onSelect();
      }}
    >
      Select {gardenName}
    </button>

  </div>
)
