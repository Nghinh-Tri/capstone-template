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
        var { item } = this.state
        return (            
            <Select className="select" options={item} placeholder="Search skill..." />
        );
    }
}

export default SelectSearchs;