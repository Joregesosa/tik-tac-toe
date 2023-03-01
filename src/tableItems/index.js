import React from "react";
import './tableItems.css';
function TableItems(props) {
    return (
            <span className={`material-symbols-outlined ${props.id}`}
               onClick={props.onClick}>
                {props.value}
            </span>

    )
}

export { TableItems };