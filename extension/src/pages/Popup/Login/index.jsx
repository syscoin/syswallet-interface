import React from 'react';
import { render } from 'react-dom';

import Login from './Login';

render(<Login />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
