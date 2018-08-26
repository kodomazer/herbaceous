import React from 'react';
import herbNames from '../constants/herbs';

export default ({herb: {id, type} ={}}) => {
  if (typeof type === 'string') {
    return (
      <li className={'herb'}>
        {herbNames[type]}
        <div>id: {id}</div>
      </li>
    );
  } else {
    return null;
  }
}
