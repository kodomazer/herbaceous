import React from 'react';
import classNames from 'classnames';
import herbNames from '../constants/herbs';

export default ({herb: {id, type, selected} ={}}, onSelect) => {
  if (typeof type === 'string') {
    var classname = classNames('herb', {'selected': selected});
    return (
      <li className={classname}
        onClick={(e) => {
          e.preventDefault();
          onSelect(id);
        }}
      >
        {herbNames[type]}
        <div>id: {id}</div>
      </li>
    );
  } else {
    return null;
  }
}
