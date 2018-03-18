import React from 'react';

function FormativeCounter(props) {
  return (
    <div className="f-c-counter">
      {`${props.index + 1} / ${props.fields.length}`}
    </div>
  );
}

export default FormativeCounter;
