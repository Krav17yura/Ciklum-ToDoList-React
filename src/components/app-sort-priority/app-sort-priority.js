import React, { Component } from 'react';
import './app-sort-priority.css'
export default class AppSortPriority extends Component {
    
    onPriorityChange = (e) => {
        this.props.onFilterPriorityChange(e.target.value)     
    }

    render() {

        return (
            <select className="app__sort-priority"   onChange={this.onPriorityChange} >
                <option value="all" >all</option>
                <option value='hight'>hight</option>
                <option value='normal'>normal</option>
                <option value='low'>low</option>
            </select>
        )
    }
}