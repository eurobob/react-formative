import React from 'react';
import PropTypes from 'proptypes';
import FormativeProgress from './FormativeProgress';
import FormativeItem from './FormativeItem';

class Formative extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
    this.nextField = this.nextField.bind(this);
    this.prevField = this.prevField.bind(this);
  }
  nextField() {
    this.setState({ index: this.state.index + 1 });
  }
  prevField() {
    this.setState({ index: this.state.index - 1 });
  }
  render() {
    const { index } = this.state;
    const { fields } = this.props;

    return (
      <form className="f-c-form">
        <FormativeProgress fields={fields} index={index} />
        <ul>
          {fields.map((field, fieldIndex) => (
            <FormativeItem
              key={fieldIndex}
              {...field}
              nextField={this.nextField}
            />
          ))}
        </ul>
        <button type="button" onClick={this.nextField}>
          Continue
        </button>
      </form>
    );
  }
}

Formative.propTypes = {
  animated: PropTypes.bool,
  animation: PropTypes.string,
};

Formative.defaultProps = {
  animated: false,
  animation: 'fade',
};

export default Formative;
