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
        if (name === 'positionID') {
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
        }

        if (name === 'language') {
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


        }

        if (name === 'softSkillID') {
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
        }

        if (name === 'hardSkill') {
            var unSelectList = this.getUnSelectedList(list)
            // console.log('value', value)
            // console.log('selectList', selectList)
            console.log('value === 0', value === 0)
            if (value === 0) {
                return (<Select className="select"
                    options={unSelectList}
                    onChange={this.onSelectHardSkill}
                    valueField="value"
                    labelField="label" 
                />)
            }

            var selectList = this.getSelectedList(value, list)
            var a = selectList.find(o =>  o.value === value )
            if (a !== null || typeof a !== 'undefined') {
                console.log('value', value)
                console.log('selectList', selectList)
                return (
                    <Select className="select"
                        options={selectList}
                        onChange={this.onSelectHardSkill}
                        values={[selectList.find(o =>  o.value === value)]}
                        valueField="value"
                        labelField="label" onDropdownOpen={this.forceUpdate()}
                    />
                )
            }            
        }

        if (name === 'certiID') {
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
        }

        if (name === 'hardSkillPriority') {
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
        }

        if (name === 'languagePriority') {
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
        }
    }

    getUnSelectedList = (list) => {
        var result = []
        for (let index = 0; index < list.length; index++) {
            if (list[index].isSelect === false)
                result.push(list[index])

        }
        return result
    }

    getSelectedList = (value, list) => {
        var result = []
        for (let index = 0; index < list.length; index++) {
            if (list[index].isSelect === false || list[index].value === value)
                result.push(list[index])
        }
        return result
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