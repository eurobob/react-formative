import React from 'react';

function FormativeProgress(props) {
  return (
    <ul>
      {props.items.map((item, index) => (
        <li
          key={index}
          style={{
            color: index === props.index ? 'black' : 'white',
          }}>
          {index++}
        </li>
      ))}
    </ul>
  );
}

export default FormativeProgress;
