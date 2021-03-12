import { Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React, { Component } from 'react';

class SelectBar extends Component {

    onSelectHardSkill = (value) => {
        var { positionFormIndex, hardSkillIndex } = this.props
        this.props.onUpdateHardSkillID(value, hardSkillIndex, positionFormIndex)
    }

    onSelectPosition = (value) => {
        var { positionFormIndex } = this.props
        this.props.onUpdatePositionID(value, positionFormIndex)
    }

    onSelectSoftSkill = (value) => {
        var { positionFormIndex, softSkillIndex } = this.props
        this.props.onUpdateSoftSkillID(value, softSkillIndex, positionFormIndex)
    }

    onSelectLanguage = (value) => {
        var { positionFormIndex, languageIndex } = this.props
        this.props.onUpdateLanguageID(value, languageIndex, positionFormIndex)
    }

    showDefaultOption = () => {
        var { list } = this.props
        var list = this.getUnSelectedList(list)
        var result = null
        result = list.map((item, index) => {
            return (<Option key={index} value={item.value}>{item.label}</Option>)
        })
        return result
    }

    showSelectedOption = () => {
        var { list, value } = this.props
        var list = this.getSelectedList(value, list)

        var result = null
        result = list.map((item, index) => {
            return (<Option key={index} value={item.value}>{item.label}</Option>)
        })
        return result
    }

    showPosition = () => {
        var { value } = this.props
        if (value === 0) {
            return (
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a position"
                    onSelect={this.onSelectPosition}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showDefaultOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    showSearch
                    placeholder="Select a position"
                    onSelect={this.onSelectPosition}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showSelectedOption()}
                </Select>)
        }
    }

    showHardSkill = () => {
        var { value } = this.props
        if (value === 0) {
            return (
                <Select
                    showSearch
                    placeholder="Select a hard skill"
                    onSelect={this.onSelectHardSkill}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showDefaultOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    showSearch
                    placeholder="Select a hard skill"
                    onSelect={this.onSelectHardSkill}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showSelectedOption()}
                </Select>)
        }
    }

    showSoftSkill = () => {
        var { value } = this.props
        if (value === 0) {
            return (
                <Select
                    showSearch
                    placeholder="Select a soft skill"
                    onSelect={this.onSelectSoftSkill}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showDefaultOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    showSearch
                    placeholder="Select a soft skill"
                    onSelect={this.onSelectSoftSkill}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showSelectedOption()}
                </Select>)
        }
    }

    showLanguage = () => {
        var { value } = this.props
        if (value === 0) {
            return (
                <Select
                    showSearch
                    placeholder="Select a language"
                    onSelect={this.onSelectLanguage}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showDefaultOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    showSearch
                    placeholder="Select a language"
                    onSelect={this.onSelectLanguage}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showSelectedOption()}
                </Select>)
        }
    }

    showSelect = () => {
        var { name } = this.props
        switch (name) {
            case 'positionID':
                return this.showPosition()
            case 'language':
                return this.showLanguage()
            case 'softSkillID':
                return this.showSoftSkill()
            case 'hardSkill':
                return this.showHardSkill()
            default:
                break;
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
        return (
            <div>
                { this.showSelect()}
            </div>
        );
    }
}

export default SelectBar;