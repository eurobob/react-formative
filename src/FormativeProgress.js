// @flow

import React from 'react';

type Props = {
  fields: Array<{ value: string, name: string }>,
  total: number,
};

function FormativeProgress({ fields, total }: Props) {
  const percent = (total / fields.length) * 100;
  return (
    <div className="f-c-progress">
      <div
        className="f-c-progress__inner"
        style={{
          opacity: percent > 0 ? 1 : 0,
          transform: `translate(${percent}%, 0)`,
        }}
      />
    </div>
  );
}

export default FormativeProgress;
