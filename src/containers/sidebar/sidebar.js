import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectMenuItem } from './actionCreators';
import { Menu, Icon } from 'antd';
import MenuItems from '../../common/menuitems';
import './styles.scss';

const menuItems = [
    ...MenuItems,
    {
        id: 'ihaveideas',
        defaultMessage: '我有金点子',
        description: 'I have ideas module',
    },
];

export class Sidebar extends Component {
    static propTypes = {
        className: PropTypes.string,
        selMenuItem: PropTypes.func.isRequired,
    };

    onSelectHandler = (e) => {
        const id = e.key;
        if (this.props.selMenuItem) {
            this.props.selMenuItem(id);
        }
    };

    createMenuItem() {
        const len = menuItems.length;
        const unit = Math.floor(100 / len);
        return menuItems.map((item, e) => (
            <Menu.Item key={item.id} style={{ height: `${unit}%` }}>
                <Link to={`/${item.id}`}>
                    <Icon type='menu-unfold' /> {item.defaultMessage}
                </Link>
            </Menu.Item>
        ));
    }

    render() {
        return (
            <Menu
                className='main-menu'
                mode='inline'
                onClick={this.onSelectHandler}
            >
                {this.createMenuItem()}
            </Menu>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selMenuItem: selectMenuItem,
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(Sidebar);
