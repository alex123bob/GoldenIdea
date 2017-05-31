import React, { Component } from 'react';
import Sidebar from 'containers/sidebar/sidebar';
import ContentCt from 'containers/contentct/index';
import Home from 'components/home';

// Locale related
import { addLocaleData, IntlProvider } from 'react-intl';
import localeData from 'locale-data';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

// Styles
import './styles.scss';

addLocaleData(localeData);

const { locale, messages } = __I18N__;

class App extends Component {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <IntlProvider
                locale={ locale }
                messages={ messages }
            >
                <div className='main-app'>
                    <Sidebar />
                    <Route exact path='/' component={Home} />
                    <Route path='/:module' component={ContentCt} />
                </div>
            </IntlProvider>
        );
    }
}

App.propTypes = {
    match: PropTypes.object.isRequired,
};

export default App;
