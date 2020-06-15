
import React from 'react';
import './ListItems.css';
import ItemInput from '../Item input/iteminput';

function DisplayItemsList(props) {
    let { items, onCheck } = props;

    const detectItemCheck = (e, item, index) => {
      
        item.checked = e.target.checked;
        onCheck(item, index);
    };

    if (items.length === 0)
        return '';

    return (
        <ul className="list-items">
            {
                items.map((item, index) => {
                    let id = 'item-checkbox' + index;
                    return (
                        <li key={index}>
                            <input onChange={e=>detectItemCheck(e, item, index)} type="checkbox" id={id} />
                            <label htmlFor={id}>{item.Text}</label>
                        </li>
                    )
                })
            }
        </ul>
    );
}
export default class ListItems extends React.Component {

    state = {
        name: "Todo list",
        items: [],
        inputIsOpened: false,
        totalCompleted: 0,
    };

    openAddInput = () => {
        this.setState({
            inputIsOpened: true,
        })
    };

    addNewItem = (value) => {
        let items = this.state.items;
        items.push({
            Text: value,
            checked: false,
        });
        this.setState({
            items,
        });
      

    };

    closeInput = () => {
        this.setState({
            inputIsOpened: false,
        })
    };
    updateItem = (item, index) => {
        let items = this.state.items;
        let totalCompleted =items.reduce((totalchecked , item)=>{
            return totalchecked + (item.checked ? 1 : 0);
        },0);
        items[index] = item;
        this.setState({
            items,
            totalCompleted,
        });
       

    };
    render() {
        return (
            <div className="List-items-container">
                <h1 > {this.state.name} : {this.state.totalCompleted} /{this.state.items.length}</h1>
                <DisplayItemsList onCheck={this.updateItem} items={this.state.items} />
                <ItemInput open={this.state.inputIsOpened} onFinish={this.addNewItem} onClose={this.closeInput} placeholder="New List Item then press enter" />

                <button onClick={this.openAddInput} className="Add-item-btn">Add Item</button>
            </div>
        )
    }
}