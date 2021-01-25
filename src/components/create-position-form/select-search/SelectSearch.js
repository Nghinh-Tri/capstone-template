import React, { Component } from 'react';
// import SelectSearch from 'react-select-search';
import Select from 'react-select'

class SelectSearchs extends Component {
    render() {
        var { list } = this.props
        return (            
            <Select className="select" options={list} placeholder="Search..." />
        );
    }
}

export default SelectSearchs;