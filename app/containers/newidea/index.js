import { Form, Select, Input, Button, Modal } from 'antd';
import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const Option = Select.Option;

class NewIdea extends Component {
  static propTypes = {
    form: PropType.object.isRequired,
    menuItems: PropType.array.isRequired
  }

  // interact with backend interface

  addIdea(params) {
    fetch('/idea/add', {
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
          content: '金点子提交成功，谢谢您的支持！'
        });
        this.props.form.resetFields();
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.addIdea(values);
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

  createSelectOptions() {
    return this.props.menuItems.reduce((arr, item) => {
      if (item.id !== 'ihaveideas' && item.id !== 'latest') {
        arr.push(<Option key={item.id} value={item.id}>{item.name}</Option>);
      }
      return arr;
    }, []);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        onSubmit={this.submitHandler.bind(this)}
      >
        <FormItem
          label="类别"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '金点子类别不能为空!' }],
            onChange: this.handleSelectChange,
          })(
            <Select placeholder='请选择金点子类别'>
              {this.createSelectOptions()}
            </Select>
            )}
        </FormItem>
        <FormItem
          label="标题"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
        >
          {this.createInputField('title', '金点子标题不能为空!', '请输入金点子标题')}
        </FormItem>
        <FormItem
          label="作者"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
        >
          {this.createInputField('author', '金点子作者不能为空!', '请输入金点子作者')}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 8, offset: 4 }}
        >
          {this.createInputField('content', '金点子内容不能为空', '金点子内容...', 'textarea')}
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

const NewIdeaForm = Form.create()(NewIdea);

const mapStateToProps = (state) => {
  return {
    menuItems: state.siderReducer
  };
};

export default connect(mapStateToProps)(NewIdeaForm);
