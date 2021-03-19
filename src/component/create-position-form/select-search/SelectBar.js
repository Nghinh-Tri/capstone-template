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

    onSelectLanguagePriority = (value) => {
        var { positionFormIndex, languageIndex } = this.props
        this.props.onUpdateLanguagePriority(value, languageIndex, positionFormIndex)
    }

    onSelectSkillLevel = (value) => {
        var { positionFormIndex, hardSkillIndex } = this.props
        this.props.onUpdateSkillLevel(value, hardSkillIndex, positionFormIndex)
    }

    onSelectHardSkillPriority = (value) => {
        var { positionFormIndex, hardSkillIndex } = this.props
        this.props.onUpdateHardSkillPriority(value, hardSkillIndex, positionFormIndex)
    }

    onSelectCertificateLevel = (value) => {
        var { positionFormIndex, hardSkillIndex } = this.props
        this.props.onUpdateHardSkillCerti(value, hardSkillIndex, positionFormIndex)
    }

    onSelectPosLevel = (value) => {
        var { positionFormIndex } = this.props
        this.props.onSelectPosLevel(value, positionFormIndex)
    }    

    showDefaultOption = () => {
        var { list } = this.props
        var listConverted = this.getUnSelectedList(list)
        var result = null
        result = listConverted.map((item, index) => {
            return (<Option key={index} value={item.value}>{item.label}</Option>)
        })
        return result
    }

    showSelectedOption = () => {
        var { list, value } = this.props
        var listConverted = this.getSelectedList(value, list)

        var result = null
        result = listConverted.map((item, index) => {
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
                    className="softSkill"
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
                    style={{ width: 200 }}
                    className="softSkill"
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
                    style={{ width: 150 }}
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
                    style={{ width: 150 }}
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
                    style={{ width: 200 }}
                    className="softSkill"
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
                    style={{ width: 200 }}
                    className="softSkill"
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
                    style={{ width: 200 }}
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
                    style={{ width: 200 }}
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

    showPriorityOption = () => {
        var { list } = this.props
        var result = null
        result = list.map((item, index) => {
            return (<Option key={index} value={item.value}>{item.label}</Option>)
        })
        return result
    }

    showLanguagePriority = () => {
        var { value } = this.props
        if (value === 0) {
            return (
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select priority"
                    onSelect={this.onSelectLanguagePriority}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.indexOf(input) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select priority"
                    onSelect={this.onSelectLanguagePriority}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.indexOf(input) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        }
    }

    showHardSkillPriority = () => {
        var { value } = this.props
        if (value === 0) {
            return (
                <Select
                    style={{ width: 140 }}
                    showSearch
                    placeholder="Select priority"
                    onSelect={this.onSelectHardSkillPriority}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    style={{ width: 140 }}

                    showSearch
                    placeholder="Select priority"
                    onSelect={this.onSelectHardSkillPriority}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        }
    }

    showCertificateLevel = () => {
        var { value } = this.props
        if (value === -1) {
            return (
                <Select
                    style={{ width: 180 }}
                    showSearch
                    placeholder="Select certificate level"
                    onSelect={this.onSelectCertificateLevel}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    style={{ width: 180 }}
                    showSearch
                    placeholder="Select certificate level"
                    onSelect={this.onSelectCertificateLevel}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        }
    }

    showSkillLevel = () => {
        var { value } = this.props
        if (value === 0) {
            return (
                <Select
                    style={{ width: 180 }}
                    showSearch
                    placeholder="Select skill level"
                    onSelect={this.onSelectSkillLevel}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    style={{ width: 180 }}
                    showSearch
                    placeholder="Select skill level"
                    onSelect={this.onSelectSkillLevel}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        }
    }

    showPosLevel = () => {
        var { value } = this.props
        if (value.length === 0) {
            return (
                <Select
                    style={{ minWidth: 250, maxWidth: 'auto' }}
                    mode='multiple'
                    showArrow
                    showSearch
                    placeholder="Select skill level"
                    onChange={this.onSelectPosLevel}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        }
        else {
            return (
                <Select value={value}
                    style={{ minWidth: 250, maxWidth: 'auto' }}
                    mode='multiple'
                    showArrow
                    showSearch
                    placeholder="Select skill level"
                    onChange={this.onSelectPosLevel}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
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
            case 'languagePriority':
                return this.showLanguagePriority()
            case 'softSkillID':
                return this.showSoftSkill()
            case 'hardSkill':
                return this.showHardSkill()
            case 'hardSkillPriority':
                return this.showHardSkillPriority()
            case 'certiLevel':
                return this.showCertificateLevel()
            case 'skillLevel':
                return this.showSkillLevel()
            case 'posLevel':
                return this.showPosLevel()
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