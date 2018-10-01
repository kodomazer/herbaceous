import React from 'react';
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
    </div>
  );
}
