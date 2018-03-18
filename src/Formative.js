import React from 'react';
import PropTypes from 'proptypes';
import update from 'immutability-helper';

import FormativeCounter from './FormativeCounter';
import FormativeNavigation from './FormativeNavigation';
import FormativeProgress from './FormativeProgress';
import FormativeItem from './FormativeItem';

class Formative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      total: 0,
      fields: props.fields,
    };
    this.nextField = this.nextField.bind(this);
    this.prevField = this.prevField.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.navigate = this.navigate.bind(this);
  }
  nextField() {
    this.setState({
      index: this.state.index + 1,
      total: this.state.total + 1,
    });
  }
  prevField() {
    this.setState({ index: this.state.index - 1 });
  }
  handleChange(event, index) {
    console.log(index);
    this.setState({
      fields: update(this.state.fields, {
        [index]: {
          value: { $set: event.target.value },
        },
      }),
    });
  }
  navigate(index) {
    this.setState({ index });
  }
  render() {
    const { index, fields, total } = this.state;

    return (
      <form className={`${this.props.className} f-c-form`}>
        <FormativeCounter fields={fields} index={index} />
        <FormativeProgress fields={fields} total={total} />
        <FormativeNavigation
          fields={fields}
          index={index}
          total={total}
          navigate={this.navigate}
        />
        <ul style={{ listStyle: 'none' }}>
          {fields.map((field, index) => (
            <FormativeItem
              key={index}
              {...field}
              nextField={this.nextField}
              handleChange={event => this.handleChange(event, index)}
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
