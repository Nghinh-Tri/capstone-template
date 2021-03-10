import React, { Component } from 'react';
import Select from "react-dropdown-select"

class SelectSearchs extends Component {

    onSelectPosition = event => {
        var { positionFormIndex } = this.props
        var value = event[0].value
        this.props.onUpdatePositionID(value, positionFormIndex)
    }

    onSelectLanguage = event => {
        var { positionFormIndex, languageIndex } = this.props
        var value = event[0].value
        this.props.onUpdateLanguageID(value, languageIndex, positionFormIndex)
    }

    onSelectSoftSkill = event => {
        var { positionFormIndex, softSkillIndex } = this.props
        var value = event[0].value
        this.props.onUpdateSoftSkillID(value, softSkillIndex, positionFormIndex)
    }

    onSelectHardSkill = event => {
        var { positionFormIndex, hardSkillIndex } = this.props
        var value = event[0].value
        this.props.onUpdateHardSkillID(value, hardSkillIndex, positionFormIndex)
    }

    onSelectCerti = event => {
        var { positionFormIndex, hardSkillIndex } = this.props
        var value = event[0].value
        this.props.onUpdateHardSkillCerti(value, hardSkillIndex, positionFormIndex)
    }

    onSelectHardSkillPriority = event => {
        var { positionFormIndex, hardSkillIndex } = this.props
        var value = event[0].value
        this.props.onUpdateHardSkillPriority(value, hardSkillIndex, positionFormIndex)
    }

    onSelectLanguagePriority = event => {
        var { positionFormIndex, languageIndex } = this.props
        var value = event[0].value
        this.props.onUpdateLanguagePriority(value, languageIndex, positionFormIndex)
    }

    showSelectBar = (name, list, value) => {
        switch (name) {
            case "positionID":
                return (
                    isNaN(value) || value === 0 ?
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectPosition}
                            valueField="value"
                            labelField="label"
                        />
                        :
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectPosition}
                            values={[list.find(opt => opt.value === value)]}
                            valueField="value"
                            labelField="label"
                        />
                )
            case "language":
                return (
                    isNaN(value) || value === 0 ?
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectLanguage}
                            valueField="value"
                            labelField="label"
                        /> :
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectLanguage}
                            values={[list.find(opt => opt.value === value)]}
                            valueField="value"
                            labelField="label"
                        />
                )
            case "softSkillID":
                return (
                    isNaN(value) ?
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectSoftSkill}
                            valueField="value"
                            labelField="label"
                        /> :
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectSoftSkill}
                            values={[list.find(opt => opt.value === value)]}
                            valueField="value"
                            labelField="label"
                        />
                )
            case "hardSkillID":
                return (
                    isNaN(value) || value === 0 ?
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectHardSkill}
                            valueField="value"
                            labelField="label"
                        />
                        :
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectHardSkill}
                            values={[list.find(opt => opt.value === value)]}
                            valueField="value"
                            labelField="label"
                        />
                )
            case "certiID":
                return (
                    isNaN(value) || value === 0 ?
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectCerti}
                            valueField="value"
                            labelField="label"
                        />
                        :
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectCerti}
                            values={[list.find(opt => opt.value === value)]}
                            valueField="value"
                            labelField="label"
                        />
                )
            case 'hardSkillPriority':
                return (
                    isNaN(value) || value === 0 ?
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectHardSkillPriority}
                            valueField="value"
                            labelField="label"
                        />
                        :
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectHardSkillPriority}
                            values={[list.find(opt => opt.value === value)]}
                            valueField="value"
                            labelField="label"
                        />
                )
            case 'languagePriority':
                return (
                    isNaN(value) || value === 0 ?
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectLanguagePriority}
                            valueField="value"
                            labelField="label"
                        />
                        :
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectLanguagePriority}
                            values={[list.find(opt => opt.value === value)]}
                            valueField="value"
                            labelField="label"
                        />
                )
            default:
                break;
        }
    }

    render() {
        var { list, name, value } = this.props
        return (
            <div>
                {list.length > 0 ? this.showSelectBar(name, list, parseInt(value)) : ""}
            </div>
        );
    }
}

export default SelectSearchs;