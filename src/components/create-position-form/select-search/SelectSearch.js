import React, { Component } from 'react';

class SelectSearch extends Component {
    render() {
        return (
            <select class="form-control form-control-xs selectpicker" name="" data-live-search="true" data-title="Position" id="state_list">
                <option value="" selected>Manufacturer's Name</option>
                <option value="">Aarkay Engineering Corpot</option>
                <option value="">HAAS GROUP INTERNATIONAL INC., USA</option>
                <option value="">HOLLANDSE SIGNAAL APPARATEN GMBH,NETHERLAND</option>
                <option value="">KLIMAAT TOTAAL, NEDERLAND</option>
                <option value="">LIAAEN BAMFORD LTD,ENGLAND</option>
                <option value="">SAAB, SWEDEN</option>
            </select>
        );
    }
}

export default SelectSearch;