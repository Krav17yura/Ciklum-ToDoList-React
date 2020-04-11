import React from 'react';
import './app-item-list.css';
import AppItem from '../app-item'

const AppItemList = ({ todos, onDoneToggle, onPoupapEditItemToggle, editPoupap, removeItem, editItem}) => {

    const elements = todos.map((item) => {
        const { id, ...itemProps } = item;
        return (
            <li key={id}>
                <AppItem 
                {...itemProps}
                onDoneToggle={() => onDoneToggle(id)}
                removeItem={() => removeItem(id)}
                onPoupapEditItemToggle={onPoupapEditItemToggle}
                editPoupap={editPoupap}
                editItem={() => editItem(id)}/>
            </li>
        );
    });

    return (
        <ul>
        {elements}
        </ul>
    );
}

export default AppItemList;