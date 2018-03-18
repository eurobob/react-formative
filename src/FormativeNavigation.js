import React from 'react';

function FormativeProgress(props) {
  return (
    <ul className="f-c-navigation">
      {props.fields.map((field, index) => {
        const value = field.value;
        const isCurrent = index === props.index;
        const isActive = index === props.total;
        const isClickable = value || isActive;
        return (
          <li
            key={index}
            onClick={() => isClickable && props.navigate(index)}
            className="f-c-navigation__item"
            style={{
              backgroundColor: isCurrent ? 'black' : 'white',
            }}
          />
        );
      })}
    </ul>
  );
}

export default FormativeProgress;
