import React, { Component } from 'react';
import HardSkillForm from './hard-skill-form/HardSkillForm';
import SelectSearch from './select-search/SelectSearch';
import SoftSkillForm from './soft-skill-form/SoftSkillForm';


class CreatePositionForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            position: [
                { label: 'Bussiness Analysis', value: 1 },
                { label: 'Tester', value: 2 },
                { label: 'Developer', value: 3 },
            ]
        }
    }

    onDeletePositionForm = (positionFormIndex) => {
        this.props.onDeletePositionForm(positionFormIndex)
    }

    render() {
        var { item, positionFormIndex } = this.props

        return (
            <div className="card mb-50">
                <div className="card-body">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-1 mt-15-ml-30">
                                <label className="bmd-label  ">
                                    <h4 className="font-weight-bold">
                                        Position
                                </h4>
                                </label>
                            </div>
                            <div className="col-4">
                                <SelectSearch />
                            </div>
                            <div className="col-2 mt-15-ml-30 fr">
                                <label className="bmd-label ">
                                    <h4 className="font-weight-bold ">
                                        Number of candidate
                                    </h4>
                                </label>
                            </div>
                            <div className="col-3">
                                <div className="form-group">
                                    <input type="number" className="form-control" min="0" />
                                </div>
                            </div>
                            <div className="col">
                                <span className="material-icons pull-right clear" onClick={() => this.onDeletePositionForm(positionFormIndex)}>clear</span>
                            </div>
                        </div>

                        {/* Soft Skill form */}
                        <SoftSkillForm softSkill={item.softSkill}
                            positionFormIndex={positionFormIndex}
                            onAddSoftSkill={this.props.onAddSoftSkill}
                            onDeleteSoftSkill={this.props.onDeleteSoftSkill} />
                        {/* Hard Skill form */}
                        {/* <HardSkillForm /> */}
                    </div>
                </div>
            </div>
        );
    }
}




export default CreatePositionForm;