import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { connect } from 'react-redux';
import CommentForm from '../../components/commentform';

class IdeaDetail extends Component {
  static propTypes = {
    activeIdea: PropTypes.object.isRequired
  }
  componentDidMount() {
    this.loadComments();
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

  loadComments() {
    fetch('/comment/get/' + this.props.activeIdea.activeIdea.id, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(resJson => {
        if (resJson.status === 'successful') {
          let arr = resJson.content;
          this.setState({
            comments: arr
          });
        }
      });
  }

  renderComments() {
    if (this.state && this.state.comments) {
      if (this.state.comments.length > 0) {
        return this.state.comments.map((item, index) => {
          if (item.content.split) {
            item.content = item.content.split(/\n/g).map((content, i) => {
              return (
                <p key={item.id + '-' + index + '-' + i}>{content}</p>
              );
            });
            item.content.push(
              <p key={item.id + '-' + index + '-author'} style={{ textAlign: 'right' }}>{item.author}</p>,
              <p key={item.id + '-' + index + '-ip'} style={{ textAlign: 'right' }}><a href="javascript:void(0);">{item.ip}</a></p>
            );
          }
          return (
            <Card
              title={item.title}
              extra={<a href="javascript:void(0)">{item.createTime}</a>}
              style={{ width: '100%' }}
              key={item.id + '-' + index}
            >
              {item.content}
            </Card>
          );
        });
      } else {
        return <div>还没有评论哦~~~</div>
      }
    }
  }

  render() {
    return (
      <div>
        <h3>金点子:</h3>
        <br />
        <Card
          title={this.props.activeIdea.activeIdea.title}
          extra={this.createIdeaFootnote(this.props.activeIdea.activeIdea)}
          style={{ width: '100%' }}
        >
          {this.createIdeaContent(this.props.activeIdea.activeIdea)}
        </Card>
        <br />
        <h3>评论:</h3>
        <br />
        {this.renderComments()}
        <br />
        <CommentForm loadComments={this.loadComments.bind(this)} ideaId={this.props.activeIdea.activeIdea.id} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeIdea: state.activeIdeaReducer
});

export default connect(mapStateToProps)(IdeaDetail);
