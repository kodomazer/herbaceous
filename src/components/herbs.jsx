import React from 'react';
import Herb from './herb';

export default ({id, herbs}) => (
  <ul>
    {herbs.map(herb => <Herb herb={herb}/>)}
  </ul>
)
