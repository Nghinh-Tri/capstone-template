import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHardSkill } from '../../../service/action/HardSkillSelectBarAction';
import HardSkillFormContent from './hard-skill-form-content/HardSkillFormContent';

class HardSkillForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hardSkillDetail: {
                hardSkillID: 0,
                skillLevel: 0,
                certificationLevel: -1,
                priority: 0
            },
            isMinimize: false
        }
    }

    componentDidMount = () => {
        this.props.fetchHardSkillList()
    }

    getHardSkillListNotSelect = () => {
        var { hardSkillList, hardSkill } = this.props
        var listNotSelect = hardSkillList.slice(0, hardSkillList.length)
        for (let i = 0; i < listNotSelect.length; i++) {
            for (let k = 0; k < hardSkill.length; k++) {
                if (listNotSelect[i].skillID === hardSkill[k].hardSkillID) {
                    var clone = { ...listNotSelect[i] }
                    clone.isSelect = true
                    listNotSelect[i] = clone
                }                 
            }
        }
        return listNotSelect
    }

    onAddHardSkill = (positionFormIndex) => {
        this.props.onAddHardSkill(positionFormIndex, this.state.hardSkillDetail)
    }

    showItems = (hardSkill, positionFormIndex) => {
        var result = null;
        var listNotSelect = this.getHardSkillListNotSelect()
        result = hardSkill.map((hardSkillDetail, hardSkillIndex) => {
            return (
                <HardSkillFormContent key={hardSkillIndex}
                    hardSkillDetail={hardSkillDetail}
                    hardSkillIndex={hardSkillIndex}
                    positionFormIndex={positionFormIndex}
                    onDeleteHardSkill={this.props.onDeleteHardSkill}
                    onUpdateSkillLevel={this.props.onUpdateSkillLevel}
                    onUpdateHardSkillPriority={this.props.onUpdateHardSkillPriority}
                    onUpdateHardSkillID={this.props.onUpdateHardSkillID}
                    onUpdateHardSkillCerti={this.props.onUpdateHardSkillCerti}
                    listNotSelect={listNotSelect}
                />
            );
        })
        return result;
    }

    setMinimize = () => {
        this.setState({
            isMinimize: !this.state.isMinimize
        })
    }

    render() {
        var { hardSkill, positionFormIndex } = this.props

        const showHardSkill = (hardSkill, positionFormIndex) => {
            if (this.state.isMinimize)
                return ""
            else
                return (<div className="card-body">
                    {this.showItems(hardSkill, positionFormIndex)}
                    <span className="material-icons add"
                        onClick={() => this.onAddHardSkill(positionFormIndex)}>add_box</span>
                </div>)
        }

        return (
            <div className="card">
                <div className="card-header ">
                    <div className="row">
                        <div className="col">
                            <h5 className="font-weight-bold">Hard Skill</h5>
                        </div>
                        <div className="col pull-right">
                            <span className="material-icons pull-right clear" onClick={this.setMinimize} >
                                {this.state.isMinimize === false ? 'minimize' : 'crop_free'}
                            </span>
                        </div>
                    </div>
                </div>
                {showHardSkill(hardSkill, positionFormIndex)}
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        hardSkillList: state.HardSkillSelectBarReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchHardSkillList: () => {
            dispatch(fetchHardSkill())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(HardSkillForm);