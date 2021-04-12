import React, { Component } from 'react';
import { convertLanguageList } from '../../../service/util/util';
import SelectBar from '../../select-search/SelectBar';

class LanguageFormContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priority: [
                { label: 'High', value: 10 },
                { label: 'Low', value: 5 }
            ]
        }
    }

    onDeleteLanguage = (languageIndex, positionFormIndex) => {
        this.props.onDeleteLanguage(languageIndex, positionFormIndex)
    }

    render() {
        var { languageIndex, length, languageItem, positionFormIndex, languageList } = this.props
        var listConverted = convertLanguageList(languageList)
        return (
            <tr>
                <td>
                    <SelectBar name="language"
                        type="unique"
                        placeholder="Select a language"
                        list={listConverted}
                        onUpdateLanguageID={this.props.onUpdateLanguageID}
                        positionFormIndex={positionFormIndex}
                        languageIndex={languageIndex}
                        value={languageItem.langID}
                    />
                </td>
                <td>
                    <SelectBar name="languagePriority"
                        type="common"
                        placeholder="Select priority"
                        list={this.state.priority}
                        onUpdateLanguagePriority={this.props.onUpdateLanguagePriority}
                        positionFormIndex={positionFormIndex}
                        languageIndex={languageIndex}
                        value={languageItem.priority}
                    />
                </td>
                {length > 1 ?
                    <span className="material-icons"
                        style={{ marginTop: 13, paddingLeft: 10, cursor: 'pointer' }}
                        onClick={() => this.onDeleteLanguage(languageIndex, positionFormIndex)}>clear</span>
                    : <div style={{ paddingLeft: 35 }} ></div>
                }
            </tr>
        );
    }
}

export default LanguageFormContent;