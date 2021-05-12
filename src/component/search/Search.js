import { Input } from 'antd';
import React, { Component } from 'react';
import { SearchOutlined } from "@ant-design/icons";

class Search extends Component {

    onHandle = (e) => {
        var { value } = e.target
        var { search } = this.props
        switch (search) {
            case 'project':
                this.props.searchProject(value.trim())
                break
        }
    }

    render() {
        return (
            <div className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0" >
                <div className="input-group" style={{ marginTop: 20, marginRight: 5 }}>
                    <Input suffix={<SearchOutlined />}
                        placeholder={this.props.placeholder}
                        onChange={this.onHandle}
                        aria-label="Search" aria-describedby="basic-addon2" />
                </div>
            </div>
        );
    }
}

export default Search;