import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
const { Content } = Layout;
import SiderMenu from './containers/sider';
import HeaderCt from './containers/header';
import styles from './app.css';
import NewIdea from './containers/newidea';

class App extends Component {
  static propTypes = {
    activeMenuItem: PropTypes.object.isRequired
  }
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  createCmp() {
    const activeMenuItem = this.props.activeMenuItem.activeMenuItem;
    let ct = <div>Content</div>;
    if (activeMenuItem) {
      switch (activeMenuItem.id) {
      case 'ihaveideas':
        ct = <NewIdea />;
        break;

      default:
        ct = <div>Empty</div>;
        break;
      }
    }
    return ct;
  }
  render() {
    return (
      <Layout
        className={[styles.app, 'ant-layout-has-sider'].join(' ')}
      >
        <SiderMenu collapsed={this.state.collapsed} />
        <Layout>
          <HeaderCt collapsed={this.state.collapsed} toggle={this.toggle} />
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {this.createCmp()}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  activeMenuItem: state.activeMenuItemReducer
});

export default connect(mapStateToProps)(App);
