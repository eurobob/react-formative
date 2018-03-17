import React from 'react';

function FormativeProgress(props) {
  const percent = props.index / props.fields.length * 100;
  return (
    <div className="f-c-progress">
      <div
        className="f-c-progress__inner"
        style={{
          transform: `translate(${percent}%, 0)`,
        }}
      />
    </div>
  );
}

export default FormativeProgress;
