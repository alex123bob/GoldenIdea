import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon } from 'antd';
import PropTypes from 'prop-types';
const { Header } = Layout;

class HeaderCt extends Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    activeMenuItem: PropTypes.object.isRequired,
    activeIdea: PropTypes.object,
    menuItems: PropTypes.array.isRequired
  }
  renderIdeaCategory(activeIdea) {
    let category;
    this.props.menuItems.forEach((item) => {
      if (item.id === activeIdea.type) {
        category = item.name;
        return false;
      }
    });
    return category;
  }
  renderHeader() {
    const activeMenuItem = this.props.activeMenuItem.activeMenuItem;
    const activeIdea = this.props.activeIdea.activeIdea;
    let category;
    if (activeMenuItem) {
      category = activeMenuItem.name;
    } else if (activeIdea) {
      category = this.renderIdeaCategory(activeIdea);
    } else {
      category = '最新金点子';
    }
    return category;
  }
  render() {
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Icon
          className="trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />
        {this.renderHeader()}
      </Header>
    );
  }
}

const mapStateToProps = (state) => ({
  activeMenuItem: state.activeMenuItemReducer,
  activeIdea: state.activeIdeaReducer,
  menuItems: state.siderReducer
});

export default connect(mapStateToProps)(HeaderCt);
