// @flow

import React from 'react';

import FormativeItem from './FormativeItem';

type Props = {
  className: string,
  fields: Array<{ value: string }>,
  handleChange: (event: SyntheticKeyboardEvent<HTMLInputElement>, key: number) => mixed,
  onSubmit: () => mixed
}

class FormativeReview extends React.Component<Props> {
  render() {
    const { fields, className, handleChange, onSubmit } = this.props
    return (
      <form className={className}>
        <h1>Review</h1>
        <ul className="f-c-list">
          {fields.map((field, key) => {
            return (
              <FormativeItem
                className="f-c-list__item--review"
                {...field}
                key={key}
                handleChange={event => handleChange(event, key)}
                autoFocus={false}
              />
            );
          })}
        </ul>
        <button
          className="f-c-button f-c-button--continue"
          type="button"
          onClick={onSubmit}>
          Submit
        </button>
      </form>
    );
  }
}

export default FormativeReview;
