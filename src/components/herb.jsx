import React from 'react';
import herbNames from '../constants/herbs';

export default ({herb: {id, type}}) => {
  return (
    <li className={'herb'}>
      {herbNames[type]}
    </li>
  );
}
