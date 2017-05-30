import React, { Component } from 'react';
import PropTypes from 'prop-types';

require('./styles.scss');

class ContentCt extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired
    }

    render() {
        return (
            <div className="content-ct">
                {this.props.match.params.module}
            </div>
        );
    }
}

export default ContentCt;
