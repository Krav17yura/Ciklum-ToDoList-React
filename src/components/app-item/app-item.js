import React, { Component } from 'react'
import './app-item.css'

export default class AppItem extends Component {
    state = {
        menuItemValue: '...'
    }

    itemMenu = (e) => {
        this.setState({
            menuItemValue: e.target.value
        })
    }

       Menu = () => {
        switch (this.state.menuItemValue) {
            case "done":
                return this.props.onDoneToggle() || this.reset();
            case "edit":
                return this.props.onPoupapEditItemToggle(this.props.editPoupap) || this.props.editItem() || this.reset(); 
            case "delete":
                return this.props.removeItem() || this.reset();
            default:
                break;
        };
          
    }   

    reset = () =>{
        this.setState({
            menuItemValue: '...'
        })
    }

    render() {

        const { label, description, priority, done} = this.props;

        let className = "item__box ";
        let selectClass = "item__menu ";
        let doneCheck = "check ";
        (done) ? className  += ' done' : className += "";
        (done) ? selectClass  += ' done' : className += "";
        (done) ? doneCheck  += ' default' : className += "";

        return (
            <div className={className}>
                <span className={doneCheck}></span>
                <h4 className='item__title'>{label}</h4>
                <span className='item__description'>{description}</span>
                <div className="item__footer">
                    <span className="item__priority">{priority} </span>
                    <form action="#">
                        <select className={selectClass}
                            onChange={this.itemMenu}
                            onClick={this.Menu}
                            value={this.state.menuItemValue} >
                            <option value='...' hidden   >...</option>
                            <option value="done" >done</option>
                            <option value='edit'>edit</option>
                            <option value='delete'>delete</option>
                        </select>
                    </form>
                </div>
            </div>
        )
    }
}