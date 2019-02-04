// @flow

import React from 'react';

import FormativeItem from './FormativeItem';

type Props = {
  className: string,
  fields: Array<{ value: string, name: string }>,
  handleChange: (event: SyntheticKeyboardEvent<HTMLInputElement>, key: number) => mixed,
  handleOptionKeyPress: (value: number) => mixed,
  onSubmit: () => mixed,
  submitText: string,
};

function FormativeReview({
  fields,
  className,
  handleChange,
  onSubmit,
  submitText,
  handleOptionKeyPress,
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
            handleOptionKeyPress={handleOptionKeyPress}
            autoFocus={false}
            review
          />
        ))}
      </ul>
      <button className="f-c-button f-c-button--continue" type="button" onClick={onSubmit}>
        {submitText}
      </button>
    </form>
  );
}

export default FormativeReview;
