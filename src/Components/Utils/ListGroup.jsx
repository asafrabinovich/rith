import React, {Component} from "react";
import PropTypes from "prop-types";

export default class ListGroup extends Component{
    render() {
        const {items, textProperty,valueProperty,selectedItem, onItemSelected} = this.props;
        return (
            <ul className="list-group">
                {items.map(item => {
                    return <li
                        key= {item.name}
                        className= {item === selectedItem ? "list-group-item active" : "list-group-item" }
                        onClick={() =>{onItemSelected(item)}}
                        style={{cursor:'pointer'}}
                        >{item[textProperty]}
                    </li>
                })}

            </ul>
        );
    }

}
ListGroup.defaultProps ={
    textProperty : 'name',
    valueProperty : '_id'
};
/*
ListGroup.propTypes = {
    items: PropTypes.array.isRequired,
    headText: PropTypes.number.isRequired,
    currentItem: PropTypes.number.isRequired,
    onItemChange: PropTypes.func.isRequired
}*/
