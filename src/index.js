// Polyfills
import './polyfills';

// Vendor libraries
import React from 'react';
import { render } from 'react-dom';

// Project components
import Root from './root';

render(
    <Root />,
    document.getElementById('root')
);
