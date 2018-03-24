import React from 'react';

function FormativeProgress(props) {
  return (
    <ul className="f-c-navigation">
      {props.fields.map((field, index) => {
        const value = field.value;
        const isCurrent = index === props.index;
        const isActive = index === props.total;
        const isClickable = value || isActive;
        let color = 'rgba(0,0,0,0.15)';

        if (isClickable) {
          color = 'rgba(0,0,0,0.5)';
        }

        if (isCurrent) {
          color = 'white';
        }

        return (
          <li
            key={index}
            onClick={() => isClickable && props.navigate(index)}
            className="f-c-navigation__item"
            style={{
              backgroundColor: color,
            }}
          />
        );
      })}
    </ul>
  );
}

export default FormativeProgress;
