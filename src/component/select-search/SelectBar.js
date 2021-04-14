import { Card, Popover, Select, Tooltip } from 'antd';
import { Option } from 'antd/lib/mentions';
import React, { Component } from 'react';

class SelectBar extends Component {

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

    showPriorityOption = () => {
        var { list } = this.props
        var result = null
        result = list.map((item, index) => {
            return (<Option key={index} value={item.value} >{item.label}</Option>)
        })
        return result
    }

    showCertiOption = () => {
        var { list } = this.props
        var result = null
        result = list.map((item, index) => {
            return (<Option key={index} value={item.value} onMouseEnter={this.onMouseEnter} >
                <Tooltip title='aasdas' placement='right' >
                    <div style={{ width: "100%" }}>
                        <div style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                            {item.label}
                        </div>
                    </div>

                </Tooltip>

            </Option>)
        })
        return result
    }

    showContent = () => {
        return (<p>aaa</p>)
    }

    showSelect = () => {
        var { type } = this.props
        switch (type) {
            case 'common':
                return this.showCommon()
            case 'certi':
                return this.showCerti()
            case 'special':
                return this.showSpecial()
            case 'unique':
                return this.showUnique()
            case 'multi':
                return this.showMulti()
            default:
                break;
        }
    }

    onMouseEnter = (e) => {
        // console.log('e', e.currentTarget.title)
        var result = null
        var array = [1, 2, 3]
        result = array.map((value, key) => {
            return (<Card style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>)

        })
        return result
    }

    showCerti = () => {
        var { value } = this.props
        if (value === -1) {
            return (
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder={this.props.placeholder}
                    onSelect={this.onSelectCommon}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showCertiOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    style={{ width: 200 }}
                    showSearch
                    placeholder={this.props.placeholder}
                    onSelect={this.onSelectCommon}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showCertiOption()}
                </Select>)
        }
    }

    showCommon = () => {
        var { value, name } = this.props
        if (value === 0) {
            return (
                <Select
                    showSearch
                    style={name === 'projectType' || name === 'projectField' ? { width: 590 } : { width: 200 }}
                    placeholder={this.props.placeholder}
                    onSelect={this.onSelectCommon}
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
                    style={name === 'projectType' || name === 'projectField' ? { width: 590 } : { width: 200 }}
                    showSearch
                    placeholder={this.props.placeholder}
                    onSelect={this.onSelectCommon}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        }
    }

    showUnique = () => {
        var { value } = this.props
        if (value === 0) {
            return (
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder={this.props.placeholder}
                    onSelect={this.onSelectUnique}
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
                    disabled={typeof this.props.isDelete !== 'undefined' ? !this.props.isDelete : false}
                    showSearch
                    placeholder={this.props.placeholder}
                    onSelect={this.onSelectUnique}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showSelectedOption()}
                </Select>)
        }
    }

    showSpecial = () => {
        var { value } = this.props
        return (
            <Select value={value}
                style={{ minWidth: 290, maxWidth: 'auto' }}
                showArrow
                showSearch
                placeholder="Select project type"
                onChange={this.onSelectSpecial}
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {this.showPriorityOption()}
            </Select>
        )
    }

    showMulti = () => {
        var { value } = this.props
        if (value.length === 0) {
            return (
                <Select
                    style={{ minWidth: 250, maxWidth: 'auto' }}
                    mode='multiple'
                    showArrow
                    showSearch
                    placeholder={this.props.placeholder}
                    onChange={this.onSelectMulti}
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
                    disabled={this.props.minium}
                    showArrow
                    showSearch
                    placeholder={this.props.placeholder}
                    onChange={this.onSelectMulti}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        }
    }

    onSelectCommon = (value) => {
        var { name } = this.props
        switch (name) {
            case 'languagePriority':
                this.props.onUpdateLanguagePriority(value, this.props.languageIndex, this.props.positionFormIndex)
                break;
            case 'skillLevel':
                this.props.onUpdateSkillLevel(value, this.props.hardSkillIndex, this.props.positionFormIndex, this.props.isDelete)
                break;
            case 'certiLevel':
                this.props.onUpdateHardSkillCerti(value, this.props.hardSkillIndex, this.props.positionFormIndex, this.props.isDelete)
                break
            case 'hardSkillPriority':
                this.props.onUpdateHardSkillPriority(value, this.props.hardSkillIndex, this.props.positionFormIndex, this.props.isDelete)
                break
            case 'projectType':
                this.props.onSelectProjectType(value)
                break
            case 'projectField':
                this.props.onSelectProjectField(value)
                break
            default:
                break;
        }
    }

    onSelectUnique = (value) => {
        var { name } = this.props
        switch (name) {
            case 'positionID':
                this.props.onUpdatePositionID(value, this.props.positionFormIndex)
                break;
            case 'language':
                this.props.onUpdateLanguageID(value, this.props.languageIndex, this.props.positionFormIndex)
                break
            case 'softSkillID':
                this.props.onUpdateSoftSkillID(value, this.props.softSkillIndex, this.props.positionFormIndex)
                break
            case 'hardSkill':
                this.props.onUpdateHardSkillID(value, this.props.hardSkillIndex, this.props.positionFormIndex)
            default:
                break;
        }
    }

    onSelectSpecial = (value) => {
        var { name } = this.props
        switch (name) {
            case 'positionSelect':
                this.props.onSelectPos(value)
                break;

            default:
                break;
        }
    }

    onSelectMulti = (value) => {
        var { name } = this.props
        switch (name) {
            case 'softSkillID':
                this.props.onUpdateSoftSkillID(value, this.props.positionFormIndex)
                break
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