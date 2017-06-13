import { Form, Input, Button, Modal } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

class Comment extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    ideaId: PropTypes.number.isRequired,
    loadComments: PropTypes.func.isRequired
  }

  addComment(params) {
    fetch('/comment/add', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then((res) => res.json())
    .then((resJson) => {
      if (resJson.status === 'successful') {
        const modal = Modal.success({
          title: '成功',
          content: '评论提交成功，谢谢您的支持！'
        });
        this.props.form.resetFields();
        this.props.loadComments();
        setTimeout(() => modal.destroy(), 1500);
      } else if (resJson.status === 'failing') {
        Modal.error({
          title: '错误',
          content: '错误信息为' + resJson.content
        });
      }
    });
  }

  submitHandler(e) {
    e.preventDefault();
    const cmp = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.addComment({
          ...values,
          ideaId: cmp.props.ideaId
        });
      } else {
        console.log(err);
      }
    });
  }

  // end of interacting with backend interface

  createInputField(id, errMsg, placeholderTxt, inputType = 'text') {
    const { getFieldDecorator } = this.props.form;
    return getFieldDecorator(id, {
      rules: [{
        required: true,
        message: errMsg,
      }],
    })(<Input
      type={inputType}
      placeholder={placeholderTxt}
      { ...inputType === 'textarea' ? { rows: 6 } : undefined}
    />);
  }

  render() {
    return (
      <Form
        onSubmit={this.submitHandler.bind(this)}
      >
        <FormItem
          label="标题"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
        >
          {this.createInputField('title', '评论标题不能为空!', '请输入标题')}
        </FormItem>
        <FormItem
          label="作者"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
        >
          {this.createInputField('author', '评论作者不能为空!', '请输入作者')}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 8, offset: 4 }}
        >
          {this.createInputField('content', '评论内容不能为空', '内容...', 'textarea')}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 8, offset: 4 }}
        >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const CommentForm = Form.create()(Comment);

export default CommentForm;
