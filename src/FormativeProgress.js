// @flow

import React from 'react';

type Props = {
  fields: Array<{ value: string }>,
  total: number
}

function FormativeProgress({fields, total}: Props) {
  const percent = total / fields.length * 100;
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
