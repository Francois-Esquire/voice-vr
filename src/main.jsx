import React from 'react';
import ReactDOM from 'react-dom';

import Voice from '.';

window.addEventListener('load', function startup() {
  const appElement = document.getElementById('root');

  ReactDOM.render(<Voice />, appElement);

  window.removeEventListener('load', startup);
});
