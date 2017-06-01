import { Form, Select, Input, Button } from 'antd';
import React, { Component } from 'react';
import PropType from 'prop-types';
import MenuItems from '../../common/menuitems';

const FormItem = Form.Item;
const Option = Select.Option;

class NewIdea extends Component {
    static propTypes = {
        form: PropType.object.isRequired,
    }

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
        return MenuItems.map((item) => (
            <Option key={item.id} value={item.id}>{item.defaultMessage}</Option>
        ));
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
                <FormItem
                    label='类别'
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 8 }}
                >
                  {getFieldDecorator('ideaType', {
                      rules: [{ required: true, message: '金点子类别不能为空!' }],
                      onChange: this.handleSelectChange,
                  })(
                      <Select placeholder='请选择金点子类别'>
                        {this.createSelectOptions()}
                      </Select>
                  )}
                </FormItem>
                <FormItem
                    label='标题'
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                >
                  {this.createInputField('ideaTitle', '金点子标题不能为空!', '请输入金点子标题')}
                </FormItem>
                <FormItem
                    label='作者'
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 8 }}
                >
                    {this.createInputField('ideaAuthor', '金点子作者不能为空!', '请输入金点子作者')}
                </FormItem>
                <FormItem
                    wrapperCol={{ span: 8, offset: 4 }}
                >
                    { this.createInputField('ideaContent', '金点子内容不能为空', '金点子内容...', 'textarea') }
                </FormItem>
                <FormItem
                    wrapperCol={{ span: 8, offset: 4 }}
                >
                    <Button type='primary' htmlType='submit'>
                      提交
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const NewIdeaForm = Form.create()(NewIdea);

export default NewIdeaForm;
