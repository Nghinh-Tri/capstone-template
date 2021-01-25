import React, { Component } from 'react';
// import SelectSearch from 'react-select-search';
import Select from 'react-select'

class SelectSearchs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: [
                { label: "any", value: 1 },
                { label: "Two", value: 2 }
            ]
        }
    }


    render() {
        var { list } = this.props
        return (            
            <Select className="select" options={list} placeholder="Search..." />
        );
    }
}

export default SelectSearchs;