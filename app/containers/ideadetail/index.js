import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'antd';
import { connect } from 'react-redux';

class IdeaDetail extends Component {
  static propTypes = {
    activeIdea: PropTypes.object.isRequired
  }
  createIdeaContent(activeIdea) {
    return activeIdea.content.split(/\n/g).map((item, index) => {
      return (
        <p key={index}>{item}</p>
      );
    });
  }
  createIdeaFootnote(activeIdea) {
    return (
      <span>
        {activeIdea.author}
        &nbsp;&nbsp;
        <a href="javascript:void(0)">{activeIdea.createTime}</a>
      </span>
    );
  }
  render() {
    return (
      <div>
        <Card
          title={this.props.activeIdea.activeIdea.title}
          extra={this.createIdeaFootnote(this.props.activeIdea.activeIdea)}
          style={{ width: '100%' }}
        >
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
