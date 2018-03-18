import React from 'react';

function FormativeProgress(props) {
  return (
    <ul className="f-c-navigation">
      {props.fields.map((field, index) => (
        <li
          key={index}
          onClick={() => props.navigate(index)}
          className="f-c-navigation__item"
          style={{
            backgroundColor: index === props.index ? 'black' : 'white',
          }}
        />
      ))}
    </ul>
  );
}

export default FormativeProgress;
