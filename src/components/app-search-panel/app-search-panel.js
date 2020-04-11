import React, { Component } from "react";

import './app-search-panel.css';


export default class AppSearchPanel extends Component {
    state = {
        text: ""
    }

    onSearchChange = (e) => {
        const search = e.target.value;
        this.setState({
            text: search
        })
        this.props.onSearchChange(search);
    }


    render() {
        return (
            <input className="app__search" type="text" placeholder="search by title" onChange={this.onSearchChange} value={this.state.text} />
        )
    }
}