import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectMenuItem } from './actionCreators';

import './styles.scss';

const menuItems = [
    {
        id: 'latest',
        defaultMessage: '最新金点子',
        description: 'The latest golden idea fetched from db',
    },
    {
        id: 'profession',
        defaultMessage: '业务工作',
        description: 'Golden ideas related to profession',
    },
    {
        id: 'teambuilding',
        defaultMessage: '队伍建设',
        description: 'Golden ideas relevant to teambuilding',
    },
    {
        id: 'policeassurance',
        defaultMessage: '警务保障',
        description: 'Golden ideas related to police affairs\'s assurance',
    },
    {
        id: 'lawandrule',
        defaultMessage: '法律法规',
        description: 'Golden ideas related to laws and rules',
    },
    {
        id: 'scientificenhancement',
        defaultMessage: '科技强警',
        description: 'Golden ideas related to scientific enhancement module',
    },
    {
        id: 'websiteconstruction',
        defaultMessage: '网站建设',
        description: 'Golden ideas relevant to website construction',
    },
];

export class Menu extends Component {
    static propTypes = {
        className: PropTypes.string,
        selMenuItem: PropTypes.func.isRequired,
    };

    onSelectHandler = (item) => {
        if (this.props.selMenuItem) {
            this.props.selMenuItem(item.id);
        }
    };

    createMenuItem() {
        return menuItems.map((item, e) => (
            <div key={item.id}>
                <Link to={'/' + item.id + ''} onClick={this.onSelectHandler.bind(this, item)}>
                    {item.defaultMessage}
                </Link>
            </div>
        ));
    }

    render() {
        return (
            <div className='main-menu'>
                {this.createMenuItem()}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selMenuItem: selectMenuItem,
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(Menu);
