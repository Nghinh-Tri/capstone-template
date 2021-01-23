import React, { Component } from 'react';
import SelectSearch from '../../select-search/SelectSearch';

class SoftSkillFormContent extends Component {

    onDelete = (key) => {
        this.props.onDelete(key)
    }

    render() {
        var {item, index} = this.props
        return (
            <div className="row">
                <div className="col-1 mt-15-ml-30">
                    <label className="bmd-label  ">
                        <h5 className="font-weight-bold">Skill</h5>
                    </label>
                </div>
                <div className="col-3">
                    <SelectSearch />
                </div>
                <div className="col-1 mt-15-ml-30">
                    <span className="material-icons pull-right clear" onClick={()=>this.onDelete(index)}>clear</span>
                </div>
            </div>

        );
    }
}

export default SoftSkillFormContent;