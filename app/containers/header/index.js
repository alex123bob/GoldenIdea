import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon } from 'antd';
import PropTypes from 'prop-types';
const { Header } = Layout;

class HeaderCt extends Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    activeMenuItem: PropTypes.object.isRequired
  }
  render() {
    const activeMenuItem = this.props.activeMenuItem.activeMenuItem;
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Icon
          className="trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />
        {activeMenuItem ? activeMenuItem.name : '最新金点子'}
      </Header>
    );
  }
}

const mapStateToProps = (state) => ({
  activeMenuItem: state.activeMenuItemReducer
});

export default connect(mapStateToProps)(HeaderCt);