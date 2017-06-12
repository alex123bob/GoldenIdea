import { Modal, Table } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const columns = [{
  title: '标题',
  dataIndex: 'title',
  onCellClick: (rec, e) => {
    let content = rec.content;
    content = content.split('\n').map((item, index) => {
      return (
        <div key={item.id + '-' + index}>{item}</div>
      );
    });
    Modal.info({
      title: rec.title,
      content: (
        <div>
          {content}
        </div>
      ),
      onOk() { },
    });
  }
}, {
  title: '作者',
  dataIndex: 'author',
}, {
  title: '时间',
  dataIndex: 'createTime',
}];

class IdeaTable extends Component {
  state = {
    selectedRowKeys: [],  // Check here to configure the default column
    ideas: []
  };
  static propTypes = {
    type: PropTypes.string,
    updateTime: PropTypes.number
  }
  componentDidMount() {
    const cmp = this;
    fetch('/idea/get/' + cmp.props.type, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(resJson => {
        if (resJson.status === 'successful') {
          let arr = resJson.content;
          arr = arr.map((item) => {
            return {
              ...item,
              key: item.id
            };
          });
          cmp.setState({
            ideas: arr
          });
        }
      });
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [{
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          this.setState({
            selectedRowKeys: [...Array(46).keys()],  // 0...45
          });
        },
      }, {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }, {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }],
      onSelection: this.onSelection,
    };
    return (
      <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.ideas} />
    );
  }
}

export default IdeaTable;
