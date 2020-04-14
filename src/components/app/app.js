import React, { Component } from 'react';

import './normalize.css'
import './app.css'
import AppHeader from '../app-header'
import AppSearchPanel from '../app-search-panel'
import AppSortStatus from '../app-sort-status'
import AppSortPriority from '../app-sort-priority'
import AppAddItemButton from '../app-addItem-button'
import AppPoupapAddItemPanel from '../app-poupap-addItem-panel'
import AppPoupapEditItemPanel from '../app-poupap-editItem-panel'
import AppItemList from '../app-item-list'
import AppFooter from '../app-footer'

export default class App extends Component {
    newId = 100;

    state = {
        todoData: [
            this.createTodoItem("Create React App", "Create app use react, html, js Create app use react, html, js Create app use react, html, js", "Hight"),
            this.createTodoItem("Drink coffe", "Create app use react, html, js Create app use react, html, js Create app use react, html, js", "Low"),
            this.createTodoItem("Learn Js", "Create app use react, html, js Create app use react, html, js Create app use react, html, js", 'Normal')
        ],
        createPoupap: true,
        editPoupap: true,
        editElem: "",
        search: "",
        filterPriority: 'all',
        filterStatus: "all"

    }

    createTodoItem(label, description, priority) {

        return {
            label: label,
            description: description,
            done: false,
            priority: priority,
            id: this.newId++
        };
    }
    addItem = (title, description, priority) => {
        if (title.trim().length === 0 || description.trim().length === 0) {
            alert("Eror 404 (Enter item)");
        } else {

            const newItem = this.createTodoItem(title, description, priority);

            this.setState(({ todoData }) => {
                const newArr = [newItem, ...todoData];

                return {
                    todoData: newArr
                }
            })
        }
    }

    removeItem = (id) => {
        this.setState(({ todoData }) => {
            const index = todoData.findIndex((el) => el.id === id);
            const newArr = [
                ...todoData.slice(0, index),
                ...todoData.slice(index + 1)
            ];
            return {
                todoData: newArr
            }
        })
    }

    editItem = (id) => {
        this.setState(({ todoData }) => {
            const index = todoData.findIndex((el) => el.id === id);
            const oldItem = todoData[index];

            return {
                editElem: { ...oldItem }
            }
        })
    }

    editItemFinish = (title, des, prior, id) => {
        this.setState(({ todoData }) => {
            const index = todoData.findIndex((el) => el.id === id);
            const oldItem = todoData[index];

            (title.trim().length === 0) ? title = oldItem.label : title.trim();
            (des.trim().length === 0) ? des = oldItem.description : des.trim();
            (prior.trim().length === 0) ? prior = oldItem.priority : prior.trim();

            const newItem = { ...oldItem, label: title, description: des, priority: prior }
            const newArr = [
                ...todoData.slice(0, index),
                newItem,
                ...todoData.slice(index + 1)
            ]

            return {
                todoData: newArr
            }
        })
    }

    onPoupapCraateItemToggle = (pop) => {
        let newPoupap = !pop;
        this.setState(() => {
            return {
                createPoupap: newPoupap
            }
        });
    };


    onPoupapEditItemToggle = (pop) => {
        let newPoupap = !pop;
        this.setState(() => {
            return {
                editPoupap: newPoupap
            }
        });

    };

    onDoneToggle = (id) => {
        this.setState(({ todoData }) => {
            const index = todoData.findIndex((el) => el.id === id);
            const oldItem = todoData[index];
            const newItem = { ...oldItem, done: true };
            const newArr = [
                ...todoData.slice(0, index),
                ...todoData.slice(index + 1),
                newItem
            ];


            return {
                todoData: newArr
            }
        })
    }

    search(arr, text) {
        if (text.trim().length === 0) {
            return arr;
        }

        return arr.filter((item) => {
            return item.label.toLowerCase().indexOf(text.toLowerCase().trim()) > -1;
        })
    }

    onSearchChange = (search) => {
        this.setState({
            search: search
        });
    }

    onfilterPriority(arr, filter) {
        switch (filter) {
            case 'all':
                return arr;
            case "hight":
                return arr.filter((item) => item.priority === "Hight");
            case 'normal':
                return arr.filter((item) => item.priority === "Normal");
            case 'low':
                return arr.filter((item) => item.priority === "Low");
            default:
                return arr;
        }
    }

    onFilterPriorityChange = (filter) => {
        this.setState({
            filterPriority: filter
        })
    }


    onfilterStatus(arr, filter) {
        switch (filter) {
            case 'all':
                return arr;
            case "active":
                return arr.filter((item) => !item.done);
            case 'done':
                return arr.filter((item) => item.done);
            default:
                return arr;
        }
    }

    onStatusFilterChange = (filter) => {
        this.setState({
            filterStatus: filter
        })
    }


    render() {
        const { todoData, search, filterPriority, filterStatus } = this.state;
        const visibleItem = this.onfilterPriority(this.onfilterStatus((this.search(todoData, search)), filterStatus), filterPriority)

        return (
            <div className="main">
                <div className='wrapper'>
                    <header className='app__header'>
                        <AppHeader />
                    </header>
                    <section className="container  ">
                        <div className="app__row">
                            <div className="first__column">
                                <AppSearchPanel
                                    onSearchChange={this.onSearchChange} />
                                <AppSortStatus
                                    onStatusFilterChange={this.onStatusFilterChange}
                                />
                            </div>
                            <div className="second__column">
                                <AppSortPriority
                                    onFilterPriorityChange={this.onFilterPriorityChange} />
                                <AppAddItemButton
                                    onPoupapCraateItemToggle={this.onPoupapCraateItemToggle}
                                    createPoupap={this.state.createPoupap} />
                            </div>
                        </div>
                        <AppItemList
                            todos={visibleItem}
                            onDoneToggle={this.onDoneToggle}
                            removeItem={this.removeItem}
                            onPoupapEditItemToggle={this.onPoupapEditItemToggle}
                            editPoupap={this.state.editPoupap}
                            editItem={this.editItem} />
                        <AppPoupapAddItemPanel
                            onPoupapCraateItemToggle={this.onPoupapCraateItemToggle}
                            createPoupap={this.state.createPoupap}
                            addItem={this.addItem} />
                        <AppPoupapEditItemPanel
                            onPoupapEditItemToggle={this.onPoupapEditItemToggle}
                            editPoupap={this.state.editPoupap}
                            editElem={this.state.editElem}
                            editItemFinish={this.editItemFinish} />
                    </section>
                </div>
                <AppFooter />
            </div>

        )
    }
}

