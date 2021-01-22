import React, { Component } from 'react';

class SelectSearch extends Component {
    render() {
        return (
            <select className="form-control form-control-xs selectpicker" name="" data-live-search="true" data-title="Position" id="state_list" >
                <option value="1" selected>Manufacturer's Name</option>
                <option value="2">Aarkay Engineering Corpot</option>
                <option value="3">HAAS GROUP INTERNATIONAL INC., USA</option>
                <option value="4">HOLLANDSE SIGNAAL APPARATEN GMBH,NETHERLAND</option>
                <option value="5">KLIMAAT TOTAAL, NEDERLAND</option>
                <option value="6">LIAAEN BAMFORD LTD,ENGLAND</option>
                <option value="7">SAAB, SWEDEN</option>
            </select>
        );
    }
}

export default SelectSearch;