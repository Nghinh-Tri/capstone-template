import React, { Component } from 'react';
import SelectSearch from '../../select-search/SelectSearch';

class HardSkillFormContent extends Component {

    onDelete = (key) => {
        this.props.onDelete(key)
    }

    render() {
        var { item, index } = this.props
        return (
            <div className="row">
                <div className="col mt-15-ml-30">
                    <label className="bmd-label">
                        <h5 className="font-weight-bold">Skill</h5>
                    </label>
                </div>
                <div className="col">
                    <SelectSearch />
                </div>

                <div className="col mt-15-ml-30">
                    <label className="bmd-label">
                        <h5 className="font-weight-bold">Experience</h5>
                    </label>
                </div>

                <div className="col">
                    <div className="form-group">
                        <input type="number" className="form-control" min="0" />
                    </div>
                </div>
                <div className="col">
                    <label className="bmd-label mt-10">
                        Years
                    </label>
                </div>
                <div className="col mt-15-ml-30 mr-10">
                    <label className="bmd-label  ">
                        <h5 className="font-weight-bold">
                            Certification
                </h5>
                    </label>
                </div>
                <div className="col ">
                    <SelectSearch />
                </div>

                <div className="col mt-15-ml-30">
                    <label className="bmd-label">
                        <h5 className="font-weight-bold">
                            Priority
                </h5>
                    </label>
                </div>
                <div className="col">
                    <div className="form-group">
                        <input type="number" className="form-control" min="0" />

                    </div>

                </div>

                <div className="col mt-15-ml-30">
                    <span className="material-icons pull-right clear" onClick={() => this.onDelete(index)}>clear</span>
                </div>
            </div>

        );
    }
}

export default HardSkillFormContent;