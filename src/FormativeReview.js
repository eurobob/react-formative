// @flow

import React from 'react';

import FormativeItem from './FormativeItem';

type Props = {
  className: string,
  fields: Array<{ value: string, name: string }>,
  handleChange: (event: SyntheticKeyboardEvent<HTMLInputElement>, key: number) => mixed,
  onSubmit: () => mixed,
};

function FormativeReview({
  fields, className, handleChange, onSubmit,
}: Props) {
  return (
    <form className={className}>
      <h1>Review</h1>
      <ul className="f-c-list">
        {fields.map((field, key) => (
          <FormativeItem
            className="f-c-list__item--review"
            {...field}
            key={field.name}
            handleChange={event => handleChange(event, key)}
            autoFocus={false}
          />
        ))}
      </ul>
      <button className="f-c-button f-c-button--continue" type="button" onClick={onSubmit}>
        Submit
      </button>
    </form>
  );
}

export default FormativeReview;
