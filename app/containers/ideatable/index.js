import { Table } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import selectIdea from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './ideatable.css';

const createColumns = (cmp) => {
  const columns = [{
    title: '标题',
    className: 'title',
    dataIndex: 'title',
    onCellClick: (rec, e) => {
      cmp.props.selectIdea(rec);
    }
  }, {
    title: '作者',
    dataIndex: 'author',
  }, {
    title: '时间',
    dataIndex: 'createTime',
  }];
  return columns;
};

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
      <Table className="idealist" rowSelection={rowSelection} columns={createColumns(this)} dataSource={this.state.ideas} />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectIdea: selectIdea
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(IdeaTable);
