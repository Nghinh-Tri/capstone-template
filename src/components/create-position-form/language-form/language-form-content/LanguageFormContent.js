import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectSearch from '../../select-search/SelectSearch';
import * as Action from "../../../../store/store-action/SoftSkillSelectBarAction";
import { convertSkillList } from "../../../../util";

class LanguageFormContent extends Component {

    componentDidMount = () => {
        var { softSkillList } = this.props
        if (typeof softSkillList === 'undefined' || softSkillList.length === 0) {
            this.props.fetchSoftSkillList()
        }
    }

    onDeleteLanguage = (languageIndex, positionFormIndex) => {
        this.props.onDeleteLanguage(languageIndex, positionFormIndex)
    }

    render() {
        var { item, languageIndex, positionFormIndex, softSkillList } = this.props
        var listConverted = convertSkillList(softSkillList)
        return (
            <div className="row">
                <div className="col-1 mt-15-ml-30">
                    <label className="bmd-label  ">
                        <h5 className="font-weight-bold">Language</h5>
                    </label>
                </div>
                <div className="col-3">
                    <SelectSearch list={listConverted}
                        onUpdateLanguageID={this.props.onUpdateLanguageID}
                        name="language"
                        positionFormIndex={positionFormIndex}
                        languageIndex={languageIndex}
                        value={item} />
                </div>
                <div className="col-1 mt-15-ml-30">
                    <span className="material-icons pull-right clear" onClick={() => this.onDeleteLanguage(languageIndex, positionFormIndex)}>clear</span>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        softSkillList: state.SoftSkillSelectBarReducer
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        fetchSoftSkillList: () => {
            dispatch(Action.fetchSoftSkill())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(LanguageFormContent);