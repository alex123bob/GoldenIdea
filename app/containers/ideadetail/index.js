import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'antd';
import { connect } from 'react-redux';

class IdeaDetail extends Component {
  static propTypes = {
    activeIdea: PropTypes.object.isRequired
  }
  createIdeaTitle(activeIdea) {
    const rec = activeIdea;
    return '标题: ' + rec.title + '; 作者: ' + rec.author + '; ' + rec.createTime;
  }
  createIdeaContent(activeIdea) {
    return activeIdea.content.split(/\n/g).map((item, index) => {
      return (
        <p key={index}>{item}</p>
      );
    });
  }
  render() {
    return (
      <div>
        <Card title={this.createIdeaTitle(this.props.activeIdea.activeIdea)} extra={<a href="javascript:void(0)">More</a>} style={{ width: '100%' }}>
          {this.createIdeaContent(this.props.activeIdea.activeIdea)}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeIdea: state.activeIdeaReducer
});

export default connect(mapStateToProps)(IdeaDetail);
