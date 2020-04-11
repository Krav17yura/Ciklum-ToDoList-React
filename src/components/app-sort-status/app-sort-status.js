import React, { Component } from 'react';
import './app-sort-status.css';

export default  class AppSortStatus extends Component{
    onStatusChange = (e) => {
            let filter = e.target.value;
            this.props.onStatusFilterChange(filter);
    }

    render(){
        
        return(
               <select  className="app__sort-status"  onChange={this.onStatusChange} >
                   <option value="all" >all</option>
                   <option value='active'>active</option>
                   <option value='done'>done</option>
               </select>
        )
    }
}