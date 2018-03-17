import React from 'react';

function FormativeProgress(props) {
  return (
    <ul>
      {props.fields.map((field, index) => (
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
