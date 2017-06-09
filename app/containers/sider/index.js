import React, { Component } from 'react';
import { Menu, Layout, Icon } from 'antd';
import styles from './sider.css';
const { Sider } = Layout;
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectMenuItem from './action';

class SiderMenu extends Component {

  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    menuItems: PropTypes.array.isRequired,
    selectMenuItem: PropTypes.func.isRequired
  }

  selectItemHandler(item) {
    if (this.props.selectMenuItem) {
      // fetch('/api').then(function() {
      //   console.log(arguments);
      // });
      this.props.selectMenuItem({
        name: item.domEvent.target.textContent,
        id: item.key
      });
    }
  }

  createMenuItems() {
    return this.props.menuItems.map((item) => {
      return (
        <Menu.Item key={item.id}>
          <Icon type={item.icon} />
          <span className="nav-text">{item.name}</span>
        </Menu.Item>
      );
    });
  }

  render() {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <div className="logo">{this.props.collapsed ? '' : '金点子'}</div>
        <Menu theme="dark" mode="inline" onSelect={this.selectItemHandler.bind(this)}>
          {this.createMenuItems()}
        </Menu>
      </Sider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    menuItems: state.siderReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectMenuItem: selectMenuItem
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu);
