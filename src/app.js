import React from 'react';
import Sidebar from 'containers/sidebar/sidebar';
import ContentCt from 'containers/contentct/index';

// Locale related
import { addLocaleData, IntlProvider } from 'react-intl';
import localeData from 'locale-data';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

// Styles
import './styles.scss';

addLocaleData(localeData);

const { locale, messages } = __I18N__;

const App = ({ match }) => (
    <IntlProvider
        locale={ locale }
        messages={ messages }
    >
        <div className='main-app'>
            <Sidebar />
            <Route path='/:module' component={ContentCt} />
        </div>
    </IntlProvider>
);

App.propTypes = {
    match: PropTypes.object.isRequired
};

export default App;
