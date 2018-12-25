// @flow

import React from 'react';

type Props = {
  fields: Array<{ value: string, name: string }>,
  index: number,
  total: number,
  navigate: (key: number) => mixed,
};

function FormativeProgress({
  index, fields, navigate, total,
}: Props) {
  return (
    <ul className="f-c-navigation">
      {fields.map((field, key) => {
        const { value, name } = field;
        const isCurrent = key === index;
        const isActive = key === total;
        const isClickable = value || isActive;
        let color = 'rgba(0,0,0,0.15)';

        if (isClickable) {
          color = 'rgba(0,0,0,0.5)';
        }

        if (isCurrent) {
          color = 'white';
        }

        return (
          <button
            type="button"
            onClick={() => isClickable && navigate(key)}
            key={name}
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
