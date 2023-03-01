import React from 'react';
import './tableContainer.css';

function TableContainer(props) {
  return (
    <section>
      <ul>
        <li className="items--list">
          {props.children}
        </li>

      </ul>
    </section>
  )
};

export { TableContainer };