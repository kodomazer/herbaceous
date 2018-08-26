import React from 'react';
import Herbs from './herbs';

export default ({herbs=[], gardenName, onSelect}) => (
  <div>
    <span>{gardenName + ':'}</span>
    <Herbs herbs={herbs}/>
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
