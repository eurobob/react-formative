import React from 'react';
// import PropTypes from 'proptypes';
import FormativeItem from './FormativeItem';

class FormativeReview extends React.Component {
  render() {
    return (
      <form className={this.props.className}>
        <h1>Review</h1>
        <ul className="f-c-list">
          {this.props.fields.map((field, index) => {
            return (
              <FormativeItem
                className="f-c-list__item--review"
                {...field}
                key={index}
                handleChange={event => this.props.handleChange(event, index)}
                autoFocus={false}
              />
            );
          })}
        </ul>
        <button
          className="f-c-button f-c-button--continue"
          type="button"
          onClick={this.props.onSubmit}>
          Submit
        </button>
      </form>
    );
  }
}

export default FormativeReview;
