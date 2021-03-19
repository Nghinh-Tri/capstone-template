import React, { Component } from 'react';
import { convertLanguageList } from "../../../../service/util/util";
import SelectBar from '../../select-search/SelectBar';

class LanguageFormContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            priority: [
                { label: 10, value: 10 },
                { label: 9, value: 9 },
                { label: 8, value: 8 },
                { label: 7, value: 7 },
                { label: 6, value: 6 },
                { label: 5, value: 5 },
                { label: 4, value: 4 },
                { label: 3, value: 3 },
                { label: 2, value: 2 },
                { label: 1, value: 1 },
            ]
        }
    }

    onDeleteLanguage = (languageIndex, positionFormIndex) => {
        this.props.onDeleteLanguage(languageIndex, positionFormIndex)
    }

    render() {
        var { item, languageIndex, positionFormIndex, languageList } = this.props
        var listConverted = convertLanguageList(languageList)
        return (
            <div className="row" style={{ position: 'relative', marginLeft: 10, marginBottom: 15, boxShadow: '0 5px 5px 0 rgb(0 0 0 / 20%)', width: '1130px', height: '70px' }} >
                {/* Language */}
                <div class="col-1" style={{ marginLeft: 20, marginTop: 20, }}>
                    <label className="bmd-label">
                        <h5 className="font-weight-bold">Language</h5>
                    </label>
                </div>
                <div className="col" style={{ marginLeft: 20, marginTop: 15 }}>
                    <SelectBar
                        list={listConverted}
                        onUpdateLanguageID={this.props.onUpdateLanguageID}
                        name="language"
                        positionFormIndex={positionFormIndex}
                        languageIndex={languageIndex}
                        value={item.langID}
                    />
                </div>


                {/* Priority */}
                <div className="col-1" style={{ marginBottom: 40, marginTop: 20 }}>
                    <label className="bmd-label">
                        <h5 className="font-weight-bold">
                            Priority
                        </h5>
                    </label>
                </div>
                <div className="col" style={{ marginLeft: 20, marginTop: 15, }}>
                    <SelectBar
                        list={this.state.priority}
                        onUpdateLanguagePriority={this.props.onUpdateLanguagePriority}
                        name="languagePriority"
                        positionFormIndex={positionFormIndex}
                        languageIndex={languageIndex}
                        value={item.priority}
                    />
                </div>

                <div className="col-1 mt-15-ml-30">
                    <span className="material-icons pull-right clear" onClick={() => this.onDeleteLanguage(languageIndex, positionFormIndex)}>clear</span>
                </div>
            </div >

        );
    }
}

export default LanguageFormContent;