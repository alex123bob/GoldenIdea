import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import NewIdea from 'containers/newidea';

require('./styles.scss');

class ContentCt extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        contentTitle: PropTypes.object.isRequired,
    }

    getComponent(module) {
        let cmp;
        switch (module) {
            case 'ihaveideas':
                cmp = NewIdea;
                break;
            default:
                break;
        }
        return cmp;
    }

    render() {
        return (
            <div className='content-ct'>
                <div className='content-title'>
                    {this.props.contentTitle.name}
                </div>
                <div>
                    <Route exact path='/:module' component={this.getComponent(this.props.match.params.module)} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    contentTitle: state.contentTitle,
});

export default connect(mapStateToProps)(ContentCt);
