import React, { Component } from 'react';
import './app-addItem-button.css'

export default class AppAddItemButton extends Component{

    render(){
        const {onPoupapCraateItemToggle, createPoupap} = this.props;
        return(
            <button className="app__add-button" type="button" onClick={() => onPoupapCraateItemToggle(createPoupap)}>Create</button>
        )
    }
}