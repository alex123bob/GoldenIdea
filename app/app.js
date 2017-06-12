import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
const { Content } = Layout;
import SiderMenu from './containers/sider';
import HeaderCt from './containers/header';
import styles from './app.css';
import NewIdea from './containers/newidea';
import ProfessionIdea from './containers/profession';
import TeambuildingIdea from './containers/teambuilding';
import PoliceassuranceIdea from './containers/policeassurance';
import LawandruleIdea from './containers/lawandrule';
import ScientificenhancementIdea from './containers/scientificenhancement';
import WebsiteconstructionIdea from './containers/websiteconstruction';
import IdeaDetail from './containers/ideadetail';
import LatestIdea from './containers/latest';
import IdeaTable from './containers/ideatable';

class App extends Component {
  static propTypes = {
    activeMenuItem: PropTypes.object.isRequired,
    activeIdea: PropTypes.object.isRequired
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
    const activeIdea = this.props.activeIdea.activeIdea;
    let ct;
    if (activeMenuItem) {
      switch (activeMenuItem.id) {
      case 'ihaveideas':
        ct = <NewIdea />;
        break;
      case 'profession':
        ct = <ProfessionIdea type={activeMenuItem.id} updateTime={Date.now()} />;
        break;
      case 'teambuilding':
        ct = <TeambuildingIdea type={activeMenuItem.id} updateTime={Date.now()} />;
        break;
      case 'policeassurance':
        ct = <PoliceassuranceIdea type={activeMenuItem.id} updateTime={Date.now()} />;
        break;
      case 'lawandrule':
        ct = <LawandruleIdea type={activeMenuItem.id} updateTime={Date.now()} />;
        break;
      case 'scientificenhancement':
        ct = <ScientificenhancementIdea type={activeMenuItem.id} updateTime={Date.now()} />;
        break;
      case 'websiteconstruction':
        ct = <WebsiteconstructionIdea type={activeMenuItem.id} updateTime={Date.now()} />;
        break;
      case 'latest':
        ct = <LatestIdea type={activeMenuItem.id} updateTime={Date.now()} />;
        break;
      default:
        ct = <IdeaTable />;
        break;
      }
    } else if (activeIdea) {
      ct = <IdeaDetail />;
    } else {
      // show latest panel by default.
      ct = <LatestIdea type="latest" updateTime={Date.now()} />;
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
  activeMenuItem: state.activeMenuItemReducer,
  activeIdea: state.activeIdeaReducer
});

export default connect(mapStateToProps)(App);
