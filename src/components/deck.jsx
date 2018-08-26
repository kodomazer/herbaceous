import React from 'react';
import Herb from './herb';
import Herbs from './herbs';

export default ({activeCard, onDraw}) => {
  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          onDraw();
        }}
      >
        Draw
      </button>
      <Herbs herbs={[activeCard]}/>
      {
        // <Herb herb={activeCard}/>
      }
    </div>
  );
}
