import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

require('./styles.scss');

class ContentCt extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        contentTitle: PropTypes.object.isRequired,
    }

    render() {
        return (
            <div className='content-ct'>
                <div className='content-title'>
                    {this.props.contentTitle.name}
                </div>
                <div>
                    {this.props.match.params.module}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    contentTitle: state.contentTitle,
});

export default connect(mapStateToProps)(ContentCt);
